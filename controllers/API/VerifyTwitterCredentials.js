'use strict';

var TwitterRepository = require('../../repositories/TwitterRepository');
var UserRepository = require('../../repositories/UserRepository');

var VerifyTwitterCredentials = function(req, res){

  var handleError = (error) => {
		res.send({status: false, error: error});
	};

	TwitterRepository.verifyCredentials(req.body.token, req.body.token_secret).then((data) => {
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
			res.send({status: true, session_id: req.sessionID});
		}, handleError);
	}, handleError);

}

module.exports = VerifyTwitterCredentials;
