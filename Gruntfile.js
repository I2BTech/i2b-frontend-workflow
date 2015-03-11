/**
 *
 * I2B Frontend WorkFlow
 * Adaptado para Proyectos I2B.cl
 *
 * repo: https://github.com/I2BTech/i2b-frontend-workflow#i2b-frontend-workflow
 *
*/
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bowercopy: {
      libs: {
        options: {
          destPrefix: 'src/js/libs'
        },
        files: {
          'jquery.js': 'jquery/dist/jquery.min.js',
          'html5shiv.js': 'html5shiv/dist/html5shiv.js',
          'modernizr.js': 'modernizr/modernizr.js',
          'detectizr.js': 'detectizr/dist/detectizr.js',
          'selectivizr.js': 'selectivizr/selectivizr.js',
          'respond.js': 'respond/dest/respond.min.js',
        },
      },
      folders: {
        options: {
          destPrefix: 'dist/assets/css/pie'
        },
        files: {
          'PIE.js': 'css3pie/PIE.js',
          'PIE.htc': 'css3pie/PIE.htc',
          'PIE.php': 'css3pie/PIE.php'
        }
      },
      css: {
        options: {
          destPrefix: 'src/scss/inc'
        },
        files: {
          'yui3-cssreset.scss': 'yui3/build/cssreset/cssreset-min.css'
        }
      }
    },
    concat: {
      basic_and_extras: {
        files: {
          'dist/assets/js/libs/modernizr-detectizr.js': ['dist/assets/js/libs/modernizr.js','dist/assets/js/libs/detectizr.js']
        },
      },
    },
    uglify: {
      options: {
        mangle: true
      },
      libs: {
        files: [{
          expand: true,
          cwd: 'src/js',
          src: '**/*.js',
          dest: 'dist/assets/js'
        }]
      }
    },
    jshint: {
      files: ["src/js/functions.js"],
      options: {
        jshintrc: ".jshintrc"
      }
    },
    imagemin: {
      dynamic: {
        files: [{
            expand: true,
            cwd: 'src/images/',
            src: ['*.{png,jpg,gif,svg}'],
            dest: 'dist/assets/images/'
        }]
      }
    },
    sprite:{
      all: {
        src: 'src/images/sprites/*.png',
        dest: 'dist/assets/images/sprites.png',
        destCss: 'src/scss/inc/sprites.scss',
        algorithm: 'binary-tree',
        padding: 2
      }
    },
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [{
          cwd: "src/jade",
          src: "*.jade",
          dest: "dist",
          expand: true,
          ext: ".html"
        }]
      }
    },
    sass: {
      build: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: 'src/scss',
          src: [ '*.scss' ],
          dest: 'dist/assets/css',
          ext: '.css'
        }]
      }
    },
    'ftp-deploy': {
      build: {
        auth: {
          host: 'hostname/IP',
          port: 21,
          authKey: 'key'
        },
        dest: '/html/<%= pkg.directory %>/', 
        src: 'dist/',
        exclusions: [
        '**/.*',
        '**/Thumbs.db'
        ]
      }
    },
    compress: {
      main: {
        options: {
          archive: 'backup/<%= pkg.name %>_<%= grunt.template.today("yyyymmdd-HHMMss") %>.zip'
        },
        expand: true,
        //cwd: 'src/',
        src: [
          'src/**/*.*',
          'dist/**/*.*',
          '**.*',
          '!*.md',
          '!node_modules/**.*',
          '!bower_components/**.*',
          '!.sass-cache'
        ],
        dest: '<%= pkg.name %>_<%= grunt.template.today("yyyymmdd-HHMMss") %>/'
      }
    },
    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: ['src/js/*.js'],
        tasks: ['newer:uglify'],
        options: {
            spawn: false
        }
      },
      jade: {
        files: 'src/jade/*.jade',
        tasks: ['newer:jade']
      },
      css: {
        files: ['src/scss/*.scss'],
        tasks: ['newer:sass'],
        options: {
          spawn: false
        }
      },
      sprites: {
        files: ['src/images/sprites/*.*'],
        tasks: ['sprite']
      },
      another: {
        files: ['src/images/*.*'],
        tasks: ['newer:imagemin'],
        options: {
          spawn: false
        }
      }
    }
  });
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks('grunt-bowercopy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-compile-handlebars');
  grunt.loadNpmTasks('grunt-contrib-compress');

  grunt.registerTask('default', ['bowercopy','concat','newer:uglify','sprite','newer:jade','newer:imagemin','newer:sass','watch']);
  grunt.registerTask("testjs", ["jshint"]);
  grunt.registerTask("backup", ["compress"]);
};