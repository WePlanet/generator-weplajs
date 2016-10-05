'use strict';

class ErrorCode {
  constructor (code, message) {
    this.code = code || 'undefinedErrorCode';
    this.message = message || 'undefined error code';
  }
}

const ErrorCodes = {
  Conflict:           new ErrorCode('conflict', 'conflict'),
  ConflictUser:       new ErrorCode('conflictUser', 'conflict user name'),
  EmailValidation:    new ErrorCode('emailValidation', 'email  alidation error'),
  EmptyName:          new ErrorCode('emptyName', 'empty name'),
  BadRequest:         new ErrorCode('badRequest', 'BedRequest'),
  InvalidToken:       new ErrorCode('invalidToken', 'invalid token'),
  InvalidId:          new ErrorCode('invalidId', 'invalid id'),
  IncorrectPassword:  new ErrorCode('incorrectPassword', 'incorrect password'),
  NotFound:           new ErrorCode('notFound', 'Not Found'),
  NotFoundByToken:    new ErrorCode('notFoundByToken', 'not found user by this token'),
  NoUser:             new ErrorCode('noUser', 'no user account'),
  PasswordLength:     new ErrorCode('passwordLength', 'password length should be gte 6'),
  UndefinedErrorCode: new ErrorCode('undefinedErrorCode', 'undefined error code'),
  UserConflict:       new ErrorCode('userConflictError', 'already registered userId'),
};

class NotFound extends Error {
  constructor (errorCode) {
    super((errorCode && errorCode.message) || ErrorCodes.NotFound.message);
    this.statusCode = 404;
    this.error = errorCode || ErrorCodes.NotFound
  }
}

class BadRequest extends Error {
  constructor (errorCode) {
    super((errorCode && errorCode.message) || ErrorCodes.NotFound.message);
    this.statusCode = 400;
    this.error = errorCode || ErrorCodes.BadRequest
  }
}

class Conflict extends Error {
  constructor (errorCode) {
    super((errorCode && errorCode.message) || ErrorCodes.Conflict.message);
    this.statusCode = 409;
    this.error = errorCode || ErrorCodes.Conflict;
  }
}

class Unauthorized extends Error {
  constructor (errorCode) {
    super((errorCode && errorCode.message) || ErrorCodes.Unauthorized.message);
    this.statusCode = 401;
    this.error = errorCode || ErrorCodes.Unauthorized;
  }
}

module.exports = {
  NotFound: NotFound,
  BadRequest: BadRequest,
  Conflict: Conflict,
  Unauthorized: Unauthorized,

  Codes: ErrorCodes
};
