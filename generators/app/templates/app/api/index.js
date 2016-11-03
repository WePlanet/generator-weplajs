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
    message: e.message || '',
    errorLog: e.errorLogs || []
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
        if (!v.exist(checker.target)(options)) {
          const elogs = [v.exist(checker.target).log];
          err = err.concat(errors.BadRequest(null, null, elogs));
        } else {
          const elogs = v.checkerInvoker(checker.vdts, options[checker.target]);
          if (elogs.length) {
            err = err.concat(errors.BadRequest(checker.e.code, checker.e.message, elogs));
          }
        }
        return err;
      }, []);

      if (retErrors.length) next(retErrors);
      else next();
    };
  },
  error404(req, res, next) {
    next(errors.NotFound());
  },
  error(err, req, res, next) {
    if (statusCode(err) >= 500) console.error(err);
    res.status(statusCode(err)).json(formatHttpError(err));
  },
  isAuthenticated: auth.isAuthenticated
};
