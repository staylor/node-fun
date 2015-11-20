var gulp = require( 'gulp' ),
	gutil = require( 'gulp-util' ),
	hogan = require( 'gulp-hogan-compile' ),
	Q = require( 'q' ),
	bundle = require( './browserify' ),
	DEST = './js/templates';

function compileTemplates() {
	var deferred = Q.defer();

	gutil.log( 'Compiling templates with Hogan...' );

	gulp.src( [
		'./templates/*.mustache',
		'!./templates/layout.mustache'
	] )
		.pipe( hogan( 'compiled.js', {
			wrapper: 'commonjs',
			hoganModule: 'hogan.js'
		} ) )
		.pipe(
			gulp.dest( DEST )
				.on( 'end', function () {
					console.log( 'resolving' );
					deferred.resolve();
				} )
		);

	return deferred.promise;
}

module.exports = function () {
	return compileTemplates().then( bundle );
};