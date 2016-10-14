'use strict';

const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const util = require('../util');

module.exports = yeoman.Base.extend({
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay('Make ' + chalk.red('your first api ')));

    const prompts = [{
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

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  },

  writing() {
    const v = this.props.version;
    const r = this.props.resourceName;
    const R = util.capitalize(this.props.resourceName);

    this.fs.copyTpl(
        this.templatePath('api/index.js'),
        this.destinationPath(`app/api/${v}/${r}/index.js`), {
          resource: r
        });

    this.fs.copyTpl(
        this.templatePath('api/resource.ctrl.js'),
        this.destinationPath(`app/api/${v}/${r}/${r}.ctrl.js`), {
          resource: r,
          Resource: R
        });

    this.fs.copyTpl(
        this.templatePath('api/resource.spec.js'),
        this.destinationPath(`app/api/${v}/${r}/${r}.spec.js`), {
          resource: r,
          Resource: R
        });

    this.fs.copyTpl(
        this.templatePath('model.js'),
        this.destinationPath(`app/models/${R}.js`), {
          resource: r,
          Resource: R
        });

    this.fs.copyTpl(
        this.templatePath('lib.js'),
        this.destinationPath(`app/lib/${R}.js`), {
          resource: r,
          Resource: R
        });
  },

  end() {
    const r = this.props.resourceName;

    util.rewrite({
      file: 'app/routes.js',
      needle: '// Insert routes below',
      splicable: [
        `app.use('/v1/${r}s', require('./api/v1/${r}'));`
      ]
    });
  }
});
