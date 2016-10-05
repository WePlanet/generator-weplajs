'use strict';

const router = require('express').Router();
const ctrl = require('./user.ctrl.js');
const api = require('../../');

router.get('/', api.http(ctrl.index));

router.get('/:id', api.http(ctrl.show));

router.post('/', api.http(ctrl.create));

router.put('/:id', api.http(ctrl.update));

router.delete('/:id', api.http(ctrl.destroy));

module.exports = router;
