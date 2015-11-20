var gulp = require( 'gulp' );

module.exports = function () {
	var watchers = [
		gulp.watch(
			[
				'./scss/**/*.scss'
			],
			[ 'scss-pipeline' ]
		),
		gulp.watch(
			[
				'./js/**/*.js'
			],
			[ 'js-pipeline' ]
		),
		gulp.watch(
			[
				'templates/*.mustache',
				'!templates/layout.mustache'
			],
			[ 'template-pipeline' ]
		)
	];

	watchers.forEach( function ( watcher ) {
		watcher.on( 'change', function ( event ) {
			console.log( 'File ' + event.path + ' was ' + event.type + ', running tasks...' );
		});
	} );
};