"use strict";


module.exports = {
  port: process.env.PORT || 3000,

  checkList: [
  ],

  database: {
    username: 'root', // todo: from user input by yeoman
    password: 'root', // todo: from user input by yeoman
    database: 'express_api_seed_development', // todo: from user input by yeoman
    host: '127.0.0.1', // todo: from user input by yeoman
    dialect: 'mysql', // todo: from user input by yeoman
    logging: console.log,
    syncForce: true
  }
};
