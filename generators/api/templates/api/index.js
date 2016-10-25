'use strict';

const router = require('express').Router();
const ctrl = require('./<%= resource %>.ctrl');
const api = require('../../');

router.get('/',
    api.isAuthenticated(),
    api.http(ctrl.index));

router.get('/:id',
    api.isAuthenticated(),
    api.checkParams([
      {name: 'id', validator: id => !isNaN(parseInt(id, 10))}
    ]),
    api.http(ctrl.show));

router.post('/',
    api.checkParams([
      {name: 'name', validator: name => typeof name === 'string' && name.trim().length > 1}
    ]),
    api.isAuthenticated(),
    api.http(ctrl.create));

router.put('/:id',
    api.isAuthenticated(),
    api.checkParams([
      {name: 'id', validator: id => !isNaN(parseInt(id, 10))},
      {name: 'name', validator: name => typeof name === 'string' && name.trim().length > 1}
    ]),
    api.http(ctrl.update));

router.delete('/:id',
    api.isAuthenticated(),
    api.checkParams([
      {name: 'id', validator: id => !isNaN(parseInt(id, 10))}
    ]),
    api.http(ctrl.destroy));

module.exports = router;
