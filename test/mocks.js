'use strict';
/**
 * Mock Promise
 * @param fn
 * @returns {{then: then}}
 * @constructor
 */
function Promise(fn) {

  function _resolve(data) {
    return data;
  }

  function _reject(err) {
    return err;
  }

  var res = fn(_resolve, _reject);

  return {
    then: function(callback) {
      callback(res);
    }
  };

}

/**
 * Tiny mock for DynamoDB, jus for spying
 * @constructor
 */
function DynamoDB() {}

DynamoDB.prototype.getItem = function(data) {
  return data;
};

DynamoDB.prototype.scan = function(data) {
  return data;
};

module.exports = {
  Promise : Promise,
  DynamoDB: DynamoDB
};