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
const usersController = require('../controllers/users-controller')


var router = express.Router();

/* GET users listing. */
router.post('/signup', signInValidator, authController.postSignup);
router.post('/login', loginValidation, authController.postLogin);
router.get('/myinfo', authMiddleware, usersController.getMyInfo);
router.get('/', authMiddleware, adminValidation, usersController.getAllUsers);

module.exports = router;
