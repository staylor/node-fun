var gulp = require( 'gulp' ),
	gutil = require( 'gulp-util' ),
	jshint = require( 'gulp-jshint' ),
	bundle = require( './browserify' );

module.exports = function () {
	gutil.log( 'JSLint\'ing files...' );

	gulp.src( [
			'js/**/*.js',
			'!js/gulp/**/*.js',
			'!js/templates/**/*.js'
		] )
		.pipe( jshint() )
		.pipe( jshint.reporter( 'jshint-stylish', { verbose: true } ) )
		.pipe( jshint.reporter( 'fail' ) );

	bundle();
};
