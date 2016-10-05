'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);
const Sequelize = require('sequelize');
const config = require('../config/environment').database;
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Will be exposed
let db = {};

const hidden = file => file.indexOf('.') === 0;
const indexFile = file => file === basename;
const jsFile = file => file.slice(-3) === '.js';

fs
    .readdirSync(__dirname)
    .filter(file => !hidden(file) && !indexFile(file) && jsFile(file))
    .forEach(file => {
      let model = sequelize['import'](path.join(__dirname, file));
      db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

db.Sequelize = Sequelize;

db.ensureObject = sequelizeInstance => {
  if (sequelizeInstance.hasOwnProperty('dataValues')) {
    sequelizeInstance = sequelizeInstance.get({plain: true});
  }
  return sequelizeInstance;
};


module.exports = db;
