'use strict';

require('mocha');
const chai = require('chai');
const should = chai.should();

const context = require('../context.js');

/**
 * See https://github.com/othiym23/node-continuation-local-storage/issues/64
 */
describe('Promise context convention', () => {

  var promise;
  var ns = context.createNamespace('PromiseConventionNS');
  var conventionId = 0;

  before(() => {
    ns.run(() => {
      ns.set('test', 2);
      promise = new Promise((resolve) => {
        ns.run(() => {
          ns.set('test', 1);
          resolve();
        });
      });
    });

    ns.run(() => {
      ns.set('test', 3);
      promise.then(() => {
        //console.log('This Promise implementation follows convention ' + ns.get('test'));
        conventionId = ns.get('test');
      });
    });

  });

  it('convention should be 3', () => {
    conventionId.should.equal(3);
  });

});
