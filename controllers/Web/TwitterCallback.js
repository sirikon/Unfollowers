'use strict';

var Twitter = require('../../services/Twitter.js');
var User = require('../../models/User.js');

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
		var userObject = {
			name: data.name,
			screen_name: data.screen_name,
			picture: data.profile_image_url,
			twitter: {
				accessToken: accessToken,
				accessTokenSecret: accessTokenSecret
			}
		}
		User.update({user_id: data.id_str}, userObject, {upsert: true}, function (error) {
			if(error){
				handleError(error);
			}else{
				req.session.loggedin = true;
				req.session.user_id = data.id_str;
				redirect();
			}
		});
	}

	var redirect = function(){
		res.redirect('/home');
	}

	var handleError = function(error){
		res.send(error);
	}

	getAccessToken();

}

module.exports = TwitterCallback;
