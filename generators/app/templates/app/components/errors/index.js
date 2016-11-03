'use strict';

/**
 * Error generator
 * @param statusCode
 * @param defaultErrorCode
 * @returns {function(*=, *=): {statusCode: *, errorCode: *, message: string}}
 * @constructor
 */
const WeplaError = (statusCode, defaultErrorCode) => {
  /**
   * Usage:
   *   fun('NotFound')
   *   fun('User is not found')
   *   fun(errors.code('NoUser'), 'User is not found')
   *   fun(errors.code('NoUser'), 'User is not found', ['log1', 'log2', ...])
   */
  return (errorCode, message, errorLogs) => {
    return {
      statusCode: statusCode,
      errorCode: get(errorCode) ? get(errorCode).code : defaultErrorCode,
      message: message ? message : get(errorCode) ? get(errorCode).message : '',
      errorLogs: errorLogs || []
    }
  };
};

/**
 * GET error codes from errors.json
 */
let _m = new Map();
Array.from(require('./error-codes.json'))
    .forEach(item => {
      if (item.hasOwnProperty('code')) _m.set(item.code, item)
    });
const get = errorCode => _m.get(errorCode);
const code = errorCode => get(errorCode).code;

module.exports = {
  NotFound:     WeplaError(404, code('NotFound')),
  BadRequest:   WeplaError(400, code('BadRequest')),
  Conflict:     WeplaError(409, code('Conflict')),
  Unauthorized: WeplaError(401, code('Unauthorized')),

  get: get,
  code: code
};
