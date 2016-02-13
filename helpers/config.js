'use strict';

const Handlebars = require('handlebars');
const Config = require('../services/Config');

Handlebars.registerHelper('config', function(key) {
	return Config[key];
});
