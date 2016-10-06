"use strict";

module.exports = {
  port: process.env.PORT || 80,

  database: {
    username: process.env.DB_NAME || '<%= dbUser %>',
    password: process.env.DB_USER ||'<%= dbPass %>',
    database: process.env.DB_PASS ||'<%= dbName %>_production',
    host: process.env.DB_HOST ||'<%= dbHost %>',
    dialect: 'mysql',
    logging: false,
    syncForce: true
  },

  checkList: [
    'API_KEY',
    'DB_NAME',
    'DB_USER',
    'DB_PASS',
    'DB_HOST'
  ]
};

