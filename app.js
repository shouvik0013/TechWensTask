const fs = require('fs');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('combined', { stream: accessLogStream }));
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
app.use(express.static(path.join(__dirname, 'public')));

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
