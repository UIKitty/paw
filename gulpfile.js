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
    sass_watch : './source/scss/**/*.scss',
    sass_source : './source/scss/*.scss',
    css_source : './source/css',
    maps : './maps',
    dist : './dist',
    public: './public'
};


// css: results in public
var sassPubOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('sass', () => {
  return gulp.src(paths.sass_source)
    .pipe(sourcemaps.init())
    .pipe(sass(sassPubOptions).on('error', sass.logError))
    .pipe(sourcemaps.write(paths.public))
    .pipe(gulp.dest(paths.public));
});


// watcher :  Rerun the task when a file changes
gulp.task('watch', () => {
    gulp.watch(paths.sass_watch, ['sass']);
});

//  Documentation
var sassdocOptions = {
  dest: './docs'
};

gulp.task('sassdoc', () => {
  return gulp
    .src(paths.sass_source)
    .pipe(sassdoc(sassdocOptions))
    .resume();
});

// Prodduction: results in dist, no sourcemap, has documentations
gulp.task('production', ['sassdoc'], () => {
  return gulp.src(paths.sass_source)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(paths.dist));
});

// default
gulp.task('default', ['sass', 'watch'], () => {
    // This will only run if the dependency tasks are successful...
});