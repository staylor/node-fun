var gulp = require( 'gulp' );

// SCSS
gulp.task( 'scss-pipeline', require( './gulp/scss' ) );

// JS
gulp.task( 'js-pipeline', require( './gulp/js' ) );

// Hogan/Mustache templates
gulp.task( 'template-pipeline', require( './gulp/templates' ) );

gulp.task( 'default', require( './gulp/watchers' ) );