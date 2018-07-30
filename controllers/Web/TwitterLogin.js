'use strict';

var TwitterRepository = require('../../repositories/TwitterRepository');

var TwitterLogin = function(req, res){

	TwitterRepository.getRequestToken().then((result) => {
		req.session.token = result.requestToken;
		req.session.tokenSecret = result.requestTokenSecret;
		res.redirect('https://twitter.com/oauth/authenticate?oauth_token=' + result.requestToken);
	}, (err) => {
		res.send('There was an error with Twitter connectivity... try again later');
		console.log(err);
	});

}

module.exports = TwitterLogin;
