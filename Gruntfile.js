module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/* <%= pkg.title || pkg.name %> - v<%= pkg.version %> */' +
    '\n' +
    '/* <%= pkg.homepage ? "" + pkg.homepage + "" : "" %> */' +
    '\n' +
    '/* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;'  + ' */\n\n',

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
            'source/_libs/jquery.min.js',
            'source/_libs/moment.js',
            'source/_libs/bootstrap.min.js',
            'source/_libs/pickadate/lib/picker.js',
            'source/_libs/pickadate/lib/picker.date.js',
            'source/_libs/pickadate/lib/picker.time.js',
            'source/_libs/underscore.js',
            'source/_libs/handlebars-v4.0.5.js',
            'source/_libs/swag.js',
            'source/_libs/jquery.history.js',
            'source/_libs/fullcalendar/fullcalendar.js',
            'source/_libs/jquery.qtip.custom/jquery.qtip.js',
          ],
          'source/js/app.js': [
            'source/_app/config.js',
            'source/_app/init.js',
            'source/_app/templates.js',
            'source/_app/helpers/templates-helpers.js',
            'source/_app/helpers/utils.js',
            'source/_app/services/publish.js',
            'source/_app/services/schedule.js',
            'source/_app/pages/archive.js',
            'source/_app/pages/current.js',
            'source/_app/pages/detail.js',
            'source/_app/pages/scheduled.js',
          ],
          'source/js/app-dev.js': [
            'source/_app/config-dev.js',
            'source/_app/init.js',
            'source/_app/templates.js',
            'source/_app/helpers/templates-helpers.js',
            'source/_app/helpers/utils.js',
            'source/_app/services/publish.js',
            'source/_app/services/schedule.js',
            'source/_app/pages/archive.js',
            'source/_app/pages/current.js',
            'source/_app/pages/detail.js',
            'source/_app/pages/scheduled.js',
          ],
        },
      },
      css: {
        //put all the prerequisites in a file
        files: {
          //app  js
          'source/css/libs.css': [
            'source/_libs/fullcalendar/fullcalendar.css',
            'source/_libs/jquery.qtip.custom/jquery.qtip.css',
            'source/_libs/pickadate/lib/themes/classic.css',
            'source/_libs/pickadate/lib/themes/classic.date.css',
            'source/_libs/pickadate/lib/themes/classic.time.css',
            'source/_libs/fontawesome/font-awesome.css',
          ],
        },
      },
    },

    sass: {
      dev: {
        files: {
          'source/css/style.css': 'source/scss/style.scss',
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
            return filePath.replace(/^source\/_app\/handlebars\//, '').replace(/\.handlebars/, '');
          }
        },
        files: {
          "source/_app/templates.js": ["source/_app/handlebars/**/*.handlebars"],
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
        files: ['source/_app/**/*.js'],
        tasks: ['concat', 'shell:patternlab'],
        options: {
          spawn: false
        }
      },
      handlebars: {
        files: ['source/_app/handlebars/**/*.handlebars'],
        files: ['source/_app/handlebars/**/*.handlebars'],
        tasks: ['handlebars', 'concat', 'shell:patternlab'],
        options: {nospawn: false},
      },
      css: {
        files: ['source/scss/**/*.scss'],
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
