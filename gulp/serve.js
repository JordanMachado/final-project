
var gulp = require('gulp');
var browserSync = require('browser-sync');



gulp.task('serve', ['styles', 'fonts','watch','browserify'], function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });
});