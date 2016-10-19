'use strict';

const express = require('express');
const path = require('path');
const swaggerParser = require('swagger-parser');

const setupSwaggerDocument = (app, version) => {
  app.get(`/swagger/doc/${version}`, (req, res) => {
    let doc = require(`./${version}.doc.js`);
    doc.host = req.headers.host;

    swaggerParser.validate(doc, (err, api) => {
      if (err) {
        console.error(err);
        return res.json({error: err})
      }

      res.json(api);
    });
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

module.exports = function setup(app) {
  // Swagger document path will be here
  setupSwaggerDocument(app, 'v1');

  setupSwaggerUi(app);
};
