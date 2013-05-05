/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    manifest: grunt.file.readJSON('src/manifest.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        undef: true,
        unused: true,
        browser: true,
        maxparams: 3,
        maxdepth: 3,
        laxcomma: true,
        asi: true,
        globals: {
            'ge':         true,
            'geByTag':    true,
            'geByClass1': true,
            'geByClass':  true,
            'setStyle':   true,
            'getStyle':   true,
            'ce':         true,
            'extend':     true,
            'Feed':       true,
            'console':    true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['src/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'mocha']
      }
    },
    mocha: {
      src: ['test/index.html'],
      options: {
        reporter: 'Dot',
        run: true
      }
    },
    crx: {
        staging: {
            src: 'src/',
            dest: "dist/staging/src/<%= pkg.name %>-<%= manifest.version %>-dev.crx",
            baseUrl: 'http://2mio.com/vkfill/',
            exclude: [ ".git", ".svn", "dev/**", "*.pem" ],
            filename: "",
            privateKey: "dist/key.pem",
            options: {
                maxBuffer: 3000 * 1024
            }
        },
        production: {
            src: 'src/',
            dest: "dist/production/src/<%= pkg.name %>-<%= manifest.version %>-dev.crx",
            baseUrl: 'http://2mio.com/vkfill/',
            exclude: [ ".git", ".svn", "dev/**", "*.pem" ],
            options: {
                maxBuffer: 3000 * 1024
            }
        }
    },
    jsdoc: {
      dist: {
        src: ['src/**/*.js'],
        options: {
          /* export JAVA_HOME=`/usr/libexec/java_home -v 1.7` */
          destination: 'docs'
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-crx');
  grunt.loadNpmTasks('grunt-jsdoc');

  // Default task.
  grunt.registerTask('test', 'mocha');
  grunt.registerTask('default', ['jshint', 'mocha', 'concat', 'uglify']);

};
