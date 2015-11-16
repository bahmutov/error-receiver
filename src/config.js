var log = require('debug')('receiver');
var nconf = require('nconf');

var defaults = {
  HOST: '127.0.0.1',
  PORT: 3004,
  apiKey: 'demo-api-key',
  apiUrl: '/crash/entries'
};

if (global.config) {
  log('using global config to override the default options');
  require('lodash').assign(defaults, global.config);
  log('for example api key %s and port %d', defaults.apiKey, defaults.PORT);
}

nconf.argv()
  .env()
  .defaults(defaults);

module.exports = nconf;
