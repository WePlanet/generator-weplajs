'use strict';

const models = require('../models');
const errors = require('../components/errors');

exports.index = (limit, offset) => {
  return models.User.findAll({
    limit: limit,
    offset: offset
  });
};

exports.show = id => {
  return models.User.findOne({
    where: {
      id: id
    }
  })
};

exports.create = name => {
  return models.User.create({
    name: name
  }).catch(err => {
    if (err.name  === 'SequelizeUniqueConstraintError') {
      return Promise.reject(errors.Codes.Conflict);
    }
    return Promise.reject(err);
  });
};

exports.update = (id, name) => {
  return models.User.findOne({
    where: {
      id: id
    }
  }).then(user => {
    if (!user) {
      return Promise.reject(errors.Codes.NoUser);
    }
    user.name = name;
    return user.save();
  })
};

exports.destroy = id => {
  return models.User.destroy({
    where: {
      id: id
    }
  }).then(count => {
    return count ? Promise.resolve() : Promise.reject(errors.Codes.NoUser);
  });
};