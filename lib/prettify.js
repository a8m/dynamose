'use strict';
var _ = require('./utils');

//Amazon AWS.DynamoDB constant types
var TYPE_FIELDS = ['S', 'N', 'B', 'SS', 'NS', 'BS', 'M', 'L', 'NULL', 'BOOL'];
var OBJ_FIELDS  = ['Item', 'Items', 'Table'];

// I'm not proud of this, but it'll get the job done for now.
// should refactor, and make it more abstract
function extractItem(item) {
  var cItem = {};
  _.keys(item).forEach(function(key) {
    var nestedObj = item[key];
    cItem[key] = nestedObj[_.keys(nestedObj)[0]];
  });
  return cItem;
}
//extractItems
function extractItems(items) {
  return items.map(function(item) {
    return extractItem(item);
  });
}

/**
 * @description
 * strip unnecessary fields from AWS.Dynamo object
 * @param data
 */
module.exports = function prettify(data) {
  var prettyData = [];
  var toExtract  = OBJ_FIELDS.filter(function(field) {
    return ~_.keys(data).indexOf(field);
  });
  toExtract.forEach(function(field) {
    var obj = data[field];
    prettyData.push(_.isArray(obj) ? extractItems(obj) : extractItem(obj));
  });
  return prettyData.length <= 1
    ? prettyData[0] || data
    : prettyData;
};



