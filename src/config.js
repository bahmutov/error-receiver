var nconf = require('nconf');

nconf.argv()
  .env()
  .defaults({
    PORT: 3004,
    apiKey: 'demo-api-key'
  });

module.exports = nconf;
