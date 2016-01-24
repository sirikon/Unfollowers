'use strict';

const User = require('../models/User');

module.exports = {
  addOrUpdate: function(item) {
    return new Promise((resolve, reject) => {
      User.update({user_id: item.user_id}, item, {upsert: true}, (err) => {
        if (err) {
          reject();
        } else {
          resolve();
        }
      });
    });
  }
}
