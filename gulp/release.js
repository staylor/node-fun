var gulp = require( 'gulp' ),
	bump = require( 'gulp-bump' ),
	changelog = require( 'gulp-conventional-changelog' ),
	Q = require( 'q' ),
	es = require( 'event-stream' );

function generateChangelog() {
	var deferred = Q.defer();

	gulp.src( './CHANGELOG.md', {
		buffer: false
	} )
		.pipe( changelog({
			preset: 'angular'
		}) )
		.pipe( gulp.dest( './' ) )
		.pipe( es.wait( function ( err ) {
			if ( err ) {
				deferred.reject( err );
			} else {
				deferred.resolve();
			}
		} ) );

	return deferred.promise;
}

function bumpVersion() {
	var deferred = Q.defer();

	gulp.src( './package.json' )
		.pipe( bump({ type: 'patch' }) )
		.pipe( gulp.dest( './' ) )
		.pipe( es.wait( function ( err ) {
			if ( err ) {
				deferred.reject( err );
			} else {
				deferred.resolve();
			}
		} ) );

	return deferred.promise;
}

function releaseTag() {
	return generateChangelog()
		.then( bumpVersion );
}

module.exports = releaseTag;