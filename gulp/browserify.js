'use strict';

var gulp = require( 'gulp' ),
	browserify = require( 'browserify' ),
	source = require( 'vinyl-source-stream' ),
	buffer = require( 'vinyl-buffer' ),
	gutil = require( 'gulp-util' ),
	uglify = require( 'gulp-uglify' ),
	rename = require( 'gulp-rename' ),
	Q = require( 'q' ),
	es = require( 'event-stream' ),

	builds = [
		'./js/app/cities.js',
		'./js/app/everywhere.js',
		'./js/app/location.js'
	],
	DEST = './build/js';

function bundle( build ) {
	var deferred = Q.defer(),
		base = build.replace( './js/app/', '' );

	browserify( build )
		.bundle()
		.pipe( source( base ) )
		.pipe( buffer() )
		.pipe( gulp.dest( DEST ) )
		.pipe( uglify() )
		.pipe( rename({ extname: '.min.js' }) )
		.pipe( gulp.dest( DEST ) )
		.pipe( es.wait( function ( err ) {
			if ( err ) {
				deferred.reject( err );
			} else {
				gutil.log( 'Bundled:', base );
				deferred.resolve();
			}
		} ) );

	return deferred.promise;
}

module.exports = function () {
	var promises = [];
	builds.forEach( function ( build ) {
		promises.push( bundle( build ) );
	} );

	return Q.allSettled( promises );
};
