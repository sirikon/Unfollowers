'use strict';

var Handlebars = require('handlebars');
var moment = require('moment');

Handlebars.registerHelper('date_from_now', function(date) {
	if(date){
		return moment(date).fromNow();
	}else{
		return date;
	}
});