'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var albumSquema = schema({
    title: String,
    description: String,
    year: Number,
    image: String,
    artist: { type: mongoose.Schema.ObjectId, ref: 'Artist'}
});

module.exports = mongoose.model('Album',albumSquema);