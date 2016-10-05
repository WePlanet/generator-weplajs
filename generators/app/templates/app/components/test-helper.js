'use strict';

const syncDatabase = require('../../bin/sync-database');

const testHelper = {
  syncDb: done => {
    syncDatabase({force: true}).then(() => done());
  },

  insertSeed: (model, seed, done) => {
    return model.bulkCreate(seed).then(() => done());
  },

  deleteSeed: (model, seed, done) => {
    return model.destroy({
      where: {
        name: {
          in: seed.map(u => u.name)
        }
      },
      truncate: true
    }).then(() => done());
  }
};

module.exports = testHelper;
