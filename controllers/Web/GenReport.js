'use strict';

const TwitterRepository = require('../../repositories/TwitterRepository.js');
const TwitterProfileRepository = require('../../repositories/TwitterProfileRepository.js');
const ReportRepository = require('../../repositories/ReportRepository.js');
const Utils = require('../../utils');

var GenReport = function(req, res, next) {

    var handleError = (error) => {
        req.error = error;
        next();
    };
    
    var lastFollowersIds = req.user.lastFollowers;
    var diff = null;
    var followersIds = null;
    
    TwitterRepository.getUserFollowersIds(req.user)
        .then((_followersIds) => {
            followersIds = _followersIds;
            diff = Utils.diff(lastFollowersIds, followersIds);
            return TwitterRepository.lookupUserIds(req.user, [].concat(diff.added).concat(diff.removed))
        }, handleError)
        .then((profiles) => {
            var newReportPromise = null;
            if (diff.added.length || diff.removed.length) {
                newReportPromise = ReportRepository.createReport(req.user, diff);
            }
            var profilePromises = profiles.map((profile) => {
                return TwitterProfileRepository.addOrUpdate(profile);
            });
            var remainingPromises = profilePromises;
            newReportPromise && remainingPromises.push(newReportPromise)
            return Promise.all(remainingPromises)
        }, handleError)
        .then(() => {
            req.user.lastFollowers = followersIds;
            req.user.save();
            res.redirect('/home');
        }, handleError);
        
};

module.exports = GenReport;
