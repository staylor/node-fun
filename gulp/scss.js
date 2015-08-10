var gulp = require( 'gulp' ),
	rename = require( 'gulp-rename' ),

	postcss = require('gulp-postcss'),
	sass = require( 'gulp-sass' ),
	autoprefixer = require( 'autoprefixer' ),
	mqpacker = require( 'css-mqpacker' ),
	csswring = require( 'csswring' ),

	processors = [
		autoprefixer({
			browsers: [
				'Android >= 2.1',
				'Chrome >= 21',
				'Explorer >= 7',
				'Firefox >= 17',
				'Opera >= 12.1',
				'Safari >= 6.0'
			],
			cascade: false
		}),
		mqpacker,
		csswring
	];

module.exports = function () {
	var DEST = '../static/css';

	return gulp.src( [ '../scss/**/*.scss' ] )
		.pipe(
			sass({
				outputStyle: 'expanded'
			}).on( 'error', sass.logError )
		)
		.pipe( gulp.dest( DEST ) )
		.pipe( postcss( processors ) )
		.pipe( rename({ extname: '.min.css' }) )
		.pipe( gulp.dest( DEST ) );
};