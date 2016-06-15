(function() {

  'use strict';

  module.exports = function(grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      sass: {
        dist: {
          files: {
            'src/css/styles.css' : 'src/scss/styles.scss'
          }
        }
      },

      watch: {
        html: {
          files: ['<%= htmlhint.build.src %>'],
          tasks: ['htmlhint']
        },
        js: {
          files: ['<%= jshint.files %>'],
          tasks: ['jshint']
        },
        css: {
          files: '**/*.scss',
          tasks: ['sass'],
          options: {
            sourcemap: 'none'
          }
        }
      },

      jshint: {
        files: ['Gruntfile.js', 'src/**/*.js']
      },

      htmlhint: {
        build: {
          options: {
            'tag-pair': true,
            'tagname-lowercase': true,
            'attr-lowercase': true,
            'attr-value-double-quotes': true,
            'doctype-first': true,
            'spec-char-escape': true,
            'id-unique': true,
            'head-script-disabled': true,
            'style-disabled': true
          },
          src: ['src/*.html']
        }
      }
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.registerTask('default', []);
  };

}());