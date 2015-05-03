var fs = require('fs');
var tasks = fs.readdirSync('./gulp/');
var gulp = require('gulp');

tasks.forEach(function(task) {
  if(task.slice(-3) != '.js') return;
  require('./gulp/' + task);
});

'use strict';


gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
