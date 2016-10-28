'use strict';

const models = require('../models');
const errors = require('../components/errors');

const parseStr = str => {
  const ret = parseInt(str, 10);
  return isNaN(ret) ? undefined : ret;
};

const index = (limit, offset) => {
  return models['<%= Resource %>'].findAll({
    limit: parseStr(limit),
    offset: parseStr(offset)
  });
};

const show = id => {
  return models['<%= Resource %>'].findOne({
    where: {
      id: parseStr(id)
    }
  });
};

const create = name => {
  return models['<%= Resource %>'].create({
    name: name
  }).catch(err => {
    if (err.name  === 'SequelizeUniqueConstraintError') {
      return Promise.reject(errors.code('Conflict'));
    }
    return Promise.reject(err);
  });
};

const update = (body, id) => {
  id = parseStr(id)
  return Promise.resolve()
      .then(() => show(id))
      .then(user => {
        if (!user) throw errors.NotFound();

        for (let key in body) user[key] = body[key]
        return user.save();
      })
      .then(() => show(id))
      .catch(err => {
        if (err.name === 'SequelizeValidationError') {
          return Promise.reject(errors.BadRequest(err.message));
        }

        if (err.name === 'SequelizeUniqueConstraintError') {
          return Promise.reject(errors.Conflict(err.message));
        }

        return Promise.reject(err);
      });
};

const destroy = id => {
  return models['<%= Resource %>'].destroy({
    where: {
      id: parseStr(id)
    }
  }).then(count => {
    return count ? Promise.resolve() : Promise.reject(errors.code('NotFound'));
  });
};

module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  destroy: destroy,
};
