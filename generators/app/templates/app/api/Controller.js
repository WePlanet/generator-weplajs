'use strict';

const errors = require('../components/errors');
const util = require('../components/util');

module.exports = class Controller {

  constructor(name, limit) {
    this.Lib = require(`../lib/${util.capitalize(name)}`);
    this.limit = limit || 10;
  }

  _parseId(id) { return parseInt(id, 10) || 0; }

  index() {
    return options => {
      return this.Lib.index(this.limit, options.offset || 0);
    };
  }

  show() {
    return options => {
      const id = this._parseId(options.id);
      if (!id) throw errors.BadRequest(errors.Codes('InvalidId'));

      return Promise.resolve()
          .then(() => this.Lib.show(id))
          .then(r => {
            if (!r) throw errors.NotFound();
            return r;
          });
    };
  }

  create() {
    return options => {
      let name = (options.name + '').trim();
      if (!name.length) throw errors.BadRequest(errors.Codes('EmptyName'));

      return Promise.resolve()
          .then(() => this.Lib.create(name))
          .then(user => Object.assign(user, {statusCode: 201}))
          .catch(err => {
            if (err === errors.Codes('Conflict')) {
              throw errors.Conflict();
            }
            throw err;
          });
    }
  }

  update() {
    return options => {
      const id = this._parseId(options.id);
      if (!id) throw errors.BadRequest(errors.Codes('InvalidId'));

      let name = (options.name + '').trim();
      if (!name.length) throw errors.BadRequest(errors.Codes('EmptyName'));

      return Promise.resolve()
          .then(() => this.Lib.update({name: name}, id))
          .catch(err => {
            if (err === errors.Codes('NotFound')) {
              throw errors.NotFound();
            }
            throw err;
          });
    }
  }

  destroy() {
    return options => {
      const id = this._parseId(options.id);
      if (!id) throw errors.BadRequest(errors.Codes('InvalidId'));

      return Promise.resolve()
          .then(() => this.Lib.destroy(id))
          .then(() => ({statusCode: 204}))
          .catch(err => {
            if (err === errors.Codes('NotFound')) {
              throw errors.NotFound(errors.Codes('NotFound'));
            }
            throw err;
          });
    };
  }
};
