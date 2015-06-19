'use strict';

var Home = function(req, res){
	res.render('home', {layout: 'landing'});
}

module.exports = Home;