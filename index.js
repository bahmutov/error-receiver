var config = require('./src/config');
var http = require('http');
var errorReceiver = require('./src/error-receiver');
var Promise = require('bluebird');

function apiKeyValidator(key) {
  console.log('checking api key %s', key);
  if (key === 'demo-api-key') {
    return Promise.resolve(true);
  } else {
    console.log('invalid api key %s', key);
    return Promise.reject(new Error('invalid api key ' + key));
  }
}

/* eslint no-console:0 */
http.createServer(function (req, res) {
  function send404() {
    res.writeHead(404);
    res.end(http.STATUS_CODES[404]);
  }
  errorReceiver.middleware(apiKeyValidator, req, res, send404);
}).listen(config.get('PORT'), config.get('HOST'));

errorReceiver.crashEmitter.on('crash', function (crashInfo) {
  console.log('received crash information');
  console.log(JSON.stringify(crashInfo, null, 2));
});

var pkg = require('./package.json');
console.log('%s running on %s:%d', pkg.name, config.get('HOST'), config.get('PORT'));

var httpie = 'https://github.com/jkbrzt/httpie';
console.log('test the error receiver from CLI using httpie %s', httpie);
console.log('http POST %s:%s%s?apikey=demo-api-key key=value',
  config.get('HOST'), config.get('PORT'), config.get('apiUrl'));
console.log('or opening test/index.html in the browser');
