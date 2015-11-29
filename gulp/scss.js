'use strict';

var gulp = require( 'gulp' ),
	gutil = require( 'gulp-util' ),
	rename = require( 'gulp-rename' ),
	Q = require( 'Q' ),
	es = require( 'event-stream' ),

	postcss = require('gulp-postcss'),
	sass = require( 'gulp-sass' ),
	autoprefixer = require( 'autoprefixer' ),
	mqpacker = require( 'css-mqpacker' ),
	csswring = require( 'csswring' ),

	processors = [
		autoprefixer({
			browsers: [
				'Android >= 2.1',
				'Chrome >= 21',
				'Explorer >= 7',
				'Firefox >= 17',
				'Opera >= 12.1',
				'Safari >= 6.0'
			],
			cascade: false
		}),
		mqpacker
	];

module.exports = function () {
	var deferred = Q.defer(),
		DEST = './build/css';

	gutil.log( 'Compiling SCSS templates ...' );

	gulp.src( [ './scss/**/*.scss' ] )
		.pipe(
			sass({
				outputStyle: 'expanded'
			}).on( 'error', sass.logError )
		)
		.on( 'end', function () {
			gutil.log( 'Running PostCSS tasks...' );
		})
		.pipe( postcss( processors ) )
		.pipe( gulp.dest( DEST ) )
		.pipe( postcss( [ csswring ] ) )
		.pipe( rename({ extname: '.min.css' }) )
		.pipe( gulp.dest( DEST ) )
		.pipe( es.wait( function ( err ) {
			if ( err ) {
				deferred.reject( err );
			} else {
				deferred.resolve();
			}
		} ) );

	return deferred.promise;
};