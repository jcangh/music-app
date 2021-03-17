'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/music_app', 
    { useNewUrlParser: true,
        useUnifiedTopology: true },
    (err,res) => {
    if (err){
        throw err;
    }else{
        console.log("::Database connection stablished");

        app.listen(port, function(){
            console.log("::Server up and running in http://localhost:"+port);
        });
    }
});