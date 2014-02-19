/*
 * grunt-csspretty
 * https://github.com/hideki-a/grunt-csspretty
 *
 * Copyright (c) 2014 Hideki Abe
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  var cssprettifier = require('css-prettifier');

  grunt.registerMultiTask('csspretty', 'CSS prettify your liking.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      selectors: 'sameline',
      map: false
    });

    function csspretty(src, srcPath, destPath) {
      var processor = cssprettifier(options);
      var result = processor.process(src, {
        map: options.map,
        from: srcPath,
        to: destPath
      });

      grunt.file.write(destPath, result.css);
      if (options.map) {
        grunt.file.write(destPath + '.map', result.map);
      }
    }

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      var sources = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      sources.forEach(function(filepath) {
        var dest = f.dest || filepath;
        var src = grunt.file.read(filepath);
        
        csspretty(src, filepath, dest);
        
        // Print a success message.
        grunt.log.writeln('File "' + dest + '" created.');
      });
    });
  });

};
