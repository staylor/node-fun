module.exports = function(grunt) {

	var autoprefixer = require('autoprefixer-core');

	require('matchdep').filterDev(['grunt-*']).forEach( grunt.loadNpmTasks );

	grunt.initConfig({
		postcss: {
			options: {
				processors: [
					autoprefixer({
						browsers: ['Android >= 2.1', 'Chrome >= 21', 'Explorer >= 7', 'Firefox >= 17', 'Opera >= 12.1', 'Safari >= 6.0'],
						cascade: false
					})
				]
			},
			all: {
				expand: true,
				cwd: 'static/css',
				dest: 'static/css',
				src: ['**/*.css']
			}
		},

		sass: {
			all: {
				expand: true,
				cwd: 'scss',
				dest: 'static/css',
				ext: '.css',
				src: ['**/*.scss'],
				options: {
					outputStyle: 'expanded'
				}
			}
		},

		cssmin: {
			static: {
				expand: true,
				cwd: 'static/css',
				dest: 'static/css',
				ext: '.min.css',
				src: ['**/*.css']
			}
		},

		hogan: {
			HoganTemplates: {
				expand: true,
				cwd: 'templates',
				src: ['*.mustache', '!layout.mustache'],
				dest: 'static/templates/compiled.js',
				options: {
					binderName: 'revealing'
				}
			}
		},

		jshint: {
			files: [
				'Gruntfile.js',
				'js/**/*.js',
				'!js/lib/**/*.js'
			],
			options: {
				globals: {}
			}
		},

		browserify: {
			main: {
				files : {
					'static/js/build.js' : ['js/main.js']
				}
			}
		},

		uglify: {
			js: {
				expand: true,
				cwd: 'static/js',
				dest: 'static/js',
				ext: '.min.js',
				src: ['**/*.js']
			},
			
			lib: {
				expand: true,
				cwd: 'js/lib',
				dest: 'static/lib',
				ext: '.min.js',
				extDot: 'last',
				src: ['**/*.js']
			},

			templates: {
				expand: true,
				cwd: 'static/templates',
				dest: 'static/templates',
				ext: '.min.js',
				src: ['**/*.js']
			}
		},

		clean: {
			js: ['static/js/**/*.js'],
			lib: ['static/lib/**/*.js'],
			css: ['static/css/**/*.css'],
			templates: ['static/templates/**/*.js']
		},

		watch: {
			config: {
				files: 'Gruntfile.js'
			},

			templates: {
				files: ['<%= hogan.HoganTemplates.src %>'],
				tasks: ['clean:templates', 'hogan', 'uglify:templates']
			},

			js: {
				files: ['<%= jshint.files %>', '!Gruntfile.js'],
				tasks: ['clean:js', 'jshint', 'browserify', 'uglify:js']
			},

			lib: {
				files: ['js/lib/**/*.js'],
				tasks: ['clean:lib', 'uglify:lib']
			},

			scss: {
				files: ['scss/**/*.scss'],
				tasks: ['clean:css', 'sass', 'postcss', 'cssmin']
			}
		}
	});

	grunt.registerTask('default', ['watch']);
};