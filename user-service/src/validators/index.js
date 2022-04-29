const { check, validationResult } = require('express-validator')

exports.validateUpdateUserInfoRequest = [
    check('name')
        .notEmpty()
        .withMessage('Name is required')
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