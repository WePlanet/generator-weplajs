"use strict";

const app = require('express')();

require('./components/startup-check')(); // done
require('./config/express')(app); // todo
require('./config/swagger')(app); // todo
require('./routes')(app); // todo

module.exports = app;
