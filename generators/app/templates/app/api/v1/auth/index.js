'use strict';

const router = require('express').Router();
const controller = require('./auth.controller.js');
const auth = require('../../../components/auth.service');
const api = require('../../index');

router.post('/', controller.login);

router.put('/',
    api.verify('email'),
    api.http(controller.resetPassword));

router.delete('/',
    auth.isAuthenticated(),
    api.http(controller.logout));


module.exports = router;
