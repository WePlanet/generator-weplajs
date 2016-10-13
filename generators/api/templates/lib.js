'use strict';

const models = require('../models');
const errors = require('../components/errors');

exports.index = (limit, offset) => {
  return models['<%= ResNm %>'].findAll({
    limit: limit,
    offset: offset
  });
};

exports.show = id => {
  return models['<%= ResNm %>'].findOne({
    where: {
      id: id
    }
  })
};

exports.create = name => {
  return models['<%= ResNm %>'].create({
    name: name
  }).catch(err => {
    if (err.name  === 'SequelizeUniqueConstraintError') {
      return Promise.reject(errors.Codes.Conflict);
    }
    return Promise.reject(err);
  });
};

exports.update = (id, name) => {
  return models['<%= ResNm %>'].findOne({
    where: {
      id: id
    }
  }).then(<%= resNm %> => {
    if (!<%= resNm %>) {
      return Promise.reject(errors.Codes.NotFound);
    }

    <%= resNm %>.name = name;
    return <%= resNm %>.save();
  })
};

exports.destroy = id => {
  return models['<%= ResNm %>'].destroy({
    where: {
      id: id
    }
  }).then(count => {
    return count ? Promise.resolve() : Promise.reject(errors.Codes.NotFound);
  });
};