'use strict';

const paths = require('../options/paths');

module.exports = function(gulp) {
  gulp.task('watch', function() {
    gulp.watch(paths.src.sass_watch, ['sass']);
  });
}
