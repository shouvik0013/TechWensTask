const { body } = require('express-validator');
const AuthPortalMessages = require('../includes/messages/auth-portal');


module.exports.loginValidation = [
	body('email')
	.trim()
	.isEmail()
	.withMessage(AuthPortalMessages.invalidEmail)
	.normalizeEmail(),
	body('password')
	.trim()
	.not()
	.isEmpty()
	.isLength({min: 8})
	.withMessage(AuthPortalMessages.shortPassword)
]