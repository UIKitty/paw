/******************************************
 *  Author : Alan R. Saberi
 *  Created On : Fri Jul 14 2017
 *  File : gulpfile.js
 *  Copy right: MIT
 *******************************************/
'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sassdoc = require('sassdoc');


// paths
var paths = {
    sass_source : ['./source/scss/*.scss'],
    css_source : './source/css',
    maps : './maps',
    dist : './dist'
};

// compressed
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
};

// css
gulp.task('sass', () => {
  return gulp.src(paths.sass_source)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write(paths.maps))
    .pipe(gulp.dest(paths.dist));
});

//  Documentation
var sassdocOptions = {
  dest: './dist/docs'
};

gulp.task('sassdoc', () => {
  return gulp
    .src(paths.css_source)
    .pipe(sassdoc(sassdocOptions))
    .resume();
});


// watcher
// Rerun the task when a file changes
gulp.task('watch', () => {
    gulp.watch(paths.sass_source, ['sass']);
});


// default
gulp.task('default', ['sass', 'watch'], () => {
    // This will only run if the dependency tasks are successful...
});