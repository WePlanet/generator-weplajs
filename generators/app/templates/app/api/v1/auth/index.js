'use strict';

const router = require('express').Router();
const controller = require('./auth.controller.js');
const auth = require('../../../components/auth-service.js');
const api = require('../../index');

router.post('/', controller.login);

router.put('/',
    api.checkParams([
      {name: 'email', validator: v => typeof v === 'string' && v.trim().length > 1}
    ]),
    api.http(controller.resetPassword));

router.delete('/',
    auth.isAuthenticated(),
    api.http(controller.logout));


module.exports = router;
