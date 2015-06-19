'use strict';

var Twitter = require('../services/Twitter.js');
var User = require('../models/User.js');

var TwitterCallback = function(req, res){

	var getAccessToken = function(){
		Twitter.getAccessToken(req.session.token, req.session.tokenSecret, req.query.oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
			if(error){
				handleError(error);
			}else{
				verifyCredentials(accessToken, accessTokenSecret);
			}
		});
	}

	var verifyCredentials = function(accessToken, accessTokenSecret){
		Twitter.verifyCredentials(accessToken, accessTokenSecret, function(error, data, response) {
		    if(error){
		        handleError(error);
		    }else{
		    	updateOrCreateUser(data, accessToken, accessTokenSecret);
		    }
		});
	}

	var updateOrCreateUser = function(data, accessToken, accessTokenSecret){
		User.UpdateOrCreate(
				data.id_str,
				data.name,
				data.profile_image_url,
				accessToken,
				accessTokenSecret,
				function(error){
					if(error){
						handleError(error);
					}else{
						req.session.loggedin = true;
						req.session.user_id = data.id_str;
						redirect();
					}
				}
		);
	}

	var redirect = function(){
		res.redirect('/listreports');
	}

	var handleError = function(error){
		res.send(error);
	}

	getAccessToken();

}

module.exports = TwitterCallback;