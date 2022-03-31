const express = require('express')
const userRoutes = require('./user')
const deliveryInfoRoutes = require('./deliveryInfo')


const router = express.Router()

router.use('/user', userRoutes)
router.use('/deliveryInfo', deliveryInfoRoutes)

module.exports = router