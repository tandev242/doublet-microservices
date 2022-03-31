const express = require('express')
const { signup, signin, signinWithGoogle, signout, isUserLoggedIn, sendOtpToEmail, updateForgetPassword } = require('../controllers/auth')
const { verifyOtp } = require('../controllers/otp')
const { validateSignupRequest, validateSigninRequest, validateForgotPasswordRequest, isRequestValidated } = require('../validators')
const { requireSignin } = require('../middlewares')
const { refreshToken } = require('../controllers/token')

const router = express.Router()

router.post('/signup', validateSignupRequest, isRequestValidated, signup)
router.post('/signin',validateSigninRequest, isRequestValidated, signin)
router.post('/v1/auth/google', signinWithGoogle)
router.post('/signout', requireSignin, signout)
router.post('/verifyOtp', verifyOtp)
router.post('/sendOtpToEmail', sendOtpToEmail)
router.post('/updateForgetPassword', validateForgotPasswordRequest, updateForgetPassword)
router.post('/refreshToken', refreshToken)


module.exports = router