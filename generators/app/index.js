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
      type: 'input',
      name: 'name',
      message: 'Project name?',
      // Defaults to the project's folder name if the input is skipped
      default: this.appname
    }, {
      type: 'input',
      name: 'dbHost',
      message: 'Database host?',
      default: '127.0.0.1'
    }, {
      type: 'input',
      name: 'dbName',
      message: 'Database name?',
      default: this.appname
    }, {
      type: 'input',
      name: 'dbUser',
      message: 'Database user name?',
      default: 'root'
    }, {
      type: 'input',
      name: 'dbPass',
      message: 'Database password?',
      default: 'toor'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
        this.templatePath('app'),
        this.destinationPath('app'), {
          name: this.props.name,
          dbName: this.props.dbName,
          dbUser: this.props.dbUser,
          dbPass: this.props.dbPass,
          dbHost: this.props.dbHost
        });

    this.fs.copy(
        this.templatePath('bin'),
        this.destinationPath('bin'));

    this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'), {
          name: this.props.name
        });

    this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'), {
          name: this.props.name
        });
  },

  install: function () {
    this.npmInstall();
  }
});
