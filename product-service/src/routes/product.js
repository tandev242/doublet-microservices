const express = require('express')
const { addProduct, getProductsBySlug,
    getProductById, getProductDetailsBySlug,
    deleteProductById, getProducts,
    updateProduct, updateQty, updateSizes,
    searchByProductName,
    updateDiscountPercent,
    addProductReview } = require('../controllers/product')
const { requireSignin, adminMiddleware, userMiddleware, uploadCloud } = require('../middlewares')
const router = express.Router()

router.post('/add', requireSignin, adminMiddleware, uploadCloud.array("productPicture"), addProduct)
router.get('/:type/:slug', getProductsBySlug)
router.get('/:slug', getProductDetailsBySlug)
router.post('/searchByProductName', searchByProductName)
router.post('/getById', getProductById)
router.delete('/deleteProductById', requireSignin, adminMiddleware, deleteProductById)
router.post('/getProducts', getProducts)
router.post('/update', requireSignin, adminMiddleware, updateProduct)
router.post('/updateQty', requireSignin, adminMiddleware, updateQty)
router.post('/updateSizes', requireSignin, adminMiddleware, updateSizes)
router.post('/updateDiscountPercent', requireSignin, adminMiddleware, updateDiscountPercent)
router.post('/addProductReview', requireSignin, userMiddleware, addProductReview)

module.exports = router
