/*
 * grunt-new-project
 * https://github.com/stephencranedesign/grunt-new-project
 *
 * Copyright (c) 2014 "Cowboy" Stephen Crane, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Basic Blue Compass Project';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Template-specific notes to be displayed after question prompts.
exports.after = '';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({type: 'new-project'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('title', function(value, data, done) {
      // Fix new-project capitalization.
      value = value.replace(/new-project/gi, 'new-project');
      done(null, value);
    }),
    init.prompt('description', 'The best new-project plugin ever.'),
    init.prompt('version'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses', 'MIT'),
    init.prompt('author_name'),
    init.prompt('author_email'),
    init.prompt('author_url'),
    init.prompt('new-project_version')
  ], function(err, props) {
    // A few additional properties.
    props.project.json = props.name + 'new-project.json';
    props.dependencies = {project: props.project_version || '>= 1'};

    props.keywords = [];

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props, {noProcess: 'libs/**'});

    // Generate package.json file, used by npm and grunt.
    init.writePackageJSON('package.json', {
      name: 'new-project',
      version: '0.0.0-ignored',

      // TODO: pull from grunt's package.json
      node_version: '>= 0.8.0',
      devDependencies: {
        "grunt" :              "~0.4.0",
        'grunt-contrib-jshint': '~0.6.0',
        'grunt-contrib-qunit': '~0.2.0',
        'grunt-contrib-concat': '~0.3.0',
        'grunt-contrib-uglify': '~0.2.0',
        'grunt-contrib-watch': '~0.4.0',
        'grunt-contrib-clean': '~0.4.0',
        "grunt-contrib-cssmin":         "*",
        "grunt-contrib-sass":           "*",
        "grunt-cssc":                   "*",
        "grunt-htmlhint":               "*",
        "grunt-ngmin":                  "*",
        "grunt-contrib-imagemin":       "*",
        "matchdep":                     "*"
      },
    });

    // Generate new-project.json file.
    init.writePackageJSON(props.projectjson, props, function(pkg, props) {
      // The jQuery site needs the "bugs" value as a string.
      if ('bugs' in props) { pkg.bugs = props.bugs; }
      return pkg;
    });

    // All done!
    done();
  });

};
