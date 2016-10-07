'use strict';

module.exports = function(sequelize, DataTypes) {
  const <%= ResNm %> = sequelize.define('<%= ResNm %>', {
    name: {
      type:DataTypes.STRING,
      unique: true
    },
  }, {
    classMethods: {
      // associations can be defined here
    }
  });

  return <%= ResNm %>;
};