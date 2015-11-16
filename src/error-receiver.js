var log = require('debug')('receiver');
var config = require('./config');
var url = require('url');

var la = require('lazy-ass');
var check = require('check-more-types');

var names = config.get('apiKeyNames');
la(check.array(names), 'expected list of names', names);

var allowedApiKey = config.get('apiKeyValue');
var allowedApiUrl = config.get('apiUrl');
log('allowed api key "%s" at end point "%s under names',
  allowedApiKey, allowedApiUrl, names);

// handle data encoded in json or text body
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var textParser = bodyParser.text();

function respondToInvalid(reason, res) {
  la(check.unemptyString(reason), 'invalid reason', reason);
  res.writeHead(400, {
    'Content-Type': 'text/plain'
  });
  res.end(reason);
}

function isErrorRequest(req, parsed) {
  return req.method === 'POST' &&
    parsed &&
    parsed.pathname === allowedApiUrl;
}

var findFirstKey = require('./find-first-key');
la(check.fn(findFirstKey), 'missing find first key', findFirstKey);
var findFirstApiKey = findFirstKey.bind(null, names);

function getApiKey(parsed) {
  return parsed &&
    parsed.query &&
    findFirstApiKey(parsed.query);
}

function verifyRequest(req, res, parsed) {
  log(parsed && parsed.query);
  if (req.method !== 'POST') {
    respondToInvalid('invalid method', res);
    return false;
  }
  if (check.not.object(parsed)) {
    respondToInvalid('Invalid parsed url', res);
    return false;
  }
  if (parsed.pathname !== allowedApiUrl) {
    respondToInvalid('Invalid request url', res);
    return false;
  }
  if (check.not.object(parsed.query)) {
    respondToInvalid('Invalid query', res);
    return false;
  }
  var apiKey = getApiKey(parsed);
  if (!apiKey) {
    respondToInvalid('Missing api key', res);
    return false;
  }
  if (apiKey !== allowedApiKey) {
    respondToInvalid('Invalid api key', res);
    return false;
  }

  return true;
}

function success(res) {
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
function errorReceiver(req, res, next) {
  var parsed = url.parse(req.url, true);
  if (!isErrorRequest(req, parsed)) {
    return check.fn(next) && next();
  }

  if (!verifyRequest(req, res, parsed)) {
    console.log('invalid error request %s - %s query', req.method, parsed.href, parsed.query);
    return;
  }

  jsonParser(req, res, function () {
    textParser(req, res, function () {
      success(res);

      var json = typeof req.body === 'string' ?
        JSON.parse(req.body) : req.body;
      la(check.object(json), 'could not get crash info object', json);
      var apiKey = getApiKey(parsed);
      la(check.unemptyString(apiKey), 'missing api key', parsed);
      json.apiKey = apiKey;
      crashEmitter.emit('crash', json);
    });
  });
}

module.exports = {
  middleware: errorReceiver,
  crashEmitter: crashEmitter
};
