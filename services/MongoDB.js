'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Config = require('./Config.js');

mongoose.connect(Config.MONGODB_URI);

module.exports = {
	mongoose: mongoose,
	Schema: Schema,
}