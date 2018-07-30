'use strict';

var TwitterRepository = require('../../repositories/TwitterRepository');
var UserRepository = require('../../repositories/UserRepository');

var TwitterCallback = function(req, res){

	TwitterRepository.getAccessToken(req.session.token, req.session.tokenSecret, req.query.oauth_verifier).then((result) => {
		TwitterRepository.verifyCredentials(result.accessToken, result.accessTokenSecret).then((data) => {
			UserRepository.addOrUpdate({
				user_id: data.id_str,
				name: data.name,
				screen_name: data.screen_name,
				twitter: {
					accessToken: result.accessToken,
					accessTokenSecret: result.accessTokenSecret
				}
			}).then(() => {
				req.session.loggedin = true;
				req.session.user_id = data.id_str;
				res.redirect('/home');
			}, handleError);
		}, handleError);
	}, handleError);

	var handleError = (err) => {
		res.send('There was an error with Twitter connectivity... try again later');
		console.log(err);
	}

}

module.exports = TwitterCallback;
