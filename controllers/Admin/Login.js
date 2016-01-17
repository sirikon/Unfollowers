'use strict';

const Config = require('../../services/Config');

var Login = function(req, res) {

  var renderLogin = function(){
    res.render('admin_login', {layout: 'admin'});
  }

  if(req.method === 'GET'){
    renderLogin();
  }else if(req.method === 'POST'){
    if(
      req.body.username === Config.ADMIN_USERNAME &&
      req.body.password === Config.ADMIN_PASSWORD
    ){
      req.session.admin_loggedin = true;
      res.redirect('/admin');
    }else{
      renderLogin();
    }
  }

}

module.exports = Login;
