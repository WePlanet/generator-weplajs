"use strict";

const config = require('../config/environment');
const errors = require('../components/errors');
const auth = require('../components/auth.service');

const statusCode = err => err.statusCode || 500;

const formatHttpError = err => ({
  errorCode: err.errorCode || 'InternalServerError',
  message: err.message || ''
});

module.exports = {
  /**
   * Format HTTP Response
   * @param {Function} apiMethod
   * @returns {Function} express middleware
   */
  http(apiMethod) {
    return (req, res, next) => {
      let options = Object.assign({}, req.params, req.query, req.body, {
        context: {
          user: req.user || null
        }
      });

      apiMethod(options)
          .then(result => {
            let statusCode = result.statusCode || 200;
            let body = result.body || result;
            delete result.statusCode;
            res.status(statusCode).json(body);
          })
          .catch(err => next(err));
    };
  },

  /**
   * Parameter validator
   * @param args i.e. 'name', 'age'
   * @returns {function(*, *, *)}
   */
  verify(...args) {
    return (req, res, next) => {
      const options = Object.assign({}, req.params, req.query, req.body);
      const verified = args.every(arg => options.hasOwnProperty(arg));

      if (!verified) {
        let errorMessage = `${args.join(', ')} is(are) required`;
        return next(errors.BadRequest(errorMessage));
      }

      next();
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


