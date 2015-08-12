var gulp = require( 'gulp' ),
	gutil = require( 'gulp-util' ),
	hogan = require( 'gulp-hogan-compile' );

module.exports = function () {
	var DEST = './js/templates';

	gutil.log( 'Compiling templates with Hogan...' );

	return gulp.src( [
		'./templates/*.mustache',
		'!./templates/layout.mustache'
	] )
		.pipe( hogan( 'compiled.js', {
			wrapper: 'commonjs',
			hoganModule: 'hogan.js'
		} ) )
		.pipe( gulp.dest( DEST ) )
		.on( 'end', function () {
			gutil.log( 'Saved to /js/templates/compiled.js' );
		});
};