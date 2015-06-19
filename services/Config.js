'use strict';

var Config = {
	SESSION_SECRET: process.env.SESSION_SECRET || '1234567890QWERTY',
	MONGODB_URI: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/unfollowers_dev',
	PORT: Number(process.env.PORT || 5000),
	TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
	TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET,
	TWITTER_API_CALLBACK: process.env.TWITTER_API_CALLBACK || 'http://127.0.0.1:5000/auth/twitter/callback',
}

if(!Config.TWITTER_CONSUMER_KEY){
	console.log("Could not find a valid Twitter Consumer Key (Environment variable TWITTER_CONSUMER_KEY not found)");
}

if(!Config.TWITTER_CONSUMER_SECRET){
	console.log("Could not find a valid Twitter Consumer Secret (Environment variable TWITTER_CONSUMER_SECRET not found)");
}

module.exports = Config;