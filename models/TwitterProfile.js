'use strict';

var db = require('../services/MongoDB.js');
var Schema = db.Schema;
var mongoose = db.mongoose;

var TwitterProfileSchema = new Schema({
	_id: {type: String, unique: true, required: true, index: true},
	user_id: {type: String, unique: true, required: true, index: true},
	name: String,
	screen_name: String,
});

var TwitterProfile = mongoose.model('TwitterProfile', TwitterProfileSchema);

module.exports = TwitterProfile;
