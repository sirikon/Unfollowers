/* Dependencies */
var db = require('../services/MongoDB.js');
var Schema = db.Schema;
var mongoose = db.mongoose;
var Twitter = require('../services/Twitter.js');
var Report = require('./Report.js');

/*
 * Model Schema declaration
 */
var UserSchema = new Schema({
	user_id: {type: String, unique: true, required: true, index: true},
	name: {type: String},
	screen_name: {type: String},
	picture: {type: String},
	twitter: {
		accessToken: {type: String},
		accessTokenSecret: {type: String},
		lastFollowers: {type: String}
	}
});

UserSchema.methods.getFollowers = function(){
	var _this = this;

	if(arguments.length == 1){
		var nextCursor = -1;
		var stack = [];
		var callback = arguments[0];
		var ignorefirst = false;
	}else if(arguments.length == 3){
		var nextCursor = arguments[0];
		var stack = arguments[1]
		var callback = arguments[2];
		var ignorefirst = true;
	}

	Twitter.followers("ids", {
			count: 5000,
			cursor: nextCursor,
		},
	    _this.twitter.accessToken,
	    _this.twitter.accessTokenSecret,
	    function(error, data, response) {
	    	if(error){
	    		callback(error, []);
	    	}else{
	    		var ids = data.ids;
	    		if(ignorefirst){
	        		ids = ids.slice(1);
	        	}
	        	stack = stack.concat(ids);
	        	if(data.next_cursor == 0){
		        	callback(null, stack);
	        	}else{
		            _this.getFollowers(data.next_cursor, stack, callback);
	        	}
	    	}
	    }
	);
}

UserSchema.methods.getPreviousFollowersList = function(){
	var result = [];
	if(this.twitter.lastFollowers){
		result = JSON.parse(this.twitter.lastFollowers);
	}
	return result;
}

UserSchema.methods.setPreviousFollowersList = function(list){
	this.twitter.lastFollowers = JSON.stringify(list);
	this.save();
}

/*
 * void UpdateOrCreate(user_id, name, picture, accessToken, accessTokenSecret, callback)
 * Creates or updates an existing user with updated information.
 */
UserSchema.statics.UpdateOrCreate = function(user_id, name, picture, accessToken, accessTokenSecret, callback){
	var newUser = new User({
		user_id: user_id,
		name: name,
		picture: picture,
		twitter: {
			accessToken: accessToken,
			accessTokenSecret: accessTokenSecret
		}
	});
	newUser.save(function(err){
		if(err){
			if(err.code = 11000){
				callback(null);
			}else{
				callback(err);
			}
		}else{
			callback(null);
		}
	});
}

var User = mongoose.model('User',UserSchema);

module.exports = User;