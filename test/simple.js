var assert = require('assert');
var http = require('http');

var staticroute = require('../');

var host = 'localhost';
var port = 9128;

var server = http.createServer(staticroute());
server.listen(port, host, started);

function started() {
  console.log('server started');

  var checks = 2;
  var i = 0;
  http.request('http://localhost:9128/fake', function(res) {
    console.log('GET /fake');
    console.log('-> statusCode = %d', res.statusCode);
    console.dir(res.headers);
    assert(res.statusCode === 404);
    if (++i >= checks) process.exit(0);
  }).end();;
  http.request('http://localhost:9128/package.json', function(res) {
    console.log('GET /package.json');
    console.log('-> statusCode = %d', res.statusCode);
    console.dir(res.headers);
    assert(res.statusCode === 200);
    if (++i >= checks) process.exit(0);
  }).end();;
}
