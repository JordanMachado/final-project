var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var aliasify = require('aliasify');

var browserify = require('browserify'),
	watchify = require('watchify'),
	stringify = require('stringify'),
	source = require('vinyl-source-stream'),
	handleErrors = require('./utils/handleErrors');


gulp.task('browserify', function() {

	var aliasifyConfig = {
		aliases: {
			"App": "./app/scripts/app/App",
			"Const": "./app/scripts/app/utils/Const.js",
			"Resources": "./app/scripts/app/utils/Resources.js",
			"MathFX": "./app/scripts/app/utils/MathFX.js",
			"ComponentFactory": "./app/scripts/app/components/ComponentFactory.js",
			"ThreeDSound": "./app/scripts/app/sound/ThreeDSound.js",
			"Sound": "./app/scripts/app/sound/AbstractSound.js",
			"VideoContainer":"./app/scripts/app/utils/VideoContainer.js"
		},
		verbose: false
	}

	


	var b = browserify("./app/scripts/main.js", {
		cache: {},
		packageCache: {}
	});
	b.transform(aliasify, aliasifyConfig);
	b.transform(stringify(['.tpl']))

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