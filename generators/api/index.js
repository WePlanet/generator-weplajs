'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var util = require('../util');

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Make ' + chalk.red('your first api ')
    ));

    var prompts = [{
      type: 'input',
      name: 'resourceName',
      message: 'What is a resource name of new REST Api?',
      default: 'resource'
    }, {
      type: 'input',
      name: 'version',
      message: 'What is api version of it?',
      default: 'v1'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    var v = this.props.version;
    var r = this.props.resourceName;
    var R = this.props.resourceName.capitalize();

    this.fs.copyTpl(
        this.templatePath('api/index.js'),
        this.destinationPath('app/api/' + v + '/' + r + '/index.js'), {
          resource: r
        });

    this.fs.copyTpl(
        this.templatePath('api/resource.ctrl.js'),
        this.destinationPath('app/api/' + v + '/' + r + '/' + r + '.ctrl.js'), {
          resource: r,
          Resource: R
        });

    this.fs.copyTpl(
        this.templatePath('api/resource.spec.js'),
        this.destinationPath('app/api/' + v + '/' + r + '/' + r + '.spec.js'), {
          resource: r,
          Resource: R
        });

    this.fs.copyTpl(
        this.templatePath('model.js'),
        this.destinationPath('app/models/' + R + '.js'), {
          resource: r,
          Resource: R
        });

    this.fs.copyTpl(
        this.templatePath('lib.js'),
        this.destinationPath('app/lib/' + R + '.js'), {
          resource: r,
          Resource: R
        });
  },

  end: function () {
    var r = this.props.resourceName;

    util.rewrite({
      file: 'app/routes.js',
      needle: '// Insert routes below',
      splicable: [
        `app.use('/v1/${r}s', require('./api/v1/${r}'));`
      ]
    });
  }
});
