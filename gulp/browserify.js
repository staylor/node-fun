var gulp = require( 'gulp' ),
	watchify = require( 'watchify' ),
	browserify = require( 'browserify' ),
	source = require( 'vinyl-source-stream' ),
	buffer = require( 'vinyl-buffer' ),
	gutil = require( 'gulp-util' ),
	assign = require( 'lodash.assign' ),
	uglify = require( 'gulp-uglify' ),
	rename = require( 'gulp-rename' ),
	opts,
	b;

opts = assign( {}, watchify.args, {
	entries: [ './js/main.js' ]
} );

gutil.log( 'Starting watchify...' );
b = watchify( browserify( opts ) );

b.on( 'update', bundle );
b.on( 'log', gutil.log );
b.on( 'error', gutil.log.bind( gutil, 'Browserify Error' ) );

function bundle() {
	var DEST = './build/js';

	gutil.log( 'Browserifying files...' );

	return b.bundle()
		.pipe( source( 'compiled.js' ) )
		.on( 'end', function () {
			gutil.log( 'Saved to ./build/js' );
			gutil.log( 'Uglifying files...' );
		})
		.pipe( buffer() )
		.pipe( gulp.dest( DEST ) )
//		.pipe( buffer() )
//		.pipe( uglify() )
//		.on( 'end', function () {
//			gutil.log( 'Saving minified files to ./build/js' );
//		})
		.pipe( rename({ extname: '.min.js' }) )
		.pipe( gulp.dest( DEST ) )
		.on( 'end', function () {
			gutil.log( 'DONE.' );
		});
}

module.exports = bundle;