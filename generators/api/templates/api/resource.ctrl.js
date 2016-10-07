'use strict';

const <%= ResNm %> = require('../../../lib/<%= ResNm %>');
const errors = require('../../../components/errors');

module.exports = {

  index: options => {
    const limit = parseInt(options.limit, 10) || 10;
    const offset = parseInt(options.offset, 10) || 0;
    return <%= ResNm %>.index(limit, offset);
  },

  show: options => {
    const id = parseInt(options.id, 10);
    if (!id) throw new errors.BadRequest(errors.Codes.InvalidId);

    return Promise.resolve()
        .then(() => <%= ResNm %>.show(id))
        .then(<%= resNm %> => {
          if (!<%= resNm %>) throw new errors.NotFound(errors.Codes.NoUser);
          return <%= resNm %>;
        });
  },

  create: options => {
    let name = (options.name + '').trim();
    if (!name.length) throw new errors.BadRequest(errors.Codes.EmptyName);

    return Promise.resolve()
        .then(() => <%= ResNm %>.create(name))
        .then(<%= resNm %> => {
          <%= resNm %>.statusCode = 201;
          return <%= resNm %>;
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
        .then(() => <%= ResNm %>.update(id, name))
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
        .then(() => <%= ResNm %>.destroy(id))
        .then(() => ({statusCode: 204}))
        .catch(err => {
          if (err === errors.Codes.NoUser) {
            throw new errors.NotFound(errors.Codes.NoUser);
          }
          throw err;
        });
  }

};
