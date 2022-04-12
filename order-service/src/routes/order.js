const express = require('express');
const { requireSignin, userMiddleware, adminMiddleware } = require('../middlewares');
const { addOrder, getOrder, getOrders, updateStatus, getCustomerOrders, paymentWithMomo, addOrderByPaymentMomo } = require('../controllers/order');

const router = express.Router();

router.post('/add', requireSignin, userMiddleware, addOrder);
router.post('/addOrderByPaymentMomo', addOrderByPaymentMomo);
router.post('/getOrder', requireSignin, userMiddleware, getOrder);
router.post('/getOrders', requireSignin, userMiddleware, getOrders);
router.post('/updateType', requireSignin, updateStatus);
router.post('/getCustomerOrders', requireSignin, adminMiddleware, getCustomerOrders);
router.post('/paymentWithMomo', requireSignin, userMiddleware, paymentWithMomo);

module.exports = router;