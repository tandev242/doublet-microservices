const express = require('express')
const brandRoutes = require('./brand')
const categoryRoutes = require('./category')
const productRoutes = require('./product')
const sizeRoutes = require('./size')


const router = express.Router()

router.use('/brand', brandRoutes)
router.use('/category', categoryRoutes)
router.use('/product', productRoutes)
router.use('/size', sizeRoutes)

module.exports = router