const express = require('express');

// MODELS
const user = require('../models/user');

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
    throw error;
  }

  const email = req.body?.email;
  const firstName = req.body?.first_name;
  const lastName = req.body?.last_name;
  const phone = +req.body?.phone;
  const password = req.body?.password;

  try {
    // GENERATING PASSWORD HASH
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prismaClient.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        country: country,
        age: age,
        sex: sex,
        password: hashedPassword,
      },
    });

    console.log('>>>>>>>>>>>User generated');
    return SuccessResponse({
      res: res,
      success: true,
      message: AuthPortalMessages.userCreated,
      data: { email: user?.email, id: user?.id },
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
