var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


var browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    handleErrors = require('./utils/handleErrors');


gulp.task('watch', function() {

   // watch for changes
  gulp.watch([
    'app/*.html',
    'app/scripts/**/*.js',
    'app/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', rebundle);

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);

  var b = browserify("./app/scripts/main.js",
    {
        cache: {},
        packageCache: {}
    });
  var bundler = watchify(b);  

  bundler.on('update', rebundle);
 
  function rebundle() {
    reload();
    return bundler.bundle()
      .on('error', handleErrors)
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(('.tmp/js')));
  }
 
  return rebundle();
});