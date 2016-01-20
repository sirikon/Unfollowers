'use strict';

var Logout = function(req, res){
	req.session.token = null;
	req.session.tokenSecret = null;
	req.session.user_id = null;
	req.session.loggedin = false;
	res.redirect('/');
}

module.exports = Logout;
