const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* LOCAL PACKAGES */
const { SuccessResponse, ErrorResponse } = require('../utils/response');
const { validationResult } = require('express-validator');
const AuthPortalMessages = require('../includes/messages/auth-portal');

// MODELS
const { user: userModel, roles } = require('../models/user');

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {Function} next
 */
exports.postSignup = async (req, res, next) => {
  console.log('In postSignup');
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log('validation failed');
    console.log(errors.array());
    const error = new Error('Validation failed');
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

	console.log('>>>>>>>>>>This line executed');

  const email = req.body?.email;
  const firstName = req.body?.first_name;
  const lastName = req.body?.last_name;
  const phone = +req.body?.phone;
  const password = req.body?.password;
	const role = req.body.role ? req.body.role : roles.USER;


  try {
    // GENERATING PASSWORD HASH
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new userModel({
      email: email,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      password: hashedPassword,
			role: role
    });

    const savedNewUser = await newUser.save();

    console.log('>>>>>>>>>>>User generated');
    return SuccessResponse({
      res: res,
      success: true,
      message: AuthPortalMessages.userCreated,
      data: { id: savedNewUser?._id, email: savedNewUser?.email },
      statusCode: 201,
    });
  } catch (error) {
    return ErrorResponse({
      res: res,
      data: error,
      message: error?.message,
      statusCode: 500,
      success: false,
    });
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
module.exports.postLogin = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    console.log('>>>>>>>>>>>>>>LOGIN', validationErrors);
    return ErrorResponse({
      res: res,
      data: validationErrors.array(),
      message: 'There are some errors',
      statusCode: 402,
    });
  }

  const reqBody = req.body;
  const email = reqBody?.email;
  const password = reqBody?.password;
  try {
    const fetchedUser = (await userModel.find({ email: email }))[0];
    console.log('Fetched user ->', fetchedUser);

    if (!fetchedUser) {
      return ErrorResponse({
        res: res,
        success: false,
        message: AuthPortalMessages.userNotFound,
        data: {},
        statusCode: 404,
      });
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      fetchedUser.password
    );

    if (!isPasswordMatched) {
      return ErrorResponse({
        res: res,
        success: false,
        statusCode: 401,
        message: AuthPortalMessages.passwordDontMatch,
        data: {},
      });
    }

    const token = jwt.sign(
      {
        userId: fetchedUser._id,
        email: fetchedUser.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    return SuccessResponse({
      res,
      success: true,
      message: 'Successfully logged in',
      data: { userId: fetchedUser._id, email: fetchedUser.email, token },
    });
  } catch (error) {
    return ErrorResponse({
      res: res,
      message: error.message,
      data: error,
      statusCode: 500,
    });
  }
};


/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
module.exports.getAllUsers = (req, res, next) => {
	console.log(req.isAdmin);
	return SuccessResponse({res, data: req.isAdmin});
}