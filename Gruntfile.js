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
            '_src/libs/fullcalendar/fullcalendar.css',
            '_src/libs/jquery.qtip.custom/jquery.qtip.css',
            '_src/libs/pickadate/lib/themes/classic.css',
            '_src/libs/pickadate/lib/themes/classic.date.css',
            '_src/libs/pickadate/lib/themes/classic.time.css',
            '_src/libs/fontawesome/css/font-awesome.css',
          ],
        },
      },
    },

    sass: {
      dev: {
        files: {
          'source/css/style.css': '_src/scss/style.scss',
        },
        options: {
          //includePaths: ['_src/css/scss/incs'],
          outputStyle: 'expanded',
          imagePath: '../images',
          sourceMap: true,
          outFile: '_src/css/',
        },
      },
    },

    // Watches styles and specs for changes
    watch: {
      options: {
        livereload: false,
      },
      html: {
        files: ['_src/_patterns/**/*.mustache', '_src/_patterns/**/*.json', '_src/_data/*.json'],
        tasks: ['shell:patternlab'],
        options: {
          spawn: false
        }
      },
      js: {
        files: ['_src/js/*.js'],
        tasks: ['shell:patternlab'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['_src/scss/**/*.scss'],
        tasks: ['sass', 'shell:patternlab'],
        options: {nospawn: false},
      },
      patternlab: {
        files: ['_src/js/patternlibrary.js'],
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
