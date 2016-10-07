'use strict';

const should = require('should');
const request = require('supertest');
const app = require('../../../');
const models = require('../../../models');
const helper = require('../../../components/test-helper');

describe('<%= ResNm %>', () => {
  before('Sync database', done => helper.syncDb(done));

  describe('GET /<%= resNm %>s', () => {
    let <%= resNm %>s = [{name: 'name1'}, {name: 'name2'}, {name: 'name3'}];

    before('Insert seed data', done => helper.insertSeed(models[<%= ResNm %>], <%= resNm %>s, done));

    after('Delete seed data', done => helper.deleteSeed(models[<%= resNm %>], <%= resNm %>s, done));

    it('should return 200 status code and array', done => {
      request(app)
          .get('/v1/<%= resNm %>s')
          .expect(200)
          .end((err, res) => {
            if (err) throw err;
            res.body.should.be.instanceOf(Array);
            done();
          });
    });
  });

  describe('GET /<%= resNm %>s/:id', () => {
    let <%= resNm %>s = [{name: 'name1'}];

    before('Insert seed data', done => helper.insertSeed(models[<%= ResNm %>], <%= resNm %>s, done));

    after('Delete seed data', done => helper.deleteSeed(models.<%= ResNm %>, <%= resNm %>s, done));

    it('should return 200 status code and an object', done => {
      request(app)
          .get('/v1/<%= resNm %>s/1')
          .expect(200)
          .end((err, res) => {
            if (err) throw err;
            res.body.should.be.instanceOf(Object);
            done();
          });
    });

    it('should return 400 status code on invalid id', done => {
      request(app)
          .get('/v1/<%= resNm %>s/abc')
          .expect(400)
          .end((err, res) => {
            if (err) throw err;
            res.body.should.have.property('error');
            res.body.error.code.should.be.equal('invalidId');
            done();
          });
    });

    it('should return 404 status code on no id', done => {
      request(app)
          .get('/v1/<%= resNm %>s/999')
          .expect(404)
          .end((err, res) => {
            if (err) throw err;
            res.body.should.have.property('error');
            res.body.error.code.should.be.equal('noUser');
            done();
          });
    });
  });

  describe('POST /<%= resNm %>s', () => {
    let <%= resNm %>s = [{name: 'name1'}];

    after('Delete seed data', done => helper.deleteSeed(models[<%= ResNm %>], users, done));

    it('should return 201 status code and new id', done => {
      request(app)
          .post('/v1/<%= resNm %>s')
          .send(users[0])
          .expect(201)
          .end((err, res) => {
            if (err) throw err;
            res.body.should.have.property('id');
            done();
          });
    });

    it('should return 400 status code on empty name', done => {
      request(app)
          .post('/v1/<%= resNm %>s')
          .send({name: ' '})
          .expect(400)
          .end((err, res) => {
            if (err) throw err;
            res.body.should.have.property('error');
            res.body.error.should.have.property('code', 'emptyName');
            done();
          });
    });

    it('should return 409 status code on duplicated name', done => {
      request(app)
          .post('/v1/<%= resNm %>s')
          .send(<%= resNm %>s[0])
          .expect(409)
          .end((err, res) => {
            if (err) throw err;
            res.body.should.have.property('error');
            res.body.error.should.have.property('code', 'conflictUser');
            done();
          });
    });
  });

  describe('PUT /<%= resNm %>s/:id', () => {
    let <%= resNm %>s = [{name: 'name1'}];

    before('Insert seed data', done => helper.insertSeed(models[<%= ResNm %>], <%= resNm %>s, done));

    after('Delete seed data', done => helper.deleteSeed(models[<%= ResNm %>], <%= resNm %>s, done));

    it('should return 200 status code and an updated object', done => {
      request(app)
          .put('/v1/<%= resNm %>s/1')
          .send({name: 'name2'})
          .expect(200)
          .end((err, res) => {
            if (err) throw err;
            res.body.should.be.property('name', 'name2');
            done();
          });
    });

    it('should return 400 status code on invalid id', done => {
      request(app)
          .put('/v1/<%= resNm %>s/abc')
          .expect(400)
          .end((err, res) => {
            if (err) throw err;
            res.body.should.have.property('error');
            res.body.error.code.should.be.equal('invalidId');
            done();
          });
    });

    it('should return 404 status code on no id', done => {
      request(app)
          .put('/v1/<%= resNm %>s/999')
          .expect(404)
          .end((err, res) => {
            if (err) throw err;
            res.body.should.have.property('error');
            res.body.error.code.should.be.equal('noUser');
            done();
          });
    });
  });

  describe('DELETE /<%= resNm %>s/:id', () => {
    let <%= resNm %>s = [{name: 'name1'}];

    before('Insert seed data', done => helper.insertSeed(models[<%= ResNm %>], <%= resNm %>s, done));

    after('Delete seed data', done => helper.deleteSeed(models[<%= ResNm %>], <%= resNm %>s, done));

    it('should return 204 status code', done => {
      request(app)
          .delete('/v1/<%= resNm %>s/1')
          .expect(204)
          .end(done);
    });

    it('should return 400 status code on invalid id', done => {
      request(app)
          .delete('/v1/<%= resNm %>s/abc')
          .expect(400)
          .end((err, res) => {
            if (err) throw err;
            res.body.should.have.property('error');
            res.body.error.code.should.be.equal('invalidId');
            done();
          });
    });

    it('should return 404 status code on no id', done => {
      request(app)
          .delete('/v1/<%= resNm %>s/999')
          .expect(404)
          .end((err, res) => {
            if (err) throw err;
            res.body.should.have.property('error');
            res.body.error.code.should.be.equal('noUser');
            done();
          });
    });
  });
});
