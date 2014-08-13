var url = function() {
  var path = '/api/v1/user/auth/github/callback';

  return process.env.NODE_ENV === 'development' ?
    'http://localhost:3001' + path:
    process.env.URL + path;
};

module.exports = {
  'github': {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: url()
  }
};
