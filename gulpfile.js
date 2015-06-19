'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var colors = require('colors');

gulp.task('default', [], function() {
	gulp.watch('front_src/sass/*.scss', ['sass']);
});

gulp.task('sass', function(){
	gulp.src('front_src/sass/main.scss')
		.pipe(sourcemaps.init())
        .pipe(sass({onError: function(err){
        	var fnl = err.file.split("/");
        	var fn = fnl[fnl.length-1];
        	console.log("ERROR: ".red + fn.yellow + "#".cyan + err.line.toString().cyan + ":".cyan + err.column.toString().cyan + " - " + err.message);
        }}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('static/css'));
});