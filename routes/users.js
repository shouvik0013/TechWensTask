var express = require('express');
const {
  signInValidator,
} = require('../middlewares/signin-validation-middleware');

const {
  loginValidation,
} = require('../middlewares/login-validation-middleware');

const {authMiddleware} = require('../middlewares/user-validation-middleware');
const {adminValidation} = require('../middlewares/admin-middleware');

const authController = require('../controllers/auth-controller');


var router = express.Router();

/* GET users listing. */
router.post('/signup', signInValidator, authController.postSignup);
router.post('/login', loginValidation, authController.postLogin);
router.get('/', authMiddleware, adminValidation, authController.getAllUsers);

module.exports = router;
