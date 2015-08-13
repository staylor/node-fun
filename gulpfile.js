var gulp = require( 'gulp' ),
	watchers = require( './gulp/watchers' ),
	server = require( './gulp/server' );

// SCSS
gulp.task( 'scss-pipeline', require( './gulp/scss' ) );

// JS
gulp.task( 'js-pipeline', require( './gulp/js' ) );

// Hogan/Mustache templates
gulp.task( 'template-pipeline', require( './gulp/templates' ) );

gulp.task( 'default', function () {
	watchers();
	server();
} );