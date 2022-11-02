const fs = require('fs');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const multer = require('multer');
const { v4: uuidv4 } = require("uuid");

const {ErrorResponse, SuccessResponse} = require('./utils/response')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  {
    flags: 'a', // 'a' for append
  }
);


const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
			cb(null, "images");
	},
	filename: (req, file, cb) => {
			cb(null, uuidv4().toString() + "-" + file.originalname);
	},
});


const fileFilter = (req, file, cb) => {
	console.log(file);
	/**
 * {
			fieldname: 'image',
			originalname: 'Capture.PNG',
			encoding: '7bit',
			mimetype: 'image/png'
		}
 */
	if (
			file.mimetype === "image/png" ||
			file.mimetype === "image/jpg" ||
			file.mimetype === "image/jpeg"
	) {
			cb(null, true);
	} else {
			cb(null, false);
	}
};


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('combined', { stream: accessLogStream }));
app.use(
	multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', [
    'OPTIONS',
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
  ]);
  res.setHeader('Access-Control-Allow-Headers', [
    'Content-Type',
    'Authorization',
  ]);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  return ErrorResponse({
    res,
    data: err,
    message: err.message,
    statusCode: 500,
  });
});


module.exports = app;
