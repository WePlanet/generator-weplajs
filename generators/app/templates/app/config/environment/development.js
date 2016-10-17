"use strict";


module.exports = {
  port: process.env.PORT || 3000,

  database: {
    username: '<%= dbUser %>',
    password: '<%= dbPass %>',
    database: '<%= dbName %>_development',
    host: '<%= dbHost %>',
    dialect: 'mysql',
    logging: console.log,
    syncForce: true
  },

  accessToken: {
    secret: 's3cr2t-develobment',
    expireSeconds: 60 * 60 * 24 * 30 * 12 // 12 months
  },

  checkList: [
  ]

};
