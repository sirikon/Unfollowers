'use strict';

var db = require('../services/MongoDB.js');
var Schema = db.Schema;
var mongoose = db.mongoose;
var Twitter = require('../services/Twitter.js');

var TwitterProfileSchema = new Schema({
	_id: {type: String, unique: true, required: true, index: true},
	user_id: {type: String, unique: true, required: true, index: true},
	name: String,
	screen_name: String,
	picture: String
});

TwitterProfileSchema.statics.lookup = function(user, list, callback){

	var requests = [];
	var numberOfRequests = Math.ceil( list.length / 100 );

	for(var i = 0; i < numberOfRequests; i++){
		var newRequest = {
			list: list.splice(0, 100),
			lookedup_list: [],
			done: false
		}
		requests.push(newRequest);
	}

	function lookUpRequest(){
		var _this = this;
		Twitter.users("lookup", {
				user_id: this.list.join(","),
				include_entities: false
			},
		    user.twitter.accessToken,
		    user.twitter.accessTokenSecret,
		    function(error, data, response) {
		    	if(error){
		    		console.log(error);
		    		return;
		    	}
		    	_this.lookedup_list = data;
		    	_this.done = true;
		    	requestDone()
		    }
		);
	}

	function requestDone(){
		var done = true;
		for(var i in requests){
			if(!requests[i].done){
				done = false;
			}
		}

		if(done){
			updateDatabase();
		}
	}

	var lookedup_list = []
	function updateDatabase(){
		for(var i in requests){
			var request = requests[i];
			lookedup_list = lookedup_list.concat(request.lookedup_list);
		}

		for(var i in lookedup_list){
			var item = lookedup_list[i];
			TwitterProfile.update({user_id: item.id_str}, {
				_id: item.id_str,
				name: item.name,
				screen_name: item.screen_name,
				picture: item.profile_image_url_https
			}, {upsert: true}, function (err) {
				upsertDone();
			});
		}
	}

	var upsertsDone = 0;
	function upsertDone(){
		upsertsDone++;
		if(upsertsDone >= lookedup_list.length){
			callback();
		}
	}

	for(var i in requests){
		var request = requests[i];
		lookUpRequest.call(request);
	}
}

var TwitterProfile = mongoose.model('TwitterProfile', TwitterProfileSchema);

module.exports = TwitterProfile;
