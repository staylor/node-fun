var gulp = require( 'gulp' );

// SCSS
gulp.task( 'scss-pipeline', require( './gulp/scss' ) );

// JS
gulp.task( 'js-pipeline', require( './gulp/js' ) );

// Hogan/Mustache templates
gulp.task( 'template-pipeline', require( './gulp/templates' ) );

gulp.task( 'default', function () {
	var watchers = [
		gulp.watch( [ './scss/**/*.scss' ], [ 'scss-pipeline' ] ),
		gulp.watch(
			[
				'js/**/*.js',
				'!js/gulp/**/*.js',
				'!js/templates/**/*.js'
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

} );