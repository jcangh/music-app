'use strict'

var express = require('express');
var userRoutes = require('./route/userRoute');

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use('/api', userRoutes);




//http headers

module.exports = app;