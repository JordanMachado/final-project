var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;



gulp.task('watch', function() {

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);

});