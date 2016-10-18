'use strict';

const syncDatabase = require('../../bin/sync-database');
const models = require('../models');
const request = require('supertest');
const app = require('../index');

const testHelper = {
  user: {
    email: '6pack@wepla.net',
    password: '123123',
    name: 'chris'
  },

  syncDb() {
    return Promise.resolve()
        .then(() => syncDatabase({force: true}))
        .then(() => models.User.create(this.user))
        .then(() => this.login())
        .then(user => this.user = Object.assign(this.user, user));
  },

  login() {
    return new Promise((resolve, reject) => {
      request(app)
          .post('/v1/auth')
          .send(this.user)
          .end((err, res) => {
            if (err) throw err;
            resolve(res.body.user);
          });
    })
  },

  insertSeed(model, seed) { return model.bulkCreate(seed); },

  deleteSeed(model, seed) {
    return model.destroy({
      where: {
        name: {
          in: seed.map(u => u.name)
        }
      },
      truncate: model !== models.User
    });
  },

  bindAccessToken(path) {
    return path.match(/\?/) ?
        path.replace(/\?/, `?accessToken=${this.user.accessToken}&`) :
        `${path}?accessToken=${this.user.accessToken}`;
  }
};

module.exports = testHelper;
