"use strict";

const errors = require('../components/errors');
let v = {};

v.beNumber = str => !isNaN(parseInt(str, 10));

v.beString = str => typeof str === 'string';

v.haveLengthGt = len => str => str.trim().length > len;

v.genChecker = (target, ...validators) => {
  return { target: target, validators: validators };
};

v.checkerInvoker = (checker, value) => {
  return checker.validators.reduce((errArr, v) => {
    if (!v(value)) {
      const e = `${checker.target} is invalid. (${checker.target}: ${value})`;
      errArr.push(errors.BadRequest(e));
    }
    return errArr
  }, []);
};

module.exports = v;
