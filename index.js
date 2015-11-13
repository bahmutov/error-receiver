var config = require('./src/config');
var pkg = require('./package.json');
var http = require('http');
var url = require('url');

var allowedApiKey = config.get('apiKey');
console.log('allowed api key "%s"', allowedApiKey);

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

function respondToInvalid(res) {
  res.writeHead(400, {'Content-Type': 'text/plain'});
  res.end('Invalid request\n');
}

function isValid(req, parsed) {
  return req.method === 'POST' &&
    parsed &&
    parsed.query &&
    parsed.query.apiKey === allowedApiKey;
}

http.createServer(function (req, res) {
  var parsed = url.parse(req.url, true);
  console.log('%s - %s query', req.method, parsed.href, parsed.query);
  if (!isValid(req, parsed)) {
    return respondToInvalid(res);
  }
  jsonParser(req, res, function () {
    console.log(req.body);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello there\n');
  });
}).listen(config.get('PORT'), '127.0.0.1');
console.log('%s running on port %d', pkg.name, config.get('PORT'));
