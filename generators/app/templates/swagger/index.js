'use strict';

const express = require('express');
const path = require('path');
const swaggerParser = require('swagger-parser');

const checkSwaggerSpec = () => {
  const docs = fs
      .readdirSync(__dirname)
      .filter(f => /^v\d\.doc\.js$/.test(f))
      .map(f => require(`./${f}`));

  return Promise
      .all(docs.map(d => swaggerParser.validate(d)))
      .then(() => [])
      .catch(err => Promise.resolve([err]))
};

const setupSwaggerDocRoutes = (app, version) => {
  app.get(`/swagger/doc/${version}`, (req, res) => {
    let doc = require(`./${version}.doc.js`);
    doc.host = req.headers.host;
    res.json(doc);
  });
};

const setupSwaggerUi= app => {
  app.use('/swagger', (req, res, next) => {
    if (req.url === '/') {
      return res.redirect('/swagger?url=doc/v1');
    }
    next();
  }, express.static(path.join(__dirname, '../../../node_modules/swagger-ui/dist')));
};

module.exports = app => {
  // Swagger document path will be here
  setupSwaggerDocRoutes(app, 'v1');

  setupSwaggerUi(app);
};

module.exports.checkSwaggerSpec = checkSwaggerSpec;
