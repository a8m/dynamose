'use strict';
var AWS      = require('aws-sdk');
var DynamoDB = AWS.DynamoDB;
var Promise  = require('bluebird');
var _        = require('./utils');
var prettify = require('./prettify');

/**
 * Dynamo constructor
 * options  => the DynamoDB constructor config options
 * prettify => whether or not to prettify the returned data
 * @param options
 * @param prettify
 * @constructor
 */
function Dynamos(options, prettify) {
  this.__db__  = new DynamoDB(options);
  this.prettify = _.isDefined(prettify) ? prettify : true;
}

/**
 * @static
 * @description
 * static functions for configurable `AWS` for those who don't want
 * require `AWS` in index.js
 * @type {AWS|*|exports}
 */
Dynamos.AWS = AWS;

var DYNAMO_WRAPPED_METHODS = [
  { name: 'batchGetItem'   },
  { name: 'batchWriteItem' },
  { name: 'createTable'    },
  { name: 'deleteItem'     },
  { name: 'deleteTable'    },
  { name: 'describeTable'  },
  { name: 'getItem'        },
  { name: 'listTables'     },
  { name: 'putItem'        },
  { name: 'query'          },
  { name: 'scan'           },
  { name: 'updateItem'     },
  { name: 'updateTable'    }
];

//prototype functions but more handy and based promise
DYNAMO_WRAPPED_METHODS.forEach(function(method) {
  Dynamos.prototype[method.name] = function(params) {
    var db   = this.__db__;
    var func = db[method.name];
    var pre  = this.prettify;
    return new Promise(function(resolve, reject) {
      func.call(db, params, function(err, data) {
        return err
          ? reject(new Error(err))
          : resolve(pre ? prettify(data) : data);
      });
    });
  };
});

/**
 * @description
 * get table by name
 * @param name
 * @returns {*}
 */
Dynamos.prototype.getTable = function(name) {
  return this.scan({ TableName: name });
};


/**
 * @exports
 */
module.exports = Dynamos;