'use strict';

var requireDirectory = require('require-directory');

var mw = require('./middlewares');
var controllers = require('./controllers');

var Routes = function(app){
	app.get('/', controllers.Home);

	app.post('/genreport',   mw.UserLoggedIn, controllers.GenReport);
	app.get('/listreports',  mw.UserLoggedIn, controllers.ReportsList);

	app.get('/auth/twitter/login',    controllers.TwitterLogin);
	app.get('/auth/twitter/callback', controllers.TwitterCallback);
}

module.exports = Routes;