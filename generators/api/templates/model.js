'use strict';

module.exports = function(sequelize, DataTypes) {
  const <%= Resource %> = sequelize.define('<%= Resource %>', {
    name: {
      type:DataTypes.STRING,
      unique: true
    },
  }, {
    classMethods: {
      // associations can be defined here
    }
  });

  return <%= Resource %>;
};