'use strict';

var User = require('../models/User.js');

var UserLoggedIn = function(req, res, next){

	var getUserById = function(){
		User.findOne({user_id: req.session.user_id}, function(err, doc){
			if(err || !doc){
				res.send(err || "User not found");
			}else{
				req.user = doc;
				next();
			}
		});
	}

	if(req.session.user_id && req.session.loggedin){
		getUserById();
	}else{
		res.redirect('/');
	}

}

module.exports = UserLoggedIn;