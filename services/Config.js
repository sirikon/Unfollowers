/* global process */
'use strict';

var Config = {
	SESSION_SECRET: process.env.SESSION_SECRET || '1234567890QWERTY',
	MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/unfollowers_dev',
	PORT: Number(process.env.PORT || 5000),
	TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
	TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET,
	TWITTER_API_CALLBACK: process.env.TWITTER_API_CALLBACK || 'http://127.0.0.1:5000/auth/twitter/callback',
	ADMIN_USERNAME: process.env.ADMIN_USERNAME,
	ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    LOG_ENABLED: process.env.LOG_ENABLED || 'true',
    PIWIK_TRACKED_DOMAIN: process.env.PIWIK_TRACKED_DOMAIN || '127.0.0.1',
    PIWIK_URL: process.env.PIWIK_URL || '127.0.0.1',
    PIWIK_SITEID: process.env.PIWIK_SITEID || 1
}

Config.LOG_ENABLED = Config.LOG_ENABLED === 'true';

if(!Config.ADMIN_USERNAME || !Config.ADMIN_PASSWORD){
	console.log('ADMIN_USERNAME and ADMIN_PASSWORD are required');
	process.exit(1);
}

if(!Config.TWITTER_CONSUMER_KEY){
	console.log("Could not find a valid Twitter Consumer Key (Environment variable TWITTER_CONSUMER_KEY not found)");
}

if(!Config.TWITTER_CONSUMER_SECRET){
	console.log("Could not find a valid Twitter Consumer Secret (Environment variable TWITTER_CONSUMER_SECRET not found)");
}

module.exports = Config;
