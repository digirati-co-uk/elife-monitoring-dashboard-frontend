module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    '\n' +
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
          'source/js/head.js': [
            'source/_src/libs/head/html5shiv.min.js',
            'source/_src/libs/head/respond.min.js',
          ],
          'source/js/libs.js': [
            'source/_src/libs/jquery.min.js',
            'source/_src/libs/moment.min.js',
            'source/_src/libs/moment-en-gb.js',
            'source/_src/libs/bootstrap.min.js',
            'source/_src/libs/bootstrap-datetimepicker.min.js',
            'source/_src/libs/pickadate/lib/picker.js',
            'source/_src/libs/pickadate/lib/picker.date.js',
            'source/_src/libs/pickadate/lib/picker.time.js',
            'source/_src/libs/underscore.js',
            'source/_src/libs/handlebars-v4.0.5.js',
            'source/_src/libs/swag.js',
            'source/_src/libs/jquery.history.js',
          ],
          'source/js/app.js': [
            'source/_src/app/templates.js',
            'source/_src/app/templates-helpers.js',
            'source/_src/app/datepicker.js',
            'source/_src/app/dropdown.js',
            'source/_src/app/config.js',
            'source/_src/app/init.js',
            'source/_src/app/utils.js',
            'source/_src/app/publish.js',
            'source/_src/app/schedule.js',
            'source/_src/app/current.js',
            'source/_src/app/detail.js',
            'source/_src/app/archive.js',
          ],
          'source/js/app-dev.js': [
            'source/_src/app/templates.js',
            'source/_src/app/templates-helpers.js',
            'source/_src/app/datepicker.js',
            'source/_src/app/dropdown.js',
            'source/_src/app/config-dev.js',
            'source/_src/app/init.js',
            'source/_src/app/utils.js',
            'source/_src/app/publish.js',
            'source/_src/app/schedule.js',
            'source/_src/app/current.js',
            'source/_src/app/detail.js',
            'source/_src/app/archive.js',
          ],
        },
      },
    },
    uglify: {
      options: {
        banner: '<%= banner %>',
      },
      libs: {
        src: ['source/js/libs.js'],
        dest: 'source/js/libs.js',
      },
      app: {
        src: ['source/js/app.js'],
        dest: 'source/js/app.js',
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
            return filePath.replace(/^source\/_src\/handlebars\//, '').replace(/\.handlebars/, '');
          }
        },
        files: {
          "source/_src/app/templates.js": ["source/_src/handlebars/**/*.handlebars"]
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
        files: ['source/_src/**/*.js'],
        tasks: ['concat'],
        options: {nospawn: false},
      },
      handlebars: {
        files: ['source/_src/handlebars/**/*.handlebars'],
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
