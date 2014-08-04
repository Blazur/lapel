var express = require('express');

var app = express();
var morgan = require('morgan');
var env = app.get('env');
app.set('port', process.env.PORT)
app.use(morgan('dev'));
if (env === 'production') {
  app.use(express.static(__dirname + '/../dist'));
} else {
  app.use(express.static(__dirname + '/../.tmp'));
  app.use(express.static(__dirname + '/../app'));
  // app.use(express.static(__dirname + '/../dist'));

}

app.get('/test', function(req, res) {
  res.send('yo');
});

module.exports = app;
