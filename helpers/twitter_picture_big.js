'use strict';

var Handlebars = require('handlebars');

Handlebars.registerHelper('twitter_picture_big', function(url) {
	return url.replace("_normal","");
});