const jwt = require('jsonwebtoken');
const express = require('express');
const { ErrorResponse, SuccessResponse } = require('../utils/response');
const { authorizationMessages } = require('../includes/messages/authorization');
const {user: User, roles} = require('../models/user')

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
module.exports.authMiddleware = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return ErrorResponse({
      res: res,
      success: false,
      message: authorizationMessages.noAuthHeader,
      data: {},
      statusCode: 401,
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decodedToken?.userId;
		req.email = decodedToken?.email;
		const fetchedUser = await User.findById(req.userId);
		req.isAdmin = fetchedUser.role === roles.ADMIN ? true : false;
		next();
  } catch (error) {
    return ErrorResponse({
      res: res,
      success: false,
      message: authorizationMessages.invalidToken,
      data: {},
      statusCode: 401,
    });
  }
  
};
