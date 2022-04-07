const express = require('express')
const router = express.Router()
const axios = require('axios')
const registry = require('../utils/registry.json')
const loadBalancer = require('../utils/loadBalancer')
const fs = require('fs')

router.post('/enable/:apiName', (req, res) => {
    const apiName = req.params.apiName
    const requestBody = req.body
    const instances = registry.services[apiName].instances
    const index = instances.findIndex((srv) => { return srv.url === requestBody.url })
    if (index == -1) {
        res.send({ status: 'error', message: "Could not find '" + requestBody.url + "' for service '" + apiName + "'" })
    } else {
        instances[index].enabled = requestBody.enabled
        fs.writeFile('./routes/registry.json', JSON.stringify(registry), (error) => {
            if (error) {
                res.send("Could not enable/disable '" + requestBody.url + "' for service '" + apiName + ":'\n" + error)
            } else {
                res.send("Successfully enabled/disabled '" + requestBody.url + "' for service '" + apiName + "'\n")
            }
        })
    }
})

router.post('/register', (req, res) => {
    const registrationInfo = req.body
    registrationInfo.url = registrationInfo.protocol + "://" + registrationInfo.host + ":" + registrationInfo.port + "/"

    if (apiAlreadyExists(registrationInfo)) {
        res.send("Configuration already exists for '" + registrationInfo.apiName + "' at '" + registrationInfo.url + "'")
    } else {
        registry.services[registrationInfo.apiName].instances.push({ ...registrationInfo })
        fs.writeFile('./routes/registry.json', JSON.stringify(registry), (error) => {
            if (error) {
                res.send("Could not register '" + registrationInfo.apiName + "'\n" + error)
            } else {
                res.send("Successfully registered '" + registrationInfo.apiName + "'")
            }
        })
    }
})

router.post('/healthCheck', async (req, res) => {
    res.send({ status: "OK", message: "API gateway is running !"})
})

router.post('/unregister', (req, res) => {
    const registrationInfo = req.body

    if (apiAlreadyExists(registrationInfo)) {
        const index = registry.services[registrationInfo.apiName].instances.findIndex((instance) => {
            return registrationInfo.url === instance.url
        })
        registry.services[registrationInfo.apiName].instances.splice(index, 1)
        fs.writeFile('./routes/registry.json', JSON.stringify(registry), (error) => {
            if (error) {
                res.send("Could not unregister '" + registrationInfo.apiName + "'\n" + error)
            } else {
                res.send("Successfully unregistered '" + registrationInfo.apiName + "'")
            }
        })
    } else {
        res.send("Configuration does not exist for '" + registrationInfo.apiName + "' at '" + registrationInfo.url + "'")
    }
})

router.all('/api/*', async (req, res) => {
    const params = req.originalUrl.split('/').slice(1)
    const service = registry.services[params[1]]
    try {
        if (service) {
            if (!service.loadBalanceStrategy) {
                service.loadBalanceStrategy = 'ROUND_ROBIN'
                fs.writeFile('./routes/registry.json', JSON.stringify(registry), (error) => {
                    if (error) {
                        return res.send("Couldn't write load balance strategy" + error)
                    }
                })
            }
            const newIndex = loadBalancer[service.loadBalanceStrategy](service)
            const url = service.instances[newIndex].url
            const response = await axios({
                method: req.method,
                url: url + req.originalUrl,
                headers: {
                    'content-type': 'application/json',
                    'authorization': req.headers.authorization || ''
                },
                data: req.body
            })
            if (response) {
                res.status(response.status).json(response.data)
            } else {
                res.status(400).json({ error: "API doesn't exist" })
            }
        } else {
            res.status(400).json({ error: "URL is invalid" })
        }
    } catch (error) {
        res.status(400).json(error.response.data)
    }
})

const apiAlreadyExists = (registrationInfo) => {
    let exists = false

    registry.services[registrationInfo.apiName].instances.forEach(instance => {
        if (instance.url === registrationInfo.url) {
            exists = true
            return
        }
    })

    return exists
}

module.exports = router