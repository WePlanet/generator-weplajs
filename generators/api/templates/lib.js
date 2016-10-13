'use strict';

const models = require('../models');
const errors = require('../components/errors');

exports.index = (limit, offset) => {
  return models['<%= Resource %>'].findAll({
    limit: limit,
    offset: offset
  });
};

exports.show = id => {
  return models['<%= Resource %>'].findOne({
    where: {
      id: id
    }
  })
};

exports.create = name => {
  return models['<%= Resource %>'].create({
    name: name
  }).catch(err => {
    if (err.name  === 'SequelizeUniqueConstraintError') {
      return Promise.reject(errors.Codes.Conflict);
    }
    return Promise.reject(err);
  });
};

exports.update = (id, name) => {
  return models['<%= Resource %>'].findOne({
    where: {
      id: id
    }
  }).then(<%= resource %> => {
    if (!<%= resource %>) {
      return Promise.reject(errors.Codes.NotFound);
    }

    <%= resource %>.name = name;
    return <%= resource %>.save();
  })
};

exports.destroy = id => {
  return models['<%= Resource %>'].destroy({
    where: {
      id: id
    }
  }).then(count => {
    return count ? Promise.resolve() : Promise.reject(errors.Codes.NotFound);
  });
};