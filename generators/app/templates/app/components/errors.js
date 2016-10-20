'use strict';

const WeplaError = (statusCode, defaultErrorCode) => {
  return (errorCode, message) => {
    return {
      statusCode: statusCode,
      errorCode: errorCode || defaultErrorCode,
      message: message || ''
    }
  }
};

const ErrorCodes = {
  NotFound: 'NotFound',
  BadRequest: 'BadRequest',
  NoUser: 'NoUser',
  InvalidId: 'InvalidId',
  EmptyName: 'EmptyName',
  Conflict: 'Conflict',
  Unauthorized: 'Unauthorized',
  InvalidToken: 'InvalidToken'
};

module.exports = {
  NotFound:     WeplaError(404, ErrorCodes.NotFound),
  BadRequest:   WeplaError(400, ErrorCodes.BadRequest),
  Conflict:     WeplaError(409, ErrorCodes.Conflict),
  Unauthorized: WeplaError(401, ErrorCodes.Unauthorized),

  Codes: ErrorCodes
};
