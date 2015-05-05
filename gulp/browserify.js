var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var aliasify = require('aliasify');

var browserify = require('browserify'),
	watchify = require('watchify'),
	source = require('vinyl-source-stream'),
	handleErrors = require('./utils/handleErrors');


gulp.task('browserify', function() {

	var aliasifyConfig = {
		aliases: {
			"Const": "./app/scripts/app/utils/Const.js",
			"Resources": "./app/scripts/app/utils/Resources.js"
		},
		verbose: false
	}

	


	var b = browserify("./app/scripts/main.js", {
		cache: {},
		packageCache: {}
	});
	b.transform(aliasify, aliasifyConfig);
	var bundler = watchify(b);

	bundler.on('update', rebundle);

	function rebundle() {

		console.log('rebundle')
		return bundler.bundle()
			.on('error', handleErrors)
			.pipe(source('bundle.js'))
			.pipe(gulp.dest(('.tmp/js')))
			.pipe(reload({
				stream: true
			}))


	}

	return rebundle();
});