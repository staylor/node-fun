var gulp = require( 'gulp' ),
	rename = require( 'gulp-rename' ),
	source = require( 'vinyl-source-stream' ),
	streamify = require( 'gulp-streamify' ),
	uglify = require( 'gulp-uglify' ),

	jshint = require( 'gulp-jshint' ),
	browserify = require( 'browserify' );

module.exports = function () {
	var DEST = './build/js',
		bundleStream;

	gulp.src( [
			'js/**/*.js',
			'!js/lib/**/*.js',
			'!js/gulp/**/*.js',
			'!js/templates/**/*.js'
		] )
		.pipe( jshint() )
		.pipe( jshint.reporter( 'jshint-stylish' ) )
		.pipe( jshint.reporter( 'fail' ) );

	bundleStream = browserify( [
		'./js/main.js'
	] ).bundle();

	return bundleStream
		.pipe( source( 'compiled.js' ) )
		.pipe( gulp.dest( DEST ) )
		.pipe( streamify( uglify() ) )
		.pipe( rename({ extname: '.min.js' }) )
		.pipe( gulp.dest( DEST ) );
};
