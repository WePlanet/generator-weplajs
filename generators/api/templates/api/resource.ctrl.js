'use strict';

const Controller = require('../../Controller');

class <%= Resource %>Controller extends Controller {
  constructor() {
    super('<%= resource %>', 10);
  }

  // Override method if you need...
  //
  // index() {
  //   options => Promise.resolve('foo');
  // }

  // Create new method ...
  //
  //
  // newMethod() {
  //   options => Promise.resolve('bar');
  // }

}

module.exports = new <%= Resource %>Controller;
