'use strict';

const <%= Resource %> = require('../../../lib/<%= Resource %>');
const errors = require('../../../components/errors');

module.exports = {

  index: options => {
    const limit = parseInt(options.limit, 10) || 10;
    const offset = parseInt(options.offset, 10) || 0;
    return <%= Resource %>.index(limit, offset);
  },

  show: options => {
    const id = parseInt(options.id, 10);
    if (!id) throw new errors.BadRequest(errors.Codes.InvalidId);

    return Promise.resolve()
        .then(() => <%= Resource %>.show(id))
        .then(<%= resource %> => {
          if (!<%= resource %>) throw new errors.NotFound(errors.Codes.NotFound);
          return <%= resource %>;
        });
  },

  create: options => {
    let name = (options.name + '').trim();
    if (!name.length) throw new errors.BadRequest(errors.Codes.EmptyName);

    return Promise.resolve()
        .then(() => <%= Resource %>.create(name))
        .then(<%= resource %> => {
          <%= resource %>.statusCode = 201;
          return <%= resource %>;
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
        .then(() => <%= Resource %>.update({name: name}, id))
        .catch(err => {
          if (err === errors.Codes.NotFound) {
            throw new errors.NotFound(errors.Codes.NotFound);
          }
          throw err;
        })
  },

  destroy: options => {
    const id = parseInt(options.id, 10);
    if (!id) throw new errors.BadRequest(errors.Codes.InvalidId);

    return Promise.resolve()
        .then(() => <%= Resource %>.destroy(id))
        .then(() => ({statusCode: 204}))
        .catch(err => {
          if (err === errors.Codes.NotFound) {
            throw new errors.NotFound(errors.Codes.NotFound);
          }
          throw err;
        });
  }

};
