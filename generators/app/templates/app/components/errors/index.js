'use strict';

/**
 * Error generator
 * @param statusCode
 * @param defaultErrorCode
 * @returns {function(*=, *=): {statusCode: *, errorCode: *, message: string}}
 * @constructor
 */
const WeplaError = (statusCode, defaultErrorCode) => {
  return (errorCode, message) => ({
    statusCode: statusCode,
    errorCode: code(errorCode) || defaultErrorCode,
    message: message || code(errorCode) ? '' : errorCode
  });
};

/**
 * GET error codes from errors.json
 */
let _m = new Map();
Array.from(require('./error-codes.json'))
    .forEach(item => {
      if (item.hasOwnProperty('code')) _m.set(item.code, item.code)
    });
const code = errorCode => _m.get(errorCode);

module.exports = {
  NotFound:     WeplaError(404, code('NotFound')),
  BadRequest:   WeplaError(400, code('BadRequest')),
  Conflict:     WeplaError(409, code('Conflict')),
  Unauthorized: WeplaError(401, code('Unauthorized')),

  Codes: code
};
