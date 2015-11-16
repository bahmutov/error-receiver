var nconf = require('nconf');

var defaults = {
  HOST: '127.0.0.1',
  PORT: 3004,
  // possible values
  apiKeyNames: ['apiKey', 'apikey', 'api-key'],
  apiKeyValue: 'demo-api-key',
  apiUrl: '/crash/entries'
};

/* eslint no-console:0 */
if (global.config) {
  console.log('using global config to override the default options');
  require('lodash').assign(defaults, global.config);
}

nconf.argv()
  .env()
  .defaults(defaults);

console.log('settings for error-receiver api %s:%d path %s api key names',
  nconf.get('HOST'), nconf.get('PORT'),
  nconf.get('apiUrl'), nconf.get('apiKeyNames'));

module.exports = nconf;
