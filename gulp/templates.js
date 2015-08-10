var gulp = require( 'gulp' ),
	rename = require( 'gulp-rename' ),
	uglify = require( 'gulp-uglify' ),
	hogan = require( 'gulp-hogan-compile' );

module.exports = function () {
	var DEST = './js/templates';

	return gulp.src( [
		'./templates/*.mustache',
		'!./templates/layout.mustache'
	] )
		.pipe( hogan( 'compiled.js', {
			wrapper: 'commonjs',
			hoganModule: 'hogan.js'
		} ) )
		.pipe( gulp.dest( DEST ) );
};