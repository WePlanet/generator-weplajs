'use strict';

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const compose = require('composable-middleware');
const config = require('../config/environment');
const models = require('../models');
const errors = require('../components/errors');
const validateJwt = expressJwt({secret: config.accessToken.secret});

module.exports = {
  signToken(userId) {
    return jwt.sign({id: userId}, config.accessToken.secret, {
      expiresIn: config.accessToken.expireSeconds
    });
  },
  decodeToken() {
    return (req, res, next) => {
      if (req.query && req.query.hasOwnProperty('accessToken')) {
        req.headers.authorization = 'Bearer ' + req.query.accessToken;
      }

      if (req.headers.authorization) return validateJwt(req, res, next);

      next();
    }
  },
  isAuthenticated() {
    return compose()
        .use((req, res, next) => {
          if (req.query && req.query.hasOwnProperty('accessToken')) {
            req.headers.authorization = 'Bearer ' + req.query.accessToken;
          }

          validateJwt(req, res, next);
        })
        .use((err, req, res, next) => {
          if (err.name === 'UnauthorizedError') {
            next(errors.Unauthorized(errors.code('InvalidToken')));
          }
        })
        .use((req, res, next) => {
          models.User.findOne({
            where: {id: req.user.id}
          }).then((user) => {
            if (!user) {
              return next(errors.Unauthorized(errors.code('NotFoundByToken')));
            }

            req.user = user.get({plain: true});
            if (`Bearer ${req.user.accessToken}` !== req.headers.authorization) {
              return next(errors.Unauthorized(errors.code('InvalidToken')));
            }

            delete req.user.password;
            next();
          }).catch(err => next(err));
        });
  },
  checkApiKey() {
    return (req, res, next) => {
      if (process.env.NODE_ENV !== 'production')
        return next();
      if (req.query.apiKey !== config.apiKey)
        throw errors.Unauthorized('UnmatchedApiKey');
      next();
    };
  }
};
