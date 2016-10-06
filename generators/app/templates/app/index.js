'use strict';

const app = require('express')();

require('./components/startup-check')(); // done
require('./config/express')(app);
require('./config/swagger')(app);
require('./routes')(app);

module.exports = app;
