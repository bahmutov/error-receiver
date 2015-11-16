# error-receiver

> Simple Node server that can receives exceptions sent by crash handlers (like Raygun4js)

[![NPM][error-receiver-icon] ][error-receiver-url]

[![Build status][error-receiver-ci-image] ][error-receiver-ci-url]
[![semantic-release][semantic-image] ][semantic-url]

Read description in [Stand your own crash server][blog post] blog post

Install

    npm install error-receiver
    cd node_modules/error-receiver

Run example server

    node index.js

This starts a server at `PORT` - a [raygun4js](https://github.com/MindscapeHQ/raygun4js)
can then send errors to this server. Just set environment variables to define API path
and key

    apiKey - specific to the project, for example 'demo-api-key'
    apiUrl - full path to the api, for example '/crash/entries'

Note that raygun4js automatically adds `/entries` to the its url. Configure
the `rg4js` (assuming V2 api) like this (substitute SERVER and PORT variables)

```js
rg4js('apiKey', 'demo-api-key');
rg4js('enableCrashReporting', true);
rg4js('options', {
  apiUrl: 'SERVER:PORT/crash'
});
```

The errors will be sent using POST method.

To better specify options, set all desired options on `global.config` object,
which is used together with `nconf defaults` object.

## Use crash middleware as a module

The received errors will be emitted from an event emitter

```js
var errorReceiver = require('error-receiver');
// use middleware (req, res, next) from Express or plain http server
app.use(errorReceiver.middleware);
// listen for errors
errorReceiver.crashEmitter.on('crash', function (crashInfo) {
  // do something
});
```

For example, in plain http server (see file [index.js](index.js))

```js
var errorReceiver = require('error-receiver');
http.createServer(function (req, res) {
  function send404() {
    res.writeHead(404);
    res.end(http.STATUS_CODES[404]);
  }
  errorReceiver.middleware(req, res, send404);
}).listen(port, host);
errorReceiver.crashEmitter.on('crash', function (crashInfo) {
  console.log('received crash information');
  console.log(JSON.stringify(crashInfo, null, 2));
});
```

### Small print

Author: Gleb Bahmutov &copy; 2015

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/error-receiver/issues) on Github

## MIT License

Copyright (c) 2015 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[blog post]: http://glebbahmutov.com/blog/stand-your-own-crash-server/

[error-receiver-icon]: https://nodei.co/npm/error-receiver.png?downloads=true
[error-receiver-url]: https://npmjs.org/package/error-receiver
[error-receiver-ci-image]: https://travis-ci.org/bahmutov/error-receiver.png?branch=master
[error-receiver-ci-url]: https://travis-ci.org/bahmutov/error-receiver
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
