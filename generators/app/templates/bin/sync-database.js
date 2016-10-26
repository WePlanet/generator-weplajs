'use strict';

const models = require('../app/models');
const logTags = require('../app/components/log-tags');

module.exports = options => {
  return models.sequelize.sync(options || {force: false})
      .then(() => {
        const msg = `${logTags.StartupInfo} Sync Database ${JSON.stringify(options)}`;
        return Promise.resolve(msg);
      })
      .catch(err => {
        const msg = `${logTags.StartupError} Sync Database Fail ${JSON.stringify(err, null, 2)}`;
        return Promise.reject(msg);
      })
};
