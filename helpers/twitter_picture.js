'use strict';

const Handlebars = require('handlebars');

Handlebars.registerHelper('twitter_picture', function(screen_name, size) {
	return `https://twitter.com/${screen_name}/profile_image?size=${size}`;
});
