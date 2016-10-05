"use strict";

const pkg = require('../../../package.json');
const TAGS = {
  USER: 'User'
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
  UserName: {
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
  UserId: {
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
  '/users': {
    get: {
      tags: [TAGS.USER],
      summary: 'Get user list',
      operationId: 'getUsers',
      parameters: [
        {$ref: '#/parameters/Offset'},
        {$ref: '#/parameters/Limit'}
      ],
      responses: {
        200: {description: 'Success'},
      }
    },
    post: {
      tags: [TAGS.USER],
      summary: 'Create an user',
      operationId: 'createUser',
      parameters: [
        {$ref: '#/parameters/UserName'}
      ],
      responses: {
        201: {description: 'Created'},
        400: {description: 'Bad Request'},
        409: {description: 'Conflict'},
      }
    }
  },
  '/users/{id}': {
    get: {
      tags: [TAGS.USER],
      summary: 'Get user by id',
      operationId: 'getUserById',
      parameters: [
        {$ref: '#/parameters/UserId'},
      ],
      responses: {
        200: {description: 'Success'},
        400: {description: 'Bad Request'},
        404: {description: 'Not Found'},
      }
    },
    delete: {
      tags: [TAGS.USER],
      summary: 'Remove user by id',
      operationId: 'removeUserById',
      parameters: [
        {$ref: '#/parameters/UserId'},
      ],
      responses: {
        204: {description: 'No Content'},
        400: {description: 'Bad Request'},
        404: {description: 'Not Found'},
      }
    },
    put: {
      tags: [TAGS.USER],
      summary: 'Update user by id',
      operationId: 'updateUserById',
      parameters: [
        {$ref: '#/parameters/UserId'},
        {$ref: '#/parameters/UserName'}
      ],
      responses: {
        200: {description: 'Success'},
        400: {description: 'Bad Request'},
        404: {description: 'Not Found'},
      }
    }
  }
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
