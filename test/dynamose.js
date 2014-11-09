'use strict';
var sinon    = require('sinon');
var should   = require('should');
var _        = require('../lib/utils');
var prettify = require('../lib/prettify');

describe('dynamose.js', function() {

  describe('#utils', function() {
    beforeEach(function() {
      sinon.spy(Object, 'keys');
      sinon.spy(Array, 'isArray');
    });

    it('should call Object.keys with the given arguments', function() {
      var res1 = _.keys({ a: 1, b: 2 });
      var res2 = _.keys();
      Object.keys.calledOnce.should.eql(true);
    });

    it('should call Array.isArray with the given arguments', function() {
      var res1 = _.isArray([]);
      var res2 = _.isArray();
      Array.isArray.calledOnce.should.eql(true);
    });

    it('should test if the given value is not an `undefined` value', function() {
      (_.isDefined([])).should.eql(true);
      (_.isDefined(1)).should.eql(true);
      (_.isDefined({})).should.eql(true);
      (_.isDefined(undefined)).should.eql(false);
    });

    afterEach(function() {
      Object.keys.restore();
      Array.isArray.restore();
    });
  });

  describe('#prettify', function() {

    var data1 = { Item: { name : { S : 'hash_name' }, value: { SS: ['1', '2']  } } };
    var data2 = { Count: 2, Items: [data1.Item, data1.Item], ScannedCount: 2 };

    var expect1 = { name: 'hash_name', value: ['1', '2'] };
    var expect2 = [expect1, expect1];

    it('should prettify AWS.DynamoDB returned object', function() {
      prettify(data1).should.eql(expect1);
      prettify(data2).should.eql(expect2);
    });
  });

  describe('#dynamose', function() {
    var stubs    = require('./mocks');
    var deps     = { Promise: require('bluebird'), AWS: require('aws-sdk') };
    deps.AWS.DynamoDB = stubs.DynamoDB;
    var awsProto = deps.AWS.DynamoDB.prototype;
    var Dynamose = require('../lib/dynamose');

    beforeEach(function() {
      sinon.stub(deps, 'Promise', stubs.Promise);
    });

    it('should have the same API as DynamoDB API', function() {
      var methods = _.keys(deps.AWS.DynamoDB.prototype);
      methods.forEach(function(method) {
        (typeof Dynamose.prototype[method]).should.eql('function');
      });
    });

    it('should called DynamoDB function, cuz it\'s just an adapter', function() {
      sinon.spy(awsProto, 'getItem');
      sinon.spy(awsProto, 'scan');
      var db  = new Dynamose();
      db.getItem({});
      awsProto.getItem.calledWith({}).should.eql(true);
      db.scan([]);
      awsProto.scan.calledWith([]).should.eql(true);
      db.getTable('foo');
      awsProto.scan.calledTwice.should.eql(true);
    });

    it('should called return the response as a promise', function() {
      var db  = new Dynamose();
      var res = db.getItem({});
      res.should.be.type('object');
      res.should.have.property('then');
    });

    afterEach(function() {
      deps.Promise.restore();
      _.keys(awsProto).forEach(function(key) {
        return (awsProto[key].restore || _.noop)();
      });
    });
  });

});