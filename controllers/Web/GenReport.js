'use strict';

var Twitter = require('../../services/Twitter.js');
var Report = require('../../models/Report.js');

var GenReport = function(req, res){
	req.user.getFollowers(function(err, actual_followers){
		if(err){ res.send(err); return; }
		var previous_followers = req.user.getPreviousFollowersList();
		req.user.setPreviousFollowersList(actual_followers);
		Report.generateReportFromData(req.user, previous_followers, actual_followers, function(err){
			if(err){
				res.send(err);
			}else{
				res.redirect('/home');
			}
		});
	});
}

module.exports = GenReport;
