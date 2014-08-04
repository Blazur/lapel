'use strict';

var express   = require('express'),
    passport  = require('passport'),
    app       = express(),
    env       = app.get('env');

app.set('port', process.env.PORT);
app.use(morgan('dev'));

if (env === 'production') {
  app.use(express.static(__dirname + '/../dist'));
} else {
  app.use(express.static(__dirname + '/../app'));
  app.use(express.static(__dirname + '/../.tmp'));
}

app.use(express.static(__dirname + '/../bower_components'));

require('./server/config/passportConfig.js')(passport);
require('./server/config/serverConfig.js')(app, express, passport);

module.exports = app;
