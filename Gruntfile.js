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
      css: {
        //put all the prerequisites in a file
        files: {
          //app  js
          'source/css/libs.css': [
            'assets/libs/fullcalendar/fullcalendar.css',
            'assets/libs/jquery.qtip.custom/jquery.qtip.css',
            'assets/libs/pickadate/lib/themes/classic.css',
            'assets/libs/pickadate/lib/themes/classic.date.css',
            'assets/libs/pickadate/lib/themes/classic.time.css',
            'assets/libs/fontawesome/css/font-awesome.css',
          ],
        },
      },
    },

    sass: {
      dev: {
        files: {
          'source/css/style.css': 'assets/scss/style.scss',
        },
        options: {
          //includePaths: ['assets/css/scss/incs'],
          outputStyle: 'expanded',
          imagePath: '../images',
          sourceMap: true,
          outFile: 'assets/css/',
        },
      },
    },

    // Watches styles and specs for changes
    watch: {
      options: {
        livereload: false,
      },
      html: {
        files: ['assets/_patterns/**/*.mustache', 'assets/_patterns/**/*.json', 'assets/_data/*.json'],
        tasks: ['shell:patternlab'],
        options: {
          spawn: false
        }
      },
      js: {
        files: ['assets/js/*.js'],
        tasks: ['shell:patternlab'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['assets/scss/**/*.scss'],
        tasks: ['sass', 'shell:patternlab'],
        options: {nospawn: false},
      },
      patternlab: {
        files: ['assets/js/patternlibrary.js'],
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
  grunt.registerTask('default', ['concat', 'sass', 'shell:patternlab', 'watch']);
};
