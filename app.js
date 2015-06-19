'use strict';

// Requires
var express = require('express');
var exphbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logfmt = require('logfmt');
var MongoStore = require('connect-mongo')(session);

var Config = require('./services/Config.js');
var Routes = require('./routes.js');
require('./helpers');

// Init the app instance
var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Use logfmt for logging to console all the access
app.use(logfmt.requestLogger());

// Static resources
app.use('/static', express.static('static'));

// Enable cookieParser & session
app.use(cookieParser());
app.use(session({
	secret: Config.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({url: Config.MONGODB_URI})
}));

Routes(app);

/* Server initialization */
app.listen(Config.PORT, function() {
  console.log("Listening on " + Config.PORT);
});