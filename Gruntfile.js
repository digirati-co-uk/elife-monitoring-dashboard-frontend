module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    '\n' +
    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    // Task configuration.
    shell: {
      patternlabserve: {
        command: "php -S localhost:8001 -t public/"
      },
      patternlab: {
        command: "php core/builder.php -g"
      }
    },
    // Concatenate all JS into one file
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true,
      },
      js: {
        //put all the prerequisites in a file
        files: {
          'source/js/libs.js': [
            'source/_src/libs/jquery.min.js',
            'source/_src/libs/moment.js',
            'source/_src/libs/bootstrap.min.js',
            'source/_src/libs/pickadate/lib/picker.js',
            'source/_src/libs/pickadate/lib/picker.date.js',
            'source/_src/libs/pickadate/lib/picker.time.js',
            'source/_src/libs/underscore.js',
            'source/_src/libs/handlebars-v4.0.5.js',
            'source/_src/libs/swag.js',
            'source/_src/libs/jquery.history.js',
            'source/_src/libs/fullcalendar/fullcalendar.js',
            'source/_src/libs/jquery.qtip.custom/jquery.qtip.js',
          ],
          'source/js/app.js': [
            'source/_src/app/config.js',
            'source/_src/app/init.js',
            'source/_src/app/templates.js',
            'source/_src/app/helpers/templates-helpers.js',
            'source/_src/app/helpers/utils.js',
            'source/_src/app/services/publish.js',
            'source/_src/app/services/schedule.js',
            'source/_src/app/pages/archive.js',
            'source/_src/app/pages/current.js',
            'source/_src/app/pages/detail.js',
            'source/_src/app/pages/scheduled.js'
          ],
          'source/js/app-dev.js': [
            'source/_src/app/config-dev.js',
            'source/_src/app/init.js',
            'source/_src/app/templates.js',
            'source/_src/app/helpers/templates-helpers.js',
            'source/_src/app/helpers/utils.js',
            'source/_src/app/services/publish.js',
            'source/_src/app/services/schedule.js',
            'source/_src/app/pages/archive.js',
            'source/_src/app/pages/current.js',
            'source/_src/app/pages/detail.js',
            'source/_src/app/pages/scheduled.js'
          ],
        },
      },
      css: {
        //put all the prerequisites in a file
        files: {
          //app  js
          'source/css/libs.css': [
            'source/_src/libs/fullcalendar/fullcalendar.css',
            'source/_src/libs/jquery.qtip.custom/jquery.qtip.css',
          ],
        },
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
          "source/_src/app/templates.js": ["source/_src/handlebars/**/*.handlebars"],
        }
      }
    },


    // Watches styles and specs for changes
    watch: {
      options: {
        livereload: true,
      },
      html: {
        files: ['source/_patterns/**/*.mustache', 'source/_patterns/**/*.json', 'source/_data/*.json'],
        tasks: ['shell:patternlab'],
        options: {
          spawn: false
        }
      },
      js: {
        files: ['source/_src/**/*.js'],
        tasks: ['concat', 'shell:patternlab'],
        options: {
          spawn: false
        }
      },
      handlebars: {
        files: ['source/_src/handlebars/**/*.handlebars'],
        tasks: ['handlebars', 'concat', 'shell:patternlab'],
        options: {nospawn: false},
      },
      css: {
        files: ['source/css/scss/**/*.scss'],
        tasks: ['sass', 'shell:patternlab'],
        options: {nospawn: false},
      },
      patternlab: {
        files: ['source/js/patternlibrary.js'],
        tasks: ['shell:patternlab'],
        options: {nospawn: false},
      },
    },
  });
  [
    'grunt-shell',
    'grunt-contrib-concat',
    'grunt-contrib-watch',
    'grunt-contrib-handlebars',
    'grunt-sass',
    'grunt-scss-lint',
  ].forEach(function(task) {
    grunt.loadNpmTasks(task);
  });

  // Register the default tasks
  grunt.registerTask('serve', ['shell:patternlabserve']);
  grunt.registerTask('default', ['handlebars', 'concat', 'sass', 'shell:patternlab', 'watch']);
};
