'use strict';

const crypto = require('crypto');

exports.passwordHash = password => {
  return crypto.createHash('sha1').update(password.toString()).digest('hex');
};
