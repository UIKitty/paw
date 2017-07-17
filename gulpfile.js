/******************************************
 *  Author : Alan R. Saberi
 *  Created On : Fri Jul 14 2017
 *  File : gulpfile.js
 *  Copy right: MIT
 *******************************************/
'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

// paths
var paths = {
    sass_source : ['./source/**/*.scss'],
    css_source : ['./source/css'],
    dist : ['./dist']
};

// css
gulp.task('sass', () => {
  return gulp.src(paths.sass_source)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.css_source));
});

gulp.task('concat-css', ['sass'],() => {
    return gulp.src(path.css_source).pipe(concat('main.css')).pipe(gulp.dest(paths.dist));
});

gulp.task('minify-css', ['concat-css'], () => {
  return gulp.src(paths.dist + '/main.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(paths.dist));
});

// watcher
// Rerun the task when a file changes
gulp.task('watch', () => {
    gulp.watch(paths.sass_source, ['minify-css']);
});