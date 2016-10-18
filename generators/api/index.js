'use strict';

const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const util = require('../util');
const fs = require('fs');
const path = require('path');

module.exports = yeoman.Base.extend({
  config() {
    this.config.set('api.auth',           `api.isAuthenticated(),`);
    this.config.set('swagger.authParam',  `{$ref: '#/parameters/AccessToken'},`);
    this.config.set('swagger.pathNeedle', `// Path will be here`);
    this.config.set('swagger.tagNeedle',  `// Tags will be here`);
  },

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
    }, {
      type: 'confirm',
      name: 'authenticated',
      message: 'Is api need authentication?',
      default: true
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
          Resource: R,
          version: v
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
    const v = this.props.version;
    const r = this.props.resourceName;
    const R = util.capitalize(r);

    util.rewrite({
      file: 'app/routes.js',
      needle: '// Insert routes below',
      splicable: [
        `app.use('/${v}/${r}s', require('./api/${v}/${r}'));`
      ]
    });

    util.rewrite({
      file: `app/config/swagger/${v}.doc.js`,
      needle: this.config.get('swagger.tagNeedle'),
      splicable: [
        `${R}: '${R}',`
      ]
    });

    util.rewrite({
      file: `app/config/swagger/${v}.doc.js`,
      needle: this.config.get('swagger.pathNeedle'),
      splicable: [
        fs.readFileSync(path.join(__dirname, './templates/swagger.js'), 'utf8')
            .replace(/\<\=\% resource \=\>/g, r)
            .replace(/\<\=\% Resource \=\>/g, R)
      ]
    });

    if (!this.props.authenticated) {
      util.removeLines({
        file: `app/api/${v}/${r}/index.js`,
        removeStr: this.config.get('api.auth')
      });

      util.replace({
        file: `app/api/${v}/${r}/${r}.spec.js`,
        subStr: `helper.bindAccessToken('/${v}/${r}s/1')`,
        newSubStr: `'/${v}/${r}s/1'`
      });

      util.replace({
        file: `app/api/${v}/${r}/${r}.spec.js`,
        subStr: `helper.bindAccessToken('/${v}/${r}s')`,
        newSubStr: `'/${v}/${r}s'`
      });

      util.removeLines({
        file: `app/config/swagger/${v}.doc.js`,
        removeStr: this.config.get('swagger.authParam')
      });
    }
  }
});
