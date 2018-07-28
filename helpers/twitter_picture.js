'use strict';

const Handlebars = require('handlebars');

Handlebars.registerHelper('twitter_picture', function(screen_name, size) {
	return `https://avatars.io/twitter/${screen_name}/medium`;
});
