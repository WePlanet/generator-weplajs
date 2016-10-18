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
      if (!id) throw new errors.BadRequest(errors.Codes.InvalidId);

      return Promise.resolve()
          .then(() => this.Lib.show(id))
          .then(r => {
            if (!r) throw new errors.NotFound(errors.Codes.NotFound);
            return r;
          });
    };
  }

  create() {
    return options => {
      let name = (options.name + '').trim();
      if (!name.length) throw new errors.BadRequest(errors.Codes.EmptyName);

      return Promise.resolve()
          .then(() => this.Lib.create(name))
          .then(user => Object.assign(user, {statusCode: 201}))
          .catch(err => {
            if (err === errors.Codes.Conflict) {
              throw new errors.Conflict(errors.Codes.Conflict);
            }
            throw err;
          });
    }
  }

  update() {
    return options => {
      const id = this._parseId(options.id);
      if (!id) throw new errors.BadRequest(errors.Codes.InvalidId);

      let name = (options.name + '').trim();
      if (!name.length) throw new errors.BadRequest(errors.Codes.EmptyName);

      return Promise.resolve()
          .then(() => this.Lib.update({name: name}, id))
          .catch(err => {
            if (err === errors.Codes.NotFound) {
              throw new errors.NotFound(errors.Codes.NotFound);
            }
            throw err;
          });
    }
  }

  destroy() {
    return options => {
      const id = this._parseId(options.id);
      if (!id) throw new errors.BadRequest(errors.Codes.InvalidId);

      return Promise.resolve()
          .then(() => this.Lib.destroy(id))
          .then(() => ({statusCode: 204}))
          .catch(err => {
            if (err === errors.Codes.NotFound) {
              throw new errors.NotFound(errors.Codes.NotFound);
            }
            throw err;
          });
    };
  }
};
