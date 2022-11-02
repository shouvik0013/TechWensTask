const express = require('express');

/**
 *
 * @param {{res: express.Response, message: String, success: Boolean, statusCode: Number, data: any}} args
 */
module.exports.SuccessResponse = (args) => {
  let message = args.message ?? 'Success';
  let success = args.success ?? true;
  let statusCode = args.statusCode ?? 200;
  let data = args.data ?? {};
	let res = args.res;

	res.status(statusCode).json({message, success, statusCode, data});
};


/**
 *
 * @param {{res: express.Response, message: String, success: Boolean, statusCode: Number, data: any}} args
 */
 module.exports.ErrorResponse = (args) => {
  let message = args.message ?? 'Error';
  let success = args.success ?? false;
  let statusCode = args.statusCode ?? 500;
  let data = args.data ?? {};
	let res = args.res;

	res.status(statusCode).json({message, success, statusCode, data});
};
