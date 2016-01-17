'use strict';

var Landing = function(req, res){
	res.render('landing', {layout: 'landing'});
}

module.exports = Landing;