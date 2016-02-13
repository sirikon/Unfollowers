'use strict';

// Requires
const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser')
const logfmt = require('logfmt');
const MongoStore = require('connect-mongo')(session);

var Config = require('./services/Config.js');
var Routes = require('./routes.js');
require('./helpers');

// Init the app instance
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs', handlebars: require('handlebars')}));
app.set('view engine', 'hbs');

if (Config.LOG_ENABLED) {
    app.use(logfmt.requestLogger());
}

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

// 404
app.use(function(req, res, next) {
  res.redirect('/');
});

/* Server initialization */
app.listen(Config.PORT, function() {
  console.log("Listening on " + Config.PORT);
});
