'use strict'

var Error = function(req, res) {
  res.redirect('/home?error=1');
}

module.exports = Error;
