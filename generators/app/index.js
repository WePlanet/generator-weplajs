'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the stupendous ' + chalk.red('generator-weplajs') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to enable this option?',
      default: true
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('app'),
      this.destinationPath('app')
    );
    this.fs.copy(
        this.templatePath('bin'),
        this.destinationPath('bin')
    );
    this.fs.copy(
        this.templatePath('.eslintrc'),
        this.destinationPath('.eslintrc')
    );
    this.fs.copy(
        this.templatePath('package.json'),
        this.destinationPath('package.json')
    );
    this.fs.copy(
        this.templatePath('README.md'),
        this.destinationPath('README.md')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
