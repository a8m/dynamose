'use strict';

/**
 * @description
 * reference ro isArray method
 * @type {Function}
 */
var isArray = function(val) {
  return val ? Array.isArray(val) : false;
};

/**
 * reference ro Object.keys method
 * @type {Function}
 */
var keys = function(val) {
  return val ? Object.keys(val) : [];
};

/**
 * @description
 * Test if given `value` is defined
 * @param value
 * @returns {boolean}
 */
function isDefined(value) { return typeof value !== 'undefined'; }

/**
 * @description
 * A function that performs no operations.
 */
function noop() {}

/**
 * @exports
 */
module.exports = {
  isArray  : isArray,
  keys     : keys,
  isDefined: isDefined,
  noop     : noop
};