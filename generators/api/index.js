'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
        'Make new REST API by ' + chalk.red('generator-weplajs') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'resNm',
      message: 'What is a resource name of new REST Api?',
      default: 'resource'
    }, {
      type: 'input',
      name: 'v',
      message: 'What is api version of it?',
      default: 'v1'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
        this.templatePath('api/index.js'),
        this.destinationPath('app/api/' + this.props.v + '/' + this.props.resNm +
            '/index.js'), {
          resNm: this.props.resNm
        });

    this.fs.copyTpl(
        this.templatePath('api/resource.ctrl.js'),
        this.destinationPath('app/api/' + this.props.v + '/' + this.props.resNm +
            '/' + this.props.resNm + '.ctrl.js'), {
          resNm: this.props.resNm,
          ResNm: this.props.resNm.capitalize()
        });

    this.fs.copyTpl(
        this.templatePath('api/resource.spec.js'),
        this.destinationPath('app/api/' + this.props.v + '/' + this.props.resNm +
            '/' + this.props.resNm + '.spec.js'), {
          resNm: this.props.resNm,
          ResNm: this.props.resNm.capitalize()
        });

    this.fs.copyTpl(
        this.templatePath('model.js'),
        this.destinationPath('app/models/' + this.props.resNm.capitalize() + '.js'), {
          resNm: this.props.resNm,
          ResNm: this.props.resNm.capitalize()
        });

    this.fs.copyTpl(
        this.templatePath('lib.js'),
        this.destinationPath('app/lib/' + this.props.resNm.capitalize() + '.js'), {
          resNm: this.props.resNm,
          ResNm: this.props.resNm.capitalize()
        });
  },

  end: function () {
    require('../util').rewrite({
      file: 'app/routes.js',
      needle: '// Insert routes below',
      splicable: [
        `app.use('/v1/${this.props.resNm}s', require('./api/v1/${this.props.resNm}'));`
      ]
    });
  }
});
