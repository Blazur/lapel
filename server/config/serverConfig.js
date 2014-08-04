var morgan      = require('morgan'),
    bodyParser  = require('body-parser'),
    config      = require('./middleware.js');



module.exports = function(app, express, passport) {
  var userRouter = express.Router();
  var gigRouter  = express.Router();
  var commonRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlendcoded({extended: true}));
  app.use(bodyParser.json());
  app.use('/api/v1', config.decode);
  app.use('/api/v1/user', userRouter);
  app.use('/api/v1/gig', gigRouter);
  app.use('/api/v1/common', commonRouter);
  app.use(config.errorLogger);
  app.use(config.errorHandler);

  require('../api/common/commonRoutes.js')(commonRouter);
  require('../api/user/userRoutes.js')(userRouter);
  require('../api/gig/gigRoutes.js')(gigRouter);
};

