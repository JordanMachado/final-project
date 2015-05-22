var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('video', function () {
  return gulp.src('app/videos/**/*')
    .pipe(gulp.dest('dist/videos'));
});