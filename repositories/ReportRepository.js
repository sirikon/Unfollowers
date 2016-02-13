'use strict';

const Report = require('../models/Report');

module.exports = {
  createReport: function(user, diff) {
    return new Promise((resolve, reject) => {
      if (!diff.added.length && !diff.removed.length) {
        reject(new Error("Diff data is empty"));
      } else {
        var newReport = new Report({
          user_id: user.user_id,
          date: Date.now(),
          newfollowers: diff.added,
          unfollowers: diff.removed
        });
        newReport.save(resolve);
      }
    });
  }
}
