'use strict'

var express = require('express');
var UserController = require('../controller/userController');
var mdAuth = require('../middleware/auth');

var api = express.Router();

api.post('/user', UserController.saveUser);
api.post('/user/login', UserController.loginUser);
api.get('/test', mdAuth.ensureAth,UserController.test);

module.exports = api;
