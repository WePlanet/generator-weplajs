'use strict';

const router = require('express').Router();
const ctrl = require('./<%= resource %>.ctrl');
const api = require('../../');
const v = require('../../../components/param-validator');

router.get('/',
    api.isAuthenticated(),
    api.http(ctrl.index));

router.get('/:id',
    api.isAuthenticated(),
    api.checkParams(v.genChecker('id', v.beNumber)),
    api.http(ctrl.show));

router.post('/',
    api.checkParams(v.genChecker('name', v.haveLengthGt(1))),
    api.isAuthenticated(),
    api.http(ctrl.create));

router.put('/:id',
    api.isAuthenticated(),
    api.checkParams(v.genChecker('id', v.beNumber),
        v.genChecker('name', v.beString, v.haveLengthGt(1))),
    api.http(ctrl.update));

router.delete('/:id',
    api.isAuthenticated(),
    api.checkParams(v.genChecker('id', v.beNumber)),
    api.http(ctrl.destroy));

module.exports = router;
