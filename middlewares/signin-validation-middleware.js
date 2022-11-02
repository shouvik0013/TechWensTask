const { body } = require('express-validator');
const AuthPortalMessages = require('../includes/messages/auth-portal');

module.exports.signInValidator = [
  body('user_email')
    .trim()
    .not()
    .isEmpty()
    .isEmail()
    .withMessage(AuthPortalMessages.invalidEmail)
    .normalizeEmail(),
  body('password').trim().not().isEmpty().isLength({ min: 8, max: 50 }),
  body('first_name').trim().notEmpty(),
  body('last_name').trim().notEmpty(),
	body('phone').trim().isNumeric().withMessage(AuthPortalMessages.invalidPhoneNumber)
];
