var rp = require('request-promise');
rp({
  method: 'POST',
  uri: 'http://localhost:3004/crash/entries?apikey=demo-api-key',
  json: true,
  body: {
    title: 'this is a test'
  }
}).then(function (response) {
  console.log(response);
}, function (err) {
  console.error('error');
  console.error(err.message);
  process.exit(-1);
});
