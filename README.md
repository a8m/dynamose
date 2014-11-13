#A Promise-Based DynamoDB Client
[![Build Status](https://travis-ci.org/a8m/dynamose.svg)](https://travis-ci.org/a8m/dynamose)
[![Coverage Status](https://img.shields.io/coveralls/a8m/dynamose.svg)](https://coveralls.io/r/a8m/dynamose)

**Dynamose** is a client for the Amazon's DynamoDB that gives you to deal with promises instead of callbacks.

###Installing
**git:**
```sh
$ git clone https://github.com/a8m/dynamose.git
```
**npm:**
```sh
$ npm install dynamose --save
```

###Usage
```js
var Dynamose = require('dynamose');

// use Dynamose.AWS to config `AWS`
// for those who don't wanna require `AWS` in index.js
Dynamose.AWS.config.update({
  accessKeyId:     config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  region:          config.region
});

// Dynamose constructor get two optional argument
// options  => DynamoDB object options
// prettify => whether or not to prettify the returned data, by default set to true
var db = new Dynamose();

// get one item
db.getItem(params)
    .then(console.log) // { name: 'foo_bar', value: [ 1, 2, 3 ] }

var unprettyDB = new Dynamose({}, false);
unprettyDB
  .getItem(params)
  .then(console.log) // { Item: { name: { S: 'foo_bar' }, value: { SN: [1, 2, 3] } } }


// use Promise.all/.props to fulfill more the one request
var Promise = require('bluebird');
Promise.props({
  accounts: db.getItem(params1),
  users   : db.getItem(params2),
  orders  : db.getItem(params3)
}).then(console.log); // { accounts: { ... }, { users: { ... }, orders: { ... } } }
```
