var gulp = require( 'gulp' ),
	gutil = require( 'gulp-util' ),
	jshint = require( 'gulp-jshint' ),
	bundle = require( './browserify' );

module.exports = function () {
	gutil.log( 'JSHint\'ing files...' );

	gulp.src( [
			'./js/**/*.js',
			'!./js/lib/**/*.js',
			'!./js/templates/**/*.js'
		] )
		.pipe( jshint() )
		.pipe( jshint.reporter( 'jshint-stylish', { verbose: true } ) )
		.pipe( jshint.reporter( 'fail' ) );

	return bundle();
};
