'use strict';

var Report = require('../../models/Report.js');

var ReportList = function(req, res){
	Report
    .find({user_id: req.user.user_id})
    .sort('-date')
    .limit(30)
    .populate('newfollowers')
    .populate('unfollowers')
    .exec(function(err, docs){
  		res.send(docs);
  	});
}

module.exports = ReportList;
