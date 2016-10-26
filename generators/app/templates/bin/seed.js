'use strict';

const models = require('../app/models');
const logTags = require('../app/components/log-tags');

const users = [
  {email: '6pack@wepla.net',  password: '123123'}
];

module.exports = () => {
  const bulkCreate = (data, model) => model.bulkCreate(data);

  return Promise.resolve()
      .then(() => bulkCreate(users, models.User))
      .then(() => `${logTags.StartupInfo} Seed data inserted`);
};
