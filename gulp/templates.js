'use strict';

var gulp = require( 'gulp' ),
	gutil = require( 'gulp-util' ),
	hogan = require( 'gulp-hogan-compile' ),
	Q = require( 'q' ),
	es = require( 'event-stream' ),
	bundle = require( './browserify' ),
	DEST = './js/templates';

function compileTemplates() {
	var deferred = Q.defer();

	gutil.log( 'Compiling templates with Hogan...' );

	gulp.src( [
		'./templates/show.mustache'
	] )
		.pipe( hogan( 'compiled.js', {
			wrapper: 'commonjs',
			hoganModule: 'hogan.js'
		} ) )
		.pipe( gulp.dest( DEST ) )
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
	return compileTemplates().then( bundle );
};