'use strict';

const api = require('./api/index');
const auth = require('./components/auth-service');

module.exports = app => {
  // Insert routes below
  app.use('/v1/auth', auth.checkApiKey(), require('./api/v1/auth'));


  app.get('/', (req, res) => res.json({message: 'Hello <%= name %>'}));

  app.use(api.error404);
  app.use(api.error);
};
