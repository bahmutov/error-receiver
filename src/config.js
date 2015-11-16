var nconf = require('nconf');

var defaults = {
  PORT: 3004,
  apiKey: 'demo-api-key',
  apiUrl: '/crash/entries'
};

if (global.config) {
  require('lodash').assign(defaults, global.config);
}

nconf.argv()
  .env()
  .defaults(defaults);

module.exports = nconf;
