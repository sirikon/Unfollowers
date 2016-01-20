'use strict';

var db = require('../services/MongoDB.js');
var Twitter = require('../services/Twitter.js');
var Report = require('./Report.js');

var Schema = db.Schema;
var mongoose = db.mongoose;

var listToJson = function(list) {
	return JSON.stringify(list);
};

var jsonToList = function(data) {
	return JSON.parse(data || '[]');
};

var UserSchema = new Schema({
	user_id: {type: String, unique: true, required: true, index: true},
	name: {type: String},
	screen_name: {type: String},
	lastFollowers: {type: String, set: listToJson, get: jsonToList},
	twitter: {
		accessToken: {type: String},
		accessTokenSecret: {type: String}
	}
});

var User = mongoose.model('User',UserSchema);

module.exports = User;
