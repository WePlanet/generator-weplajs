'use strict';

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
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