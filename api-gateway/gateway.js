const express = require('express')
const helmet = require('helmet')
const app = express()
const registry = require('./routes/registry.json')
const axios = require('axios')
const fs = require('fs')
const loadBalancer = require('./utils/loadBalancer')
const routes = require('./routes')
const PORT = 3000
app.set('view engine', 'ejs')
app.use(express.json())
app.use(helmet())

const auth = (req, res, next) => {
    const url = req.protocol + '://' + req.hostname + PORT + req.path
    const authString = Buffer.from(req.headers.authorization, 'base64').toString('utf8')
    const authParts = authString.split(':')
    const username = authParts[0]
    const password = authParts[1]
    console.log(username + ' | ' + password)
    const user = registry.auth.users[username]
    if (user) {
        if (user.username === username && user.password === password) {
            next()
        } else {
            res.send({ authenticated: false, path: url, message: 'Authentication Unsuccessful: Incorrect password.' })
        }
    } else {
        res.send({ authenticated: false, path: url, message: 'Authentication Unsuccessful: User ' + username + ' does not exist.' })
    }
}

app.get('/ui', (req, res) => {
    res.render('index', { services: registry.services })
})
// app.use(auth)
// app.use('/', routes)

app.use(async (req, res) => {
    const params = req.originalUrl.split('/').slice(1)
    const service = registry.services[params[1]]
    try {
        if (params[0] === "api" && service) {
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
                headers: req.headers,
                data: req.body
            })
            if (response) {
                return res.status(response.status).json(response.data)
            } else {
                res.status(400).json({ error: "API doesn't exist" })
            }
        }else{
            res.status(400).json({ error: "API doesn't exist" })
        }
    } catch (error) {
        res.status(400).json({ error })
    }
})

app.listen(PORT, () => {
    console.log('Gateway has started on port ' + PORT)
})
