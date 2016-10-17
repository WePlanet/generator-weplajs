'use strict';

const app = require('express')();

require('./components/startup-check')();
require('./config/express')(app);
require('./config/passport')();
require('./config/swagger')(app);
require('./routes')(app);

module.exports = app;
