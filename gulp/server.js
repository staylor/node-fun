var nodemon = require( 'gulp-nodemon' );

module.exports = function () {
	nodemon({
		script: 'server.js',
		ignore: [
			'./js/**/*.js',
			'./build/**/*.js',
			'./gulp/**/*.js',
			'!./js/app/**/*.js'
		]
	});
};