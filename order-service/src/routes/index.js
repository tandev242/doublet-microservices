const express = require('express')
const cartRoutes = require('./cart')
const orderRoutes = require('./order')


const router = express.Router()

router.use('/cart', cartRoutes)
router.use('/order', orderRoutes)

module.exports = router