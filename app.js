#!/usr/bin/env node

'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');

// const cspProvider = require('./routes/mods/csp-provider.js')

const indexRouter = require('./routes/index');
const mainRouter = require('./routes/main');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const apiRouter = require('./routes/api');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());


app.use( (req, res, next) => {
  // app.disable('x-powered-by');
  // res.removeHeader('X-Powered-By');
  // res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  // res.setHeader('Content-Security-Policy', "default-src 'self' *.googleapis.com *.gstatic.com; script-src 'self' 'unsafe-inline'");
  // res.setHeader('X-XSS-Protection', '1; mode=block');
  // res.setHeader('X-Content-Type-Options', '"nosniff"');
  next();
});

app.use('/', indexRouter);
app.use('/main', mainRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/api', apiRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
