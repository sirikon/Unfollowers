'use strict';

var requireDirectory = require('require-directory');

var mw = require('./middlewares');
var controllers = require('./controllers');

var Routes = function(app){
	// Web Client
	app.get('/', controllers.Web.Landing);

	app.post('/genreport',   mw.UserLoggedIn, controllers.Web.GenReport, controllers.Web.Error);
	app.get('/home',         mw.UserLoggedIn, controllers.Web.Home);

	app.get('/auth/twitter/login',    controllers.Web.TwitterLogin);
	app.get('/auth/twitter/callback', controllers.Web.TwitterCallback);
	app.get('/auth/logout',           controllers.Web.Logout);

	// Admin zone
	app.get('/admin/login',                   controllers.Admin.Login);
	app.post('/admin/login',                  controllers.Admin.Login);
	app.get('/admin/logout',                  controllers.Admin.Logout);
	app.get('/admin',       mw.AdminLoggedIn, controllers.Admin.Dashboard);

	// API
	app.get('/api/reports', mw.UserLoggedIn, controllers.API.ReportList);
}

module.exports = Routes;
