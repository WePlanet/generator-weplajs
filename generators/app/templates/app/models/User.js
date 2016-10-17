'use strict';

const util = require('../components/util');

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [6, 50]
      },
      set(val) {
        this.setDataValue('password', util.passwordHash(val))
      }
    },
    accessToken: {
      type: DataTypes.STRING
    },
    name: {
      type:DataTypes.STRING,
      unique: true
    },
  }, {
    classMethods: {
      // associations can be defined here
    }
  });

  return User;
};