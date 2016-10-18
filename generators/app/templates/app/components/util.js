'use strict';

const crypto = require('crypto');

exports.passwordHash = password => {
  return crypto.createHash('sha1').update(password.toString()).digest('hex');
};

exports.capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

