var log = require('debug')('receiver');
var config = require('./src/config');
var pkg = require('./package.json');
var http = require('http');
var url = require('url');

var allowedApiKey = config.get('apiKey');
var allowedApiUrl = config.get('apiUrl');
log('allowed api key "%s" at end point "%s',
  allowedApiKey, allowedApiUrl);

// handle data encoded in json or text body
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var textParser = bodyParser.text();

function respondToInvalid(res) {
  res.writeHead(400, {'Content-Type': 'text/plain'});
  res.end('Invalid request\n');
}

function isValid(req, parsed) {
  return req.method === 'POST' &&
    parsed &&
    parsed.pathname === allowedApiUrl &&
    parsed.query &&
    parsed.query.apikey === allowedApiKey;
}

function saveCrashReport(req) {
  console.log(req.body);
}

function writeResponse(res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end('Hello there\n');
}

/* eslint no-console:0 */
http.createServer(function (req, res) {
  var parsed = url.parse(req.url, true);
  if (!isValid(req, parsed)) {
    console.log('invalid %s - %s query', req.method, parsed.href, parsed.query);
    return respondToInvalid(res);
  }
  console.log('%s - %s query', req.method, parsed.href, parsed.query);
  jsonParser(req, res, function () {
    textParser(req, res, function () {
      saveCrashReport(req);
      writeResponse(res);
    });
  });
}).listen(config.get('PORT'), '127.0.0.1');
console.log('%s running on port %d', pkg.name, config.get('PORT'));
