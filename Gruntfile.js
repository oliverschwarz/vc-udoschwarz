module.exports = function(grunt)
{
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      build: {
        src: 'css/main.css',
        dest: 'css/main.css'
      },
      options: {
        sourceMap: false
      }
    },
    sass: {
      build: {
        files: {
          'css/main.css': 'src/scss/**/*.scss'
        }
      }
    },
    watch: {
      css: {
        files: ['src/scss/*.scss'],
        tasks: ['buildcss']
      }
    },
    clean: {
      dist: {
        src: ["<%= pkg.dest %>"]
      },
      options: {
        "no-write": true,
        "force": true
      }
    },
    rsync: {
      options: {
        args: ["--verbose"],
        exclude: [".git*","*.scss","node_modules", ".sass-cache", "scss", "Gruntfile.js", "package.json", "README.md", "dist", "LICENSE", "*.map"],
        recursive: true
      },
      dist: {
        options: {
          src: "./",
          dest: "<%= pkg.dest %>"
        }
      }
    }
  });
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('buildcss', ['sass', 'cssmin']);
  grunt.registerTask('deploy', ['clean', 'rsync']);
}