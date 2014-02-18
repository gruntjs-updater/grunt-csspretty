# grunt-csspretty [![Build Status](https://secure.travis-ci.org/hideki-a/grunt-csspretty.png?branch=master)](http://travis-ci.org/hideki-a/grunt-csspretty)

> CSS prettifier in your style.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-csspretty --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-csspretty');
```

## The "csspretty" task

_Run this task with the `grunt csspretty` command.

### Options

`''` meaning no spaces, no new-line. Please do not describe an option not to change a format. 

#### decl.before

Type: `String`    
Default: `none`

Strings before property name.

#### decl.between

Type: `String`    
Default: `none`

Strings between property name and value.

#### rule.before

Type: `String`    
Default: `none`

Strings before selector.

#### rule.between

Type: `String`    
Default: `none`

Strings between selector and `{`.

#### rule.after

Type: `String`    
Default: `none`

Strings before `}`.
	
#### atRule.before

Type: `String`    
Default: `none`

Strings before @rule's `@`.

#### atRule.between

Type: `String`    
Default: `none`

Strings between @rule name and `{`.

#### atRule.after

Type: `String`    
Default: `none`

Strings before @rule's `}`.
	
#### atRule.indent

Type: `String`    
Default: `none`

Indent strings in @rule section. This option is not exist [postcss](https://github.com/ai/postcss) property.

#### selectors

Type: `String`    
Default: `sameline`

The method of enumerating two or more selectors is specified.

`sameline` is

    p, ul {
        margin-bottom: 1em;
    }

`separateline` is

    p,
    ul {
        margin-bottom: 1em;
    }

## Examples

### Example config

    grunt.initConfig({
      csspretty: {
        dist: {
          options: {
            decl: {
              before: '\n',
              between: ':',
            },
            rule: {
              before: '\n\n',
              between: '',
              after: '\n',
            },
            atRule: {
              before: '\n\n',
              between: '',
              after: '\n\n',
            },
            selectors: 'separateline',
          },
          src: 'htdocs/common/css/sass.css',
        }
      }
    });

    grunt.loadNpmTasks('grunt-csspretty');

## Release History

- 2014.02.18 v0.2.0 Separeted processor creation logic([css-prettifier](https://github.com/hideki-a/css-prettifier)).
- 2014.02.17 v0.1.1 Correction dependences.
- 2014.02.17 v0.1.0 Initial release.


