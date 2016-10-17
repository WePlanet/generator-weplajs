"use strict";

module.exports = {
  port: process.env.PORT || 3001,

  checkList: [

  ],

  accessToken: {
    secret: 's3cr2t-t2st',
    expireSeconds: 60 * 60 * 24 * 30 * 12 // 12 months
  },

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
