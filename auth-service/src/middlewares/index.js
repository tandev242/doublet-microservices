const jwt = require('jsonwebtoken')
// Auth User
exports.requireSignin = (req, res, next) => {
    if (req.headers.authorization) {

        // headers.authorization kieu "User sdadsadsadsasdas" la table + token 
        const token = req.headers.authorization.split(' ')[1]
        // decode token de lay User theo cai secret key
        const user = jwt.verify(token, process.env.JWT_SECRET)
        // luu user vao request
        req.user = user
    } else {
        return res.status(400).json({ message: "Authorization required" })
    }
    next()
}

exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== "user") {
        return res.status(400).json({ message: "User access denied" })
    }
    next()
}
exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(400).json({ message: "Admin access denied" })
    }
    next()
}
