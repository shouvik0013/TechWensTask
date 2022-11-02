var express = require('express');
const {
  signInValidator,
} = require('../middlewares/signin-validation-middleware');


var router = express.Router();

/* GET users listing. */
router.post('/login', signInValidator, function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
