var gulp = require( 'gulp' ),
	hogan = require( 'gulp-hogan' );

module.exports = function () {
	var DEST = '../static/templates';

	return gulp.src( [
		'../templates/*.mustache',
		'!../templates/layout.mustache'
	] )
		.pipe( hogan() )
		.pipe( gulp.dest( DEST ) );
};