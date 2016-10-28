'use strict';

const router = require('express').Router();
const controller = require('./auth.controller.js');
const api = require('../../index');
const auth = require('../../../components/auth-service.js');
const v = require('../../../components/param-validator');
const e = require('../../../components/errors');

router.post('/',
    api.checkParams(
        v.genChecker('email', e.get('EmailPattern'), v.str, v.email),
        v.genChecker('password', e.get('PasswordLength'), v.str, v.lenGt(5))),
    controller.login);

router.put('/',
    api.checkParams(v.genChecker('email', v.str, v.email)),
    api.http(controller.resetPassword));

router.delete('/',
    auth.isAuthenticated(),
    api.http(controller.logout));


module.exports = router;
