'use strict';

const <%= Resource %> = require('../../../lib/<%= Resource %>');
const errors = require('../../../components/errors');

module.exports = {
  index(options) {
    return Promise.resolve()
        .then(() => <%= Resource %>.index(options))
  },
  show(options) {
    return Promise.resolve()
        .then(() => <%= Resource %>.show(options))
        .then(<%= resource %> => {
          if (!<%= resource %>) return Promise.reject(errors.NotFound('<%= resource %> is not found'));
          return <%= resource %>;
        })
  },
  create(options) {
    return Promise.resolve()
        .then(_=> <%= Resource %>.create(options))
        .then(<%= resource %> => Object.assign(<%= resource %>, {statusCode: 201}))
        .catch(err => {
          if (err === errors.code('Conflict'))
            return Promise.reject(errors.Conflict(`${options.name} is already existed`));
          throw err;
        });
  },
  update(options) {
    return Promise.resolve()
        .then(_=> <%= Resource %>.update(options))
        .catch(err => {
          if (err === errors.code('NotFound'))
            return Promise.reject(errors.NotFound(`<%= resource %> id: ${options.id} is not found`));
          throw err;
        });
  },
  destroy(options) {
    return Promise.resolve()
        .then(_ => <%= Resource %>.destroy(options))
        .then(() => ({statusCode: 204}))
        .catch(err => {
          if (err === errors.code('NotFound'))
            return Promise.reject(errors.NotFound(`<%= resource %> id: ${options.id} is not found`));
          throw err;
        });
  }
};
