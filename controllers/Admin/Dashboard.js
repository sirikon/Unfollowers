'use strict';

var User = require('../../models/User');

var Dashboard = function(req, res) {
  User
    .find()
    .exec((err, docs) => {
      res.render('dashboard', {users: docs, loggedin: true, layout: 'admin'});
    });
}

module.exports = Dashboard;
