const express = require('express')
const { requireSignin, adminMiddleware, userMiddleware, uploadCloud } = require('../middlewares')
const { updateUser, getUsers, deleteUserById, updateUserInfo } = require('../controllers/user')
const { validateUpdateUserInfoRequest, isRequestValidated } = require('../validators')


const router = express.Router()

router.post('/getUsers', requireSignin, adminMiddleware, getUsers)
router.post('/update', requireSignin, adminMiddleware, updateUser)
router.post('/updateUserInfo', requireSignin,
    userMiddleware,
    uploadCloud.single("profilePicture"),
    validateUpdateUserInfoRequest,
    isRequestValidated,
    updateUserInfo)
router.post('/delete', requireSignin, adminMiddleware, deleteUserById)

module.exports = router
