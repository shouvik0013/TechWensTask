const { body } = require('express-validator');
const AuthPortalMessages = require('../includes/messages/auth-portal');
const { user: User, roles } = require('../models/user');

const validValues = Object.keys(roles).map((key) => roles[key]);

module.exports.signInValidator = [
  body('email')
    .trim()
    .not()
    .isEmpty()
    .isEmail()
    .withMessage(AuthPortalMessages.invalidEmail)
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject(AuthPortalMessages.emailAlreadyPresent);
        }
      });
    })
    .normalizeEmail(),
  body('password').trim().not().isEmpty().isLength({ min: 8, max: 50 }),
  body('first_name').trim().notEmpty(),
  body('last_name').trim().notEmpty(),
  body('phone')
    .trim()
    .isNumeric()
    .isLength({ min: 10, max: 10 })
    .withMessage(AuthPortalMessages.invalidPhoneNumber)
    .custom((value, { req }) => {
      return User.findOne({ phone: +value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject(AuthPortalMessages.phoneNumberAlreadyPresent);
        }
      });
    }),
  body('role')
    .trim()
    .custom((value, { req }) => {
      if (!validValues.includes(value)) {
        throw new Error(AuthPortalMessages.invalidRole);
      }

      return true;
    }),
];
