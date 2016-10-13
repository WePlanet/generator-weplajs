'use strict';

const api = require('./api/index');

module.exports = app => {
  // Insert routes below


  app.get('/', (req, res) => res.json({message: 'Hello <%= name %>'}));

  app.use(api.error404);
  app.use(api.error);
};
