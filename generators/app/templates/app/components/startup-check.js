'use strict';

const logTags = require('./log-tags');
const checkSwaggerSpec = require('../config/swagger').checkSwaggerSpec;
const config = require('../config/environment');

const checkEnvVars = _=> {
  const checkList = config.checkList || [];
  let errors = [];

  return checkList.reduce((result, checkItem) => {
    let error = checkEnvVar(checkItem);
    if (error) result.push(error);
    return result;
  }, errors);
};

const checkEnvVar = envName => {
  return (!process.env.hasOwnProperty(envName) || !process.env[envName]) ?
      `${envName} is required` :
      false;
};

const printErrors = errors => {
  errors.forEach(error => console.error(logTags.StartupError, error));
};


module.exports = _=> {
  let errors = [];
  return Promise.resolve([])
      .then(() => checkEnvVars())
      .then(e => errors = errors.concat(e))
      .then(() => checkSwaggerSpec())
      .then(e => errors = errors.concat(e))
      .then(() => {
        if (errors.length) { printErrors(errors); process.exit(); }
      });
};
