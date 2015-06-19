'use strict';

var Twitter = require('../services/Twitter.js');

var TwitterLogin = function(req, res){

	var getRequestToken = function(){
		Twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
			if(error){
				handleError(error);
			}else{
				redirect(requestToken, requestTokenSecret);
			}
		});
	}

	var handleError = function(error){
		res.send(error);
	}

	var redirect = function(requestToken, requestTokenSecret){
		req.session.token 		= requestToken;
		req.session.tokenSecret = requestTokenSecret;
		res.redirect('https://twitter.com/oauth/authenticate?oauth_token=' + requestToken);
	}

	getRequestToken();

}

module.exports = TwitterLogin;