const express = require('express')
const { requireSignin , adminMiddleware } = require('../middlewares')
const { addSize, getAllSizes } = require('../controllers/size')


const router = express.Router()

router.post('/add', requireSignin, adminMiddleware, addSize)
router.get('/getAllSizes', getAllSizes)

module.exports = router