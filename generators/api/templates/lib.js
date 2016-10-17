'use strict';

const models = require('../models');
const errors = require('../components/errors');

const index = (limit, offset) => {
  return models['<%= Resource %>'].findAll({
    limit: limit,
    offset: offset
  });
};

const show = id => {
  return models['<%= Resource %>'].findOne({
    where: {
      id: id
    }
  })
};

const create = name => {
  return models['<%= Resource %>'].create({
    name: name
  }).catch(err => {
    if (err.name  === 'SequelizeUniqueConstraintError') {
      return Promise.reject(errors.Codes.Conflict);
    }
    return Promise.reject(err);
  });
};

const update = (body, id) => {
  return Promise.resolve()
      .then(() => show(id))
      .then(<%= resource %> => {
        if (!<%= resource %>) throw new errors.NotFound();

        for (let key in body) <%= resource %>[key] = body[key]
        return <%= resource %>.save();
      })
      .then(() => show(id))
      .catch(err => {
        if (err.name === 'SequelizeValidationError') {
          return Promise.reject(new errors.BadRequest(err.message));
        }

        if (err.name === 'SequelizeUniqueConstraintError') {
          return Promise.reject(new errors.Conflict(err.message));
        }

        return Promise.reject(err);
      });
};

const destroy = id => {
  return models['<%= Resource %>'].destroy({
    where: {
      id: id
    }
  }).then(count => {
    return count ? Promise.resolve() : Promise.reject(errors.Codes.NotFound);
  });
};

module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  destroy: destroy,
};
