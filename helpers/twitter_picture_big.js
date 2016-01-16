'use strict';

const Handlebars = require('handlebars');

Handlebars.registerHelper('twitter_picture_big', function(url) {
	if(url && url instanceof String){
		return url.replace("_normal","");
	}else{
		return url;
	}
});
