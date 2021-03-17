'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var songSchema = schema({
    number: String,
    name: String,
    duration: String,
    file: String,
    album: { type: mongoose.Schema.ObjectId, ref: 'Album'}
});

module.exports = mongoose.model('Song',songSchema);