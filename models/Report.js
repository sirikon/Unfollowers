'use strict';

var db = require('../services/MongoDB.js');
var Schema = db.Schema;
var mongoose = db.mongoose;

var ReportSchema = new Schema({
	user_id: {type: String},
	date: {type: Date},
	newfollowers: [{type: String, ref: 'TwitterProfile'}],
	unfollowers: [{type: String, ref: 'TwitterProfile'}]
});

var Report = mongoose.model('Report', ReportSchema);

module.exports = Report;
