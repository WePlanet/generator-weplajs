"use strict";

module.exports = {
  port: process.env.PORT || 3001,

  checkList: [

  ],

  database: {
    username: '<%= dbUser %>',
    password: '<%= dbPass %>',
    database: '<%= dbName %>_test',
    host: '<%= dbHost %>',
    dialect: 'mysql',
    logging: false,
    syncForce: true
  }
};
