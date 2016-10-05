'use strict';

const express = require('express');
const path = require('path');
const swaggerParser = require('swagger-parser');

function setupSwaggerDocument(app, version) {
  app.get('/swagger/doc', (req, res) => {
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
}

function setupSwaggerUi(app) {
  app.use('/swagger', (req, res, next) => {
    if (req.url === '/') {
      return res.redirect('/swagger?url=doc');
    }
    next();
  }, express.static(path.join(__dirname, '../../../node_modules/swagger-ui/dist')));
}

module.exports = function setup(app) {
  setupSwaggerDocument(app, 'v1');
  setupSwaggerUi(app);
};
