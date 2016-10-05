'use strict';

const app = require('../app');
const config = require('../app/config/environment');
const syncDatabase = require('./sync-database');
const runServer = require('./run-server');

Promise.resolve()
    .then(() => syncDatabase({ force: config.database.syncForce }))
    .then(msg => console.log(msg))
    .then(() => runServer(app,  process.env.PORT || 3000))
    .then(msg => console.log(msg))
    .catch(err => console.error(err));
