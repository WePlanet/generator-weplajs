'use strict';

const api = require('./api/index');

module.exports = app => {
  app.use('/v1/users', require('./api/v1/user'));

  app.get('/', (req, res) => res.json({message: "Hello World!"}));

  app.use(api.error404);
  app.use(api.error);

};
