'use strict';

const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const paths = require('../options/paths');

module.exports = function(gulp) {
  gulp.task('sass', function(){
  	gulp.src(paths.src.sass)
  		.pipe(sourcemaps.init())
          .pipe(sass().on('error', sass.logError))
          .pipe(sourcemaps.write('./'))
          .pipe(gulp.dest(paths.dest.sass));
  });
};
