'use strict';

var db = require('../services/MongoDB.js');
var Schema = db.Schema;
var mongoose = db.mongoose;
var TwitterProfile = require('./TwitterProfile.js');

var Utils = require('../utils');

var ReportSchema = new Schema({
	user_id: {type: String},
	date: {type: Date},
	newfollowers: [{type: String, ref: 'TwitterProfile'}],
	unfollowers: [{type: String, ref: 'TwitterProfile'}]
});

ReportSchema.statics.generateReportFromData = function(user, previous_followers, actual_followers, callback){
	var diff_result = Utils.diff(previous_followers, actual_followers);

	if(diff_result.added.length == 0 && diff_result.removed.length == 0){
		callback(null);
		return;
	}

	var newReport = new Report({
		user_id: user.user_id,
		date: Date.now(),
		newfollowers: diff_result.added,
		unfollowers: diff_result.removed
	});

	TwitterProfile.lookup(user, [].concat(diff_result.added).concat(diff_result.removed), function(){
		newReport.save(callback);
	});

}

var Report = mongoose.model('Report', ReportSchema);

module.exports = Report;