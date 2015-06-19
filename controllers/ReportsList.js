'use strict';

var Report = require('../models/Report.js');

var ReportsList = function(req, res){
	Report.find({}).sort('-date').limit(10).populate('newfollowers').populate('unfollowers').exec(function(err, docs){
		res.render('reportslist', {reports:docs, user:req.user});
	});
}

module.exports = ReportsList;