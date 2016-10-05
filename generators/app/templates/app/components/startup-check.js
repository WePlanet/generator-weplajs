'use strict';

const logTags = require('./logTags');

let config = require('../config/environment');

const startupCheck = {
  check: () => {
    let errors = startupCheck._environmentVariables();
    if (errors.length) {
      startupCheck._printErrors(errors);
      process.exit();
    }
  },

  _environmentVariables: () => {
    const checkList = config.checkList || [];
    let errors = [];

    return checkList.reduce((result, checkItem) => {
      let error = startupCheck._environmentVariable(checkItem);
      if (error) result.push(error);
      return result;
    }, errors);
  },

  _environmentVariable: envName => {
    return (!process.env.hasOwnProperty(envName) || !process.env[envName]) ?
        `${envName} is required` :
        false;
  },

  _printErrors: errors => {
    errors.forEach(error => console.error(logTags.StartupError, error));
  }
};

module.exports = startupCheck.check;
