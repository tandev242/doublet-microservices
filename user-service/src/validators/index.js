const { check, validationResult } = require('express-validator')

exports.validateUpdateUserInfoRequest = [
    check('name')
        .notEmpty()
        .withMessage('Name is required'),
    // check('password')
    //     .isLength({ min: 6 })
    //     .withMessage('Password must be at least 6 character long'),
    // check('otp')
    //     .isNumeric()
    //     .isLength({ min: 6 })
    //     .withMessage('Otp must be 6 numbers'),
]

exports.validateAddDeliveryInfoRequest = [
    check('address')
        .notEmpty()
        .withMessage('Address is required')
]

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.array().length > 0) {
        return res.status(400).json({ errors: errors.array()[0].msg })
    }
    next()
}