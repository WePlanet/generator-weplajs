'use strict';

const morgan = require('./morgan');
const bodyParser = require('body-parser');

const expressSettings = app => {
  const env = app.get('env');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Skip logging on test mode
  if (app.get('env') !== 'test') {
    app.use(morgan());
  }

};

module.exports = expressSettings;
