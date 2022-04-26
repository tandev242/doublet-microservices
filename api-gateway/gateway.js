const express = require('express')
const helmet = require('helmet')
const cors = require("cors")
const app = express()

// change .prod to .dev to test on local environment
const registry = require('./utils/registry.prod.json')
const routes = require('./routes')

const PORT = process.env.PORT || 5000
app.set('view engine', 'ejs')
app.use(express.json())
app.use(helmet())
app.use(cors())

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
app.use('/', routes)

app.listen(PORT, () => {
    console.log('Gateway has started on port ' + PORT)
})
