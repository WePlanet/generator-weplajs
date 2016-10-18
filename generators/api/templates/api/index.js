'use strict';

const router = require('express').Router();
const ctrl = require('./<%= resource %>.ctrl');
const api = require('../../');

router.get('/',
    api.isAuthenticated(),
    api.http(ctrl.index()));

router.get('/:id',
    api.isAuthenticated(),
    api.http(ctrl.show()));

router.post('/',
    api.isAuthenticated(),
    api.http(ctrl.create()));

router.put('/:id',
    api.isAuthenticated(),
    api.http(ctrl.update()));

router.delete('/:id',
    api.isAuthenticated(),
    api.http(ctrl.destroy()));

module.exports = router;
