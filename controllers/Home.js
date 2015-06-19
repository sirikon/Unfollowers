'use strict';

var Report = require('../models/Report.js');

var Home = function(req, res){
	Report.find({user_id: req.user.user_id}).sort('-date').limit(10).populate('newfollowers').populate('unfollowers').exec(function(err, docs){
		res.render('home', {reports:docs, user:req.user});
	});
}

module.exports = Home;