var nconf = require('nconf');

nconf.argv()
  .env()
  .defaults({
    PORT: 3004,
    apiKey: 'demo-api-key',
    apiUrl: '/crash/entries'
  });

module.exports = nconf;
