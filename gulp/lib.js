var gulp = require( 'gulp' ),
	rename = require( 'gulp-rename' ),
	uglify = require( 'gulp-uglify' );

module.exports = function () {
	var DEST = '../static/lib';

	return gulp.src( [ '../js/lib/**/*.js' ] )
		.pipe( uglify() )
		.pipe( rename( { extname: '.min.js' } ) )
		.pipe( gulp.dest( DEST ) );
};
