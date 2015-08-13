var nodemon = require( 'gulp-nodemon' );

module.exports = function () {
	nodemon({
		script: 'server.js',
		ignore: ['./(js|scss|templates)/**/*', './build/**/*', '!./build/**/*.min.*']
	});
};