var User      = require('../api/user/userModel.js'),
    Github    = require('passport-github').Strategy,
    Promise   = require('bluebird'),
    credits   = require('./vars.js').github;

var githubCredits = {
  clientID: credits.clientID,
  clientSecret: credits.clientSecret,
  callbackURL: credits.callbackURL
};

var sendBackUser = function sendBackUser(token, profile, done) {
  return function(user) {
    if (user) {
      return done(null, user);
    }
    console.log(profile);

    var newUser = {
      'github': {
        'id': profile.id,
        'token': token
      }
    };

    User.create(newUser, function(err, user) {
      if (err) return done(err);
      done(null, user);
    });
  };
};

var passportCallback = function passportCallback(token, refresh, profile, done) {
  var findOne = Promise.promisify(User.findOne, User);

  findOne({'github.id': profile.id})
    .then(sendBackUser(token, profile, done))
    .catch(done);
};

module.exports = function(passport) {
  passport.use(new Github(githubCredits, passportCallback));
};
