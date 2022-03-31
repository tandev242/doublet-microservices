const express = require('express')
const { requireSignin, userMiddleware } = require('../middlewares')
const { addToCart, getCartItems, removeCartItems } = require('../controllers/cart')


const router = express.Router()

router.post('/addToCart', requireSignin, userMiddleware, addToCart)
router.get('/getCartItems', requireSignin, userMiddleware, getCartItems)
router.post('/removeItem', requireSignin, userMiddleware, removeCartItems)

module.exports = router
