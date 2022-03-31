const express = require('express')
const { addBrand, getBrands, deleteBrands, updateBrands } = require('../controllers/brand')
const { requireSignin, adminMiddleware, uploadCloud } = require('../middlewares')



const router = express.Router()

router.post('/add', requireSignin, adminMiddleware, uploadCloud.single("brandImage"), addBrand)
router.get('/getBrands', getBrands)
router.post('/deleteBrands', requireSignin, adminMiddleware, deleteBrands)
router.post('/updatebrands', requireSignin, adminMiddleware, updateBrands)

module.exports = router
