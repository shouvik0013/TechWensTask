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
module.exports.adminValidation = (req, res, next) => {
	const isAdmin = req.isAdmin;

	if(isAdmin) {
		next()
	} else {
		return ErrorResponse({
			res,
			data: {},
			message: authorizationMessages.adminValidationFailed,
			success: false,
			statusCode: 400
		})
	}
}