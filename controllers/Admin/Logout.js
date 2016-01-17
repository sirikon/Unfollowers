'use strict';

var Logout = function(req, res) {
  req.session.admin_loggedin = false;
  res.redirect('/admin/login');
}

module.exports = Logout;
