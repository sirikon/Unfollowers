'use strict';

const Handlebars = require('handlebars');

Handlebars.registerHelper('twitter_picture_big', function(url) {
	if(url && typeof url === "string"){
		return url.replace("_normal","");
	}else{
		return url;
	}
});
