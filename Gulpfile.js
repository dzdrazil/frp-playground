'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('vendor', function() {
  return gulp.src('bower_components/kefir/dist/kefir.js')
    .pipe(gulp.dest('out/vendor/'));
});

gulp.task('default', ['vendor'], function() {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      modules: 'umd'
    }))
    .pipe(gulp.dest('out/js'));
});
