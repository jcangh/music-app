'use strict'

var express = require('express');


var app = express();

//routes
app.get('/test', function(req,res){
    res.status(200).send({message: 'first rest endpoint'});
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//http headers

module.exports = app;