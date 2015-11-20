var gulp = require( 'gulp' ),
	browserify = require( 'browserify' ),
	source = require( 'vinyl-source-stream' ),
	buffer = require( 'vinyl-buffer' ),
	gutil = require( 'gulp-util' ),
	uglify = require( 'gulp-uglify' ),
	rename = require( 'gulp-rename' ),
	Q = require( 'q' ),

	DEST = './build/js';

function bundle() {
	var deferreds, builds = [
		'./js/app/everywhere.js'
	];

	gutil.log( 'Browserifying files...' );

	deferreds = builds.map( function ( build ) {
		var deferred = Q.defer();

		browserify( build )
			.bundle()
			.pipe( source( build.replace( './js/app/', '' ) ) )
			.pipe( buffer() )
			.pipe( gulp.dest( DEST ) )
			.pipe( uglify() )
			.pipe( rename({ extname: '.min.js' }) )
			.pipe( gulp.dest( DEST ) )
			.on( 'end', function () {
				deferred.resolve();
			} );

		return deferred.promise;
	}, this );

	return Q.allSettled( deferreds );
}

module.exports = bundle;
