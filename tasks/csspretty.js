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

  var postcss = require('postcss');

  grunt.registerMultiTask('csspretty', 'CSS prettify your liking.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      selectors: 'sameline'
    });

    function _setOptions(node, nodeName, permitProp) {
      for (var key in options[nodeName]) {
        if (permitProp.indexOf(key) > -1 && options[nodeName][key] != null) {
          node[key] = options[nodeName][key];
        }
      }
    }

    function makePrettifier() {
      return postcss(function (css) {
        css.eachDecl(function (decl) {
          _setOptions(decl, 'decl', ['before', 'between']);

          if (decl.parent.parent.type === 'atrule' && options.atRule.indent != null) {
            decl.before = decl.before.replace(/(\r?\n)+\s*/, '$1') + 
                          options.atRule.indent + options.atRule.indent;
          }
        });
        css.eachRule(function (rule) {
          var indent = '';

          _setOptions(rule, 'rule', ['before', 'between', 'after']);

          if (rule.parent.type === 'atrule' && options.atRule.indent != null) {
            rule.before = rule.before.replace(/(\r?\n)+\s*/, '$1') + options.atRule.indent;
            rule.after = rule.after.replace(/(\r?\n)+\s*/, '$1') + options.atRule.indent;
            indent = options.atRule.indent;
          }

          if (options.selectors === 'separateline') {
            rule.selector = rule.selector.replace(/, /g, ',\n' + indent);
          } else {
            rule.selector = rule.selector.replace(/,\n(\s+)?/g, ', ');
          }
        });
        css.eachAtRule(function (atRule) {
          _setOptions(atRule, 'atRule', ['before', 'between', 'after']);
        });
      });
    }

    function csspretty(src) {
      var prettifier = makePrettifier();
      return prettifier.process(src).css.trim();
    }

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      var dest = f.dest || f;      
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      });

      src = csspretty(src);

      // Write the destination file.
      grunt.file.write(dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
