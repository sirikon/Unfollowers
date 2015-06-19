'use strict';

var twitterAPI = require('node-twitter-api');

var Config = require('./Config.js');

var TwitterConnection = new twitterAPI({
	consumerKey: Config.TWITTER_CONSUMER_KEY,
    consumerSecret: Config.TWITTER_CONSUMER_SECRET,
    callback: Config.TWITTER_API_CALLBACK
});

module.exports = TwitterConnection;