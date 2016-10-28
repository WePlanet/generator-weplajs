'use strict';

const should = require('should');
const request = require('supertest');
const app = require('../../../index');
const syncDB = require('../../../../bin/sync-database');
const models = require('../../../models');

describe('/v1/auth', function () {
  let user = {email: '6pack@wepla.net', password: '123123'};
  before('Init database', () => syncDB({force: true}));
  before('Insert user', () => models.User.create(user));

  describe('POST /v1/auth', () => {
    it('should return user.accessToken', done => {
      request(app)
          .post('/v1/auth')
          .send(user)
          .expect(201)
          .end((err, res) => {
            if (err) throw err;
            user = res.body.user;
            user.accessToken.length.should.be.above(1);
            user.should.not.have.property('password');
            done();
          })
    });
  });

  describe('DELTE /v1/auth', () => {
    it('should return 401 on invalid accessToken', done => {
      request(app)
          .delete(`/v1/auth?accessToken=invalidAccessToken`)
          .expect(401)
          .end(done);
    });

    it('should clear accessToken', done => {
      request(app)
          .delete(`/v1/auth?accessToken=${user.accessToken}`)
          .expect(200)
          .end((err, res) => {
            if (err) throw err;
            user = res.body.user;
            user.accessToken.length.should.be.equal(0);
            done();
          });
    });
  });
});


