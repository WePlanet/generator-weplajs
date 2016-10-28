"use strict";

let v = {};
v.num = str => !isNaN(parseInt(str, 10));
v.num.log ='should be a number';

v.str = str => typeof str === 'string';
v.str.log = 'should be a string';

v.email = str => {
  const ptn = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  return ptn.test(str);
};
v.email.log = 'should be an email pattern';

v.lenGt = len => {
  let fun = str => v.str(str) && str.trim().length > len;
  fun.log = `should have length of grater than ${len}`;
  return fun;
};

v.exist = key => {
  let fun = options => options.hasOwnProperty(key);
  fun.log = `${key} is required`;
  return fun;
};

v.genChecker = (target, e, ...validators) => {
  return { target: target, e: e, vdts: validators };
};

v.checkerInvoker = (validators, val) => {
  return validators.reduce((results, vdt) => {
    if (!vdt(val)) results.push(vdt.log);
    return results
  }, []);
};

module.exports = v;
