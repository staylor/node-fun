module.exports = function(grunt) {

	require('matchdep').filterDev(['grunt-*']).forEach( grunt.loadNpmTasks );

	grunt.initConfig({
		clean: {
			all: ['static/**/*.js']
		},
		hogan: {
			HoganTemplates: {
				src: './templates/*.mustache',
				dest: './static/templates.js',
				options: {
					binderName: 'revealing'
				}
			}
		},
		jshint: {
			files: [
				'Gruntfile.js',
				'main.js',
				'js/**/*.js'
			],
			options: {
				globals: {
					jQuery: true
				}
			}
		},
		browserify: {
			main: {
				files : {
					'static/build.js' : ['./js/main.js']
				}
			}
		},
		uglify: {
			main: {
				expand: true,
				cwd: 'static',
				ext: '.min.js',
				src: ['**/*.js'],
				dest: 'static'
			}
		},
		watch: {
			templates: {
				files: ['<%= hogan.HoganTemplates.src %>'],
				tasks: ['hogan', 'browserify', 'uglify']
			},
			all: {
				files: ['<%= jshint.files %>'],
				tasks: ['clean', 'jshint', 'hogan', 'browserify', 'uglify']
			}
		}
	});

	grunt.registerTask('default', ['watch']);
};