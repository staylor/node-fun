'use strict';

var gulp = require( 'gulp' ),
	gutil = require( 'gulp-util' ),
	jshint = require( 'gulp-jshint' ),
	Q = require( 'q' ),
	es = require( 'event-stream' ),

	bundle = require( './browserify' );

function checkFiles() {
	var deferred = Q.defer();

	gutil.log( 'JSHint\'ing files...' );

	gulp.src( [
			'./js/**/*.js',
			'!./js/lib/**/*.js',
			'!./js/templates/**/*.js'
		] )
		.pipe( jshint() )
		.pipe( jshint.reporter( 'jshint-stylish', { verbose: true } ) )
		.pipe( jshint.reporter( 'fail' ) )
		.pipe( es.wait( function ( err ) {
			if ( err ) {
				deferred.reject( err );
			} else {
				deferred.resolve();
			}
		} ) );

	return deferred.promise;
}

module.exports = function () {
	return checkFiles().then( function () {
		return bundle();
	} );
};
