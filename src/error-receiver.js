var log = require('debug')('receiver');
var config = require('./config');
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
  res.writeHead(400, {
    'Content-Type': 'text/plain'
  });
  res.end('Invalid crash error request\n');
}

function isValid(req, parsed) {
  return req.method === 'POST' &&
    parsed &&
    parsed.pathname === allowedApiUrl &&
    parsed.query &&
    parsed.query.apikey === allowedApiKey;
}

function writeResponse(res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end('crash error received\n');
}

var events = require('events');
var crashEmitter = new events.EventEmitter();

/* eslint no-console:0 */
function errorReceiver(req, res) {
  var parsed = url.parse(req.url, true);
  if (!isValid(req, parsed)) {
    console.log('invalid error request %s - %s query', req.method, parsed.href, parsed.query);
    return respondToInvalid(res);
  }

  jsonParser(req, res, function () {
    textParser(req, res, function () {
      writeResponse(res);
      var json = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      crashEmitter.emit('crash', json);
    });
  });
}

module.exports = {
  middleware: errorReceiver,
  crashEmitter: crashEmitter
};
