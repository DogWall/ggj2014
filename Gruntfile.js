  
module.exports = function(grunt) {
  grunt.initConfig({
    imagemin: {                          // Task
      dynamic: {                         // Another target
        options: {                       // Target options
          optimizationLevel: 6,
          progressive: true,
          interlaced: true,
          pngquant: false,
          cache: false
        },
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'img/',                   // Src matches are relative to this path
          src: ['*.{png,jpg,gif}'],      // Actual patterns to match
          dest: 'distimg/'               // Destination path prefix
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.registerTask('default', ['imagemin']);
};