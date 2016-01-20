'use strict';

const TwitterRepository = require('../../repositories/TwitterRepository.js');
const TwitterProfileRepository = require('../../repositories/TwitterProfileRepository.js');
const ReportRepository = require('../../repositories/ReportRepository.js');
const Utils = require('../../utils');

var GenReport = function(req, res, next){

	var handleError = (error) => { req.error = error; next(); };

	var lastFollowersIds = req.user.lastFollowers;
	TwitterRepository.getUserFollowersIds(req.user).then((followersIds) => {
		var diff = Utils.diff(lastFollowersIds, followersIds);
		var newReportPromise = null;
		if (diff.added.length || diff.removed.length) {
			newReportPromise = ReportRepository.createReport(req.user, diff);
		}
		TwitterRepository.lookupUserIds(req.user, [].concat(diff.added).concat(diff.removed))
			.then((profiles) => {
				var profilePromises = profiles.map((profile) => {
					return TwitterProfileRepository.addOrUpdate(profile);
				});
				var remainingPromises = profilePromises;
				newReportPromise && remainingPromises.push(newReportPromise)
				Promise.all(remainingPromises)
					.then(() => {
						req.user.lastFollowers = followersIds;
						req.user.save();
						res.redirect('/home');
					}, handleError);
			}, handleError);
	}, handleError);
	
};

module.exports = GenReport;
