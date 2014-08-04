var app = require('./server/server.js');
var port = app.get('port');

app.listen(port);
console.log('Listening on http://localhost:' + port);
