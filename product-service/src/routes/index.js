const express = require('express')
const brandRoutes = require('./brand')
const categoryRoutes = require('./category')
const productRoutes = require('./product')


const router = express.Router()

router.use('/brand', brandRoutes)
router.use('/category', categoryRoutes)
router.use('/product', productRoutes)

module.exports = router