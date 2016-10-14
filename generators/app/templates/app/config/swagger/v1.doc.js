"use strict";

const pkg = require('../../../package.json');
const tags = {
  // Tags will be here

};

const parameters = {
  Limit: {
    name: 'limit',
    type: 'number',
    required: false,
    in: 'query',
    default: 10
  },
  Offset: {
    name: 'offset',
    type: 'number',
    required: false,
    in: 'query',
    default: 0
  },
  Name: {
    name: 'body',
    required: true,
    in: 'body',
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        }
      }
    }
  },
  Id: {
    name: 'id',
    type: 'number',
    required: true,
    in: 'path',
    default: 1
  },
};

const definitions = {

};

const paths = {
  // Path will be here

};

module.exports = {
  swagger: '2.0',
  info: {
    title: pkg.name || 'PROJECT NAME',
    description: `API Document for ${pkg.name || 'PROJECT NAME'}`,
    contact: {
      name: pkg.author || 'USER NAME, COMPANY'
    },
    license: {
      name: "Apache 2.0",
      url: "http://www.apache.org/licenses/LICENSE-2.0.html"
    },
    version: pkg.version || '0.1.0'
  },
  basePath: '/v1',
  schemes: [
    'http'
  ],
  consumes: [
    'application/json'
  ],
  produces: [
    'application/json'
  ],

  paths: paths,
  parameters: parameters,
  definitions: definitions
};
