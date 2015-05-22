var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
gulp.task('build', ['html', 'images','video', 'fonts', 'extras'], function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});