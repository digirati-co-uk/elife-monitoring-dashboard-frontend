module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/* <%= pkg.title || pkg.name %> - v<%= pkg.version %> */' + '\n' + '/* <%= pkg.homepage ? "" + pkg.homepage + "" : "" %> */' + '\n' + '/* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' */\n\n',
    /**
     * Shell commands
     */
    shell: {
      serve: {
        command: 'php -S localhost:8001 -t public/',
      },
      patternlab: {
        command: 'php core/builder.php -g',
      },
    },

    /**
     * Copy files
     * libs:
     * copy from assets/libs to source/libs
     */
    copy: {
      libs: {
        expand: true,
        cwd: './assets/libs/',
        src: ['**/*'],
        dest: './source/libs/',
      },
    },

    /**
     * Clean files (delete them)
     * delete from source/libs before copying new libs over
     */
    clean: {
      libs: {
        src: ['./source/libs/* '],
      },
    },

    /**
     *  Compile SASS to css
     *
     *  dashboard/static/css/style.css
     */
    sass: {
      dev: {
        files: {
          'source/css/style.css': 'assets/scss/style.scss',
        },
        options: {
          outputStyle: 'expanded',
          imagePath: '../images',
          sourceMap: true,
          outFile: 'assets/css/',
          style: 'compressed',
        },
      },
    },

    /**
     * Concatenate
     *
     * CSS
     *    libs.css  - dashboard/static/css/libs.css
     *
     */
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true,
      },
      css: {
        //put all the prerequisites in a file
        files: {
          //app  js
          'dashboard/static/css/libs.css': [
            'assets/libs/fullcalendar/dist/fullcalendar.css',
            'assets/libs/qtip2/dist/jquery.qtip.css',
            'assets/libs/pickadate/lib/themes/classic.css',
            'assets/libs/pickadate/lib/themes/classic.date.css',
            'assets/libs/pickadate/lib/themes/classic.time.css',
            'assets/libs/font-awesome/css/font-awesome.css',
          ],
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
          spawn: false,
        },
      },
      js: {
        files: ['assets/js/*.js'],
        tasks: ['shell:patternlab'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['assets/scss/**/*.scss'],
        tasks: ['sass', 'shell:patternlab'],
        options: {nospawn: false},
      },
      libs: {
        files: ['assets/libs/*'],
        tasks: ['concat:css', 'clean:libs', 'copy:libs', 'shell:patternlab'],
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
    'grunt-contrib-copy',
    'grunt-contrib-clean',
    'grunt-contrib-watch',
    'grunt-contrib-handlebars',
    'grunt-sass',
    'grunt-scss-lint',
  ].forEach(function(task) {
    grunt.loadNpmTasks(task);
  });

  // Register the default tasks
  grunt.registerTask('serve', ['shell:serve']);
  grunt.registerTask('dev', ['sass', 'concat:css', 'clean:libs', 'copy:libs', 'shell:patternlab', 'watch']);
  grunt.registerTask('default', ['sass', 'concat:css', 'clean:libs', 'copy:libs', 'shell:patternlab']);
};
