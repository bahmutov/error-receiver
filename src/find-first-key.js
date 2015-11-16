var la = require('lazy-ass');

function findFirstValue(keys, obj) {
  la(Array.isArray(keys), 'expected list of keys', keys);

  var foundValue;
  keys.some(function (key) {
    if (typeof obj[key] !== 'undefined') {
      foundValue = obj[key];
      return true;
    }
  });

  return foundValue;
}

module.exports = findFirstValue;
