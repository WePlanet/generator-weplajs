'use strict';

const Controller = require('../../Controller');

class <%= Resource %>Controller extends Controller {
  constructor() {
    super('<%= resource %>', 10);
  }

  index() {
    return super.index()

    // Override method if you need...
    // options => Promise.resolve('foo');
  }

  show() {
    return super.show();
  }

  create() {
    return super.create();
  }

  update() {
    return super.update();
  }

  destroy() {
    return super.destroy();
  }

  // Create new method ...
  // newMethod() {
  //   options => Promise.resolve('bar');
  // }
}

module.exports = new <%= Resource %>Controller;
