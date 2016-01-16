'use strict';

var requireDirectory = require('require-directory');

var mw = require('./middlewares');
var controllers = require('./controllers');

var Routes = function(app){

	// Web Client
	app.get('/', controllers.Landing);

	app.post('/genreport',   mw.UserLoggedIn, controllers.GenReport);
	app.get('/home',         mw.UserLoggedIn, controllers.Home);

	app.get('/auth/twitter/login',    controllers.TwitterLogin);
	app.get('/auth/twitter/callback', controllers.TwitterCallback);
	app.get('/auth/logout',           controllers.Logout);

	// API
	app.get('/api/reports', mw.UserLoggedIn, controllers.APIReportList);
}

module.exports = Routes;
