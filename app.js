var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var uuid = require('uuid');

var session = require('express-session');

var checkAuthorization = require('./routes/checkAuthorization');
var dashboardCtrl = require('./routes/dashboardCtrl');
var userCtrl = require('./routes/userCtrl');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var sessionExemplar = session({
  secret: 'keyboardCat',
  resave: false,
  saveUninitialized: true
});
app.use(sessionExemplar);

var sharedsession = require("express-socket.io-session");

var IOService = require('./services/IOService.js');

IOService.use(sharedsession(sessionExemplar, {
  autoSave:true
}));

var SessionService = require('./services/SessionService.js');

app.use(function (req, res, next) {
  SessionService.init(req);
  next()
});

app.use('/*', checkAuthorization);
app.use('/', dashboardCtrl);
app.use('/user', userCtrl);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
