'use strict';

const User = require('../../../lib/User');
const errors = require('../../../components/errors');

module.exports = {

  index: options => {
    const limit = parseInt(options.limit, 10) || 10;
    const offset = parseInt(options.offset, 10) || 0;
    return User.index(limit, offset);
  },

  show: options => {
    const id = parseInt(options.id, 10);
    if (!id) throw new errors.BadRequest(errors.Codes.InvalidId);

    return Promise.resolve()
        .then(() => User.show(id))
        .then(user => {
          if (!user) throw new errors.NotFound(errors.Codes.NoUser);
          return user;
        });
  },

  create: options => {
    let name = (options.name + '').trim();
    if (!name.length) throw new errors.BadRequest(errors.Codes.EmptyName);

    return Promise.resolve()
        .then(() => User.create(name))
        .then(user => {
          user.statusCode = 201;
          return user;
        })
        .catch(err => {
          if (err === errors.Codes.Conflict) {
            throw new errors.Conflict(errors.Codes.ConflictUser);
          }
          throw err;
        })
  },

  update: options => {
    const id = parseInt(options.id, 10);
    if (!id) throw new errors.BadRequest(errors.Codes.InvalidId);

    let name = (options.name + '').trim();
    if (!name.length) throw new errors.BadRequest(errors.Codes.EmptyName);

    return Promise.resolve()
        .then(() => User.update(id, name))
        .catch(err => {
          if (err === errors.Codes.NoUser) {
            throw new errors.NotFound(errors.Codes.NoUser);
          }
          throw err;
        })
  },

  destroy: options => {
    const id = parseInt(options.id, 10);
    if (!id) throw new errors.BadRequest(errors.Codes.InvalidId);

    return Promise.resolve()
        .then(() => User.destroy(id))
        .then(() => ({statusCode: 204}))
        .catch(err => {
          if (err === errors.Codes.NoUser) {
            throw new errors.NotFound(errors.Codes.NoUser);
          }
          throw err;
        });
  }

};
