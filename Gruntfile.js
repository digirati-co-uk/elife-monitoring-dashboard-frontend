module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    // Task configuration.

    // Concatenate all JS into one file
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true,
      },
      dist: {
        //put all the prerequisites in a file
        files: {
          //app  js
          'source/js/libs.js': [
            'source/js/libs/underscore.js',
            'source/js/libs/handlebars-v4.0.5.js',
            'source/js/libs/swag.js',
          ],
          'source/js/app.js': [
            'source/js/app/**/*',
          ],
        },
      },
    },
    uglify: {
      options: {
        banner: '<%= banner %>',
      },
      init: {
        src: ['source/js/init.js'],
        dest: 'source/js/init.min.js',
      },
    },

    sass: {
      dev: {
        files: {
          'source/css/style.css': 'source/css/style.scss',
        },
        options: {
          //includePaths: ['source/css/scss/incs'],
          outputStyle: 'expanded',
          imagePath: '../images',
          sourceMap: true,
          outFile: 'source/css/',
        },
      },
    },

    handlebars: {
      compile: {
        options: {
          namespace: "eLife.templates",
          processName: function(filePath) {
            return filePath.replace(/^source\/js\/templates\//, '').replace(/\.handlebars/, '');
          }
        },
        files: {
          "source/js/app/templates.js": ["source/js/templates/*.handlebars"]
        }
      }
    },

    // Watches styles and specs for changes
    watch: {
      css: {
        files: ['source/css/scss/**/*.scss'],
        tasks: ['sass'],
        options: {nospawn: false},
      },
      js: {
        files: ['source/js/app/**/*.js'],
        tasks: ['concat'],
        options: {nospawn: false},
      },
      handlebars: {
        files: ['source/js/templates/**/*.handlebars'],
        tasks: ['handlebars', 'concat'],
        options: {nospawn: false},
      },
    },
  });
  [
    'grunt-contrib-concat',
    'grunt-contrib-uglify',
    'grunt-contrib-watch',
    'grunt-contrib-handlebars',
    'grunt-sass',
    'grunt-scss-lint',
  ].forEach(function(task) {
    grunt.loadNpmTasks(task);
  });

  // Register the default tasks
  grunt.registerTask('default', ['handlebars', 'concat', 'sass', 'watch']);
  grunt.registerTask('deploy', ['handlebars', 'concat', 'uglify', 'sass']);
};
