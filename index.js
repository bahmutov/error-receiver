var config = require('./src/config');
var http = require('http');
var errorReceiver = require('./src/error-receiver');

/* eslint no-console:0 */
http.createServer(function (req, res) {
  errorReceiver(req, res);
}).listen(config.get('PORT'), config.get('HOST'));

var pkg = require('./package.json');
console.log('%s running on %s:%d', pkg.name, config.get('HOST'), config.get('PORT'));

var httpie = 'https://github.com/jkbrzt/httpie';
console.log('test the error receiver from CLI using httpie %s', httpie);
console.log('http POST %s:%s/crash/entries?apikey=demo-api-key key=value',
  config.get('HOST'), config.get('PORT'));
console.log('or opening test/index.html in the browser');
