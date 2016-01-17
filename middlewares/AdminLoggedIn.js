'use strict';

var AdminLoggedIn = function(req, res, next){
	if(req.session.admin_loggedin){
		next();
	}else{
		res.redirect('/admin/login');
	}
}

module.exports = AdminLoggedIn;
