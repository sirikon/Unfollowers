'use strict';

const gulp = require('gulp');

require('./gulp/tasks/sass')(gulp);
require('./gulp/tasks/watch')(gulp);

gulp.task('build', ['sass']);
gulp.task('default', ['sass','watch']);
