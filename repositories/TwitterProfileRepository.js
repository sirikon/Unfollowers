'use strict';

var TwitterProfile = require('../models/TwitterProfile');

module.exports = {
  addOrUpdate: function(item) {
    return new Promise((resolve, reject) => {
      TwitterProfile.update({user_id: item.id_str}, {
        _id: item.id_str,
        name: item.name,
        screen_name: item.screen_name
      }, {upsert: true}, function (err) {
        if (err) {
          reject();
        } else {
          resolve();
        }
      });
    });
  }
}
