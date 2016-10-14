'/<=% resource =>s': {
    get: {
      tags: [tags['<=% Resource =>']],
      summary: 'Get <=% resource => list',
      operationId: 'get<=% Resource =>',
      parameters: [
        {$ref: '#/parameters/Offset'},
        {$ref: '#/parameters/Limit'}
      ],
      responses: {
        200: {description: 'Success'},
      }
    },
    post: {
      tags: [tags['<=% Resource =>']],
      summary: 'Create <=% resource =>',
      operationId: 'create<=% Resource =>',
      parameters: [
        {$ref: '#/parameters/Name'}
      ],
      responses: {
        201: {description: 'Created'},
        400: {description: 'Bad Request'},
        409: {description: 'Conflict'},
      }
    }
  },
  '/<=% resource =>s/{id}': {
    get: {
      tags: [tags['<=% Resource =>']],
      summary: 'Get <=% resource => by id',
      operationId: 'get<=% Resource =>ById',
      parameters: [
        {$ref: '#/parameters/Id'},
      ],
      responses: {
        200: {description: 'Success'},
        400: {description: 'Bad Request'},
        404: {description: 'Not Found'},
      }
    },
    delete: {
      tags: [tags['<=% Resource =>']],
      summary: 'Remove <=% resource => by id',
      operationId: 'remove<=% Resource =>ById',
      parameters: [
        {$ref: '#/parameters/Id'},
      ],
      responses: {
        204: {description: 'No Content'},
        400: {description: 'Bad Request'},
        404: {description: 'Not Found'},
      }
    },
    put: {
      tags: [tags['<=% Resource =>']],
      summary: 'Update <=% resource => by id',
      operationId: 'update<=% Resource =>ById',
      parameters: [
        {$ref: '#/parameters/Id'},
        {$ref: '#/parameters/Name'}
      ],
      responses: {
        200: {description: 'Success'},
        400: {description: 'Bad Request'},
        404: {description: 'Not Found'},
      }
    }
  },