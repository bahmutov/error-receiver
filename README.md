# error-receiver

> Simple Node server that can receives exceptions sent by crash handlers (like Raygun4js)

Read description in []() blog post

Install

    npm install error-receiver
    cd node_modules/error-receiver

Run

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

