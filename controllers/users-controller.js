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
 * @param {express.NextFunction} next
 */
module.exports.getAllUsers = async (req, res, next) => {
  console.log(req.isAdmin);
  try {
    const allUsers = await userModel.find(
      { role: roles.USER },
      'firstName lastName email phone disabled role'
    );

    if (allUsers.length === 0) {
      return SuccessResponse({
        res,
        message: 'No users found',
      });
    }

    return SuccessResponse({
      res,
      data: {
        users: allUsers,
      },
      message: 'All users fetched',
      statusCode: 200,
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
module.exports.getMyInfo = async (req, res, next) => {
  try {
    const userInfo = await userModel.find(
      { _id: req.userId },
      'firstName lastName email phone disabled role'
    );

    if (!userInfo) {
      return SuccessResponse({ res, message: 'No info found' });
    }

    return SuccessResponse({
      res,
      message: 'info fetched',
      data: {
        info: userInfo,
      },
      statusCode: 200,
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
