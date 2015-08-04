/**
 *
 * I2B Frontend WorkFlow
 * Adaptado para Proyectos I2B.cl
 *
 * repo: https://github.com/I2BTech/i2b-frontend-workflow
 *
*/
module.exports = function(grunt) {
  
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {
    sprite: 'grunt-spritesmith'
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    bowercopy: {
      libs: {
        options: {
          destPrefix: "src/js/libs"
        },
        files: {
          "jquery.js": "jquery/dist/jquery.min.js",
          "modernizr.js": "modernizr/modernizr.js",
          "detectizr.js": "detectizr/dist/detectizr.js"
        },
      },
      folders: {
        options: {
          destPrefix: "dist/assets/css/pie"
        },
        files: {
          "PIE.js": "css3pie/PIE.js",
          "PIE.htc": "css3pie/PIE.htc",
          "PIE.php": "css3pie/PIE.php"
        }
      },
      css: {
        options: {
          destPrefix: "src/scss/inc"
        },
        files: {
          "normalize.scss": "normalize.css/normalize.css"
        }
      },
      ie: {
        options: {
          destPrefix: "dist/assets/js/libs"
        },
        files: {
          "ie.min.js": "lt-ie-9/lt-ie-9.min.js"
        }
      }
    },
    concat: {
      basic_and_extras: {
        files: {
          "dist/assets/js/libs/modernizr-detectizr.js": ["dist/assets/js/libs/modernizr.js","dist/assets/js/libs/detectizr.js"]
        },
      },
    },
    uglify: {
      options: {
        mangle: true,
        preserveComments: 'some'
      },
      libs: {
        files: [{
          expand: true,
          cwd: "src/js",
          src: "**/*.js",
          dest: "dist/assets/js"
        }]
      }
    },
    jshint: {
      files: ["src/js/functions.js"],
      options: {
        jshintrc: ".jshintrc"
      }
    },
    htmlhint: {
      options: {
        htmlhintrc: '.htmlhintrc'
      },
      html: {
        src: ['dist/**/*.html']
      }
    },
    imagemin: {
      dynamic: {
        files: [{
            expand: true,
            cwd: "src/images/",
            src: ["*.{png,jpg,gif,svg}"],
            dest: "dist/assets/images/"
        }]
      }
    },
    sprite:{
      all: {
        src: "src/images/sprites/*.png",
        dest: "src/images/sprites.png",
        destCss: "src/scss/inc/sprites.scss",
        algorithm: "binary-tree",
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
          style: "compact"
        },
        files: [{
          expand: true,
          cwd: "src/scss",
          src: [ "*.scss" ],
          dest: "dist/assets/css",
          ext: ".css"
        }]
      }
    },
    autoprefixer: {
      options: {
        browsers: ["last 3 versions", "ie 8", "ie 9"],
        cascade: false
      },
      target: {
        src: "dist/assets/css/*.css"
      },
    },
    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: ["src/js/*.js"],
        tasks: ["newer:uglify"]
      },
      jade: {
        files: "src/jade/*.jade",
        tasks: ["newer:jade","newer:htmlhint"]
      },
      css: {
        files: ["src/scss/*.scss"],
        tasks: ["newer:sass","newer:autoprefixer"]
      },
      sprites: {
        files: ["src/images/sprites/*.*"],
        tasks: ["sprite"]
      },
      another: {
        files: ["src/images/*.*"],
        tasks: ["newer:imagemin"]
      }
    }
  });
  grunt.registerTask("init", ["bowercopy","concat"]);
  grunt.registerTask("default", ["newer:uglify","sprite","newer:jade","newer:imagemin","newer:sass","watch"]);
  grunt.registerTask("testjs", ["jshint"]);
  grunt.registerTask("testhtml", ["htmlhint"]);
};