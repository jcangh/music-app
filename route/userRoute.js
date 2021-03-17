'use strict'

var express = require('express');
var UserController = require('../controller/userController');

var api = express.Router();

api.post('/user', UserController.saveUser);

module.exports = api;
