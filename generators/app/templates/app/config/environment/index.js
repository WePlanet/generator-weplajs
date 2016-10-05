"use strict";

if (['production', 'development', 'test'].indexOf(process.env.NODE_ENV) === -1) {
  process.env.NODE_ENV = 'development';
}


// All configurations will extend these options
let all = {

};

// Export the config object based on the NODE_ENV
module.exports = Object.assign(all, require(`./${process.env.NODE_ENV}.js`) || {});
