/*
 * grunt-csspretty
 * https://github.com/hideki-a/grunt-csspretty
 *
 * Copyright (c) 2014 Hideki Abe
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Make expect css
    sass: {
      options: {
        // sourcemap: true,
        style: 'expanded'
      },
      dist: {
        files: {
          'test/fixtures/sass.css': 'test/fixtures/_scss/basic.scss'
        }
      }
    },

    autoprefixer: {
      options: {
        browser: [
          'last 2 version',
          'Firefox ESR',
          'ie 9',
          'ie 8'
        ],
        map: true
      },
      dist: {
        src: 'test/fixtures/sass.css',
        dest: 'test/fixtures/prefixer.css'
      }
    },

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    csspretty: {
      single: {
        options: {
          decl: {
            before: '\n',
            between: ':',
          },
          rule: {
            before: '\n\n',
            between: '',
            after: '\n',
          },
          atRule: {
            before: '\n\n',
            between: '',
            after: '\n\n',
          },
          selectors: 'separateline',
        },
        files: {
          'tmp/sass.css': 'test/fixtures/sass.css',
        },
      },
      multi: {
        options: {
          decl: {
            before: '\n    ',
          },
          rule: {
          },
          atRule: {
            indent: '    ',
          },
        },
        files: [{
          expand: true,
          cwd: 'test/fixtures',
          src: '*.css',
          dest: 'tmp/',
        }]
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'sass', 'autoprefixer', 'csspretty:single', 'nodeunit']);

  // Develop
  grunt.registerTask('dev', ['sass', 'autoprefixer', 'csspretty:single']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
