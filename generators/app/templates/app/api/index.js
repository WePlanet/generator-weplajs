"use strict";

const config = require('../config/environment');
const errors = require('../components/errors');
const auth = require('../components/auth-service.js');
const v = require('../components/param-validator');

const statusCode = err => {
  err = Array.isArray(err) ? err : [err];
  return err[0].statusCode || 500;
};

const formatHttpError = err => {
  err = Array.isArray(err) ? err : [err];
  return err.map(e => ({
    errorCode: e.errorCode || 'InternalServerError',
    message: e.message || ''
  }));
};

const mergeParams = req => {
  return Object.assign({}, req.params, req.query, req.body, {
    context: {
      user: req.user || null
    }
  });
};

module.exports = {
  http(apiMethod) {
    return (req, res, next) => {
      apiMethod(mergeParams(req))
          .then(result => {
            let statusCode = result.statusCode || 200;
            let body = result.body || result;
            delete result.statusCode;
            res.status(statusCode).json(body);
          })
          .catch(err => next(err));
    };
  },

  checkParams(...checkers) {
    return (req, res, next) => {
      const options = mergeParams(req);

      const retErrors = checkers.reduce((err, checker) => {
        if (!options.hasOwnProperty(checker.target)) {
          return err.concat(errors.BadRequest(`${checker.target} is required`));
        }
        return err.concat(v.checkerInvoker(checker, options[checker.target]));
      }, []);

      if (retErrors.length) next(retErrors);
      else next();
    };
  },

  isAuthenticated: auth.isAuthenticated,

  error404(req, res, next) {
    next(errors.NotFound());
  },

  error(err, req, res, next) {
    res.status(statusCode(err)).json(formatHttpError(err));
  }
};
