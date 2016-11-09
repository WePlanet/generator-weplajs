'use strict';

const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require('fs');
const path = require('path');
const util = require('../util');

module.exports = yeoman.Base.extend({
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Make new REST API by ' + chalk.red('generator-weplajs') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Project name?',
      // Defaults to the project's folder name if the input is skipped
      default: util.sanitize(this.appname)
    }, {
      type: 'input',
      name: 'dbHost',
      message: 'Database host?',
      default: '127.0.0.1'
    }, {
      type: 'input',
      name: 'dbName',
      message: 'Database name?',
      default: util.sanitize(this.appname)
    }, {
      type: 'input',
      name: 'dbUser',
      message: 'Database user name?',
      default: 'root'
    }, {
      type: 'input',
      name: 'dbPass',
      message: 'Database password?',
      default: 'root'
    }, {
      type: 'input',
      name: 'apiKey',
      message: 'api_key for the swagger-ui',
      default: `${util.sanitize(this.appname)}ApiKey`
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  },

  writing() {
    this.fs.copyTpl(
        this.templatePath('app'),
        this.destinationPath('app'), {
          name: this.props.name,
          dbName: this.props.dbName,
          dbUser: this.props.dbUser,
          dbPass: this.props.dbPass,
          dbHost: this.props.dbHost,
          apiKey: this.props.apiKey
        });
    this.fs.copy(
        this.templatePath('bin'),
        this.destinationPath('bin'));
    this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'), {
          name: this.props.name
        });
    this.fs.copy(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore'));
    this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'), {
          name: this.props.name
        });
    this.fs.copy(
        this.templatePath('swagger/index.js'),
        this.destinationPath('app/config/swagger/index.js'));
    this.fs.copyTpl(
        this.templatePath('swagger/version.doc.js'),
        this.destinationPath('app/config/swagger/v1.doc.js'), {
          version: 'v1'
        });

    // Add User APIs: /v1/users/:id
    this.fs.copyTpl(
        this.templatePath('../../api/templates/api/index.js'),
        this.destinationPath('app/api/v1/user/index.js'), {
          resource: 'user'
        });
    this.fs.copyTpl(
        this.templatePath('../../api/templates/api/resource.ctrl.js'),
        this.destinationPath(`app/api/v1/user/user.ctrl.js`), {
          resource: 'user',
          Resource: 'User'
        });
    this.fs.copyTpl(
        this.templatePath('../../api/templates/api/resource.spec.js'),
        this.destinationPath(`app/api/v1/user/user.spec.js`), {
          resource: 'user',
          Resource: 'User',
          version: 'v1'
        });
    this.fs.copyTpl(
        this.templatePath('../../api/templates/lib.js'),
        this.destinationPath('app/lib/User.js'), {
          resource: 'user',
          Resource: 'User'
        });
  },

  end() {
    util.rewrite({
      file: 'app/routes.js',
      needle: '// Insert routes below',
      splicable: [
        `app.use('/v1/users', require('./api/v1/user'));`
      ]
    });

    util.rewrite({
      file: 'app/config/swagger/v1.doc.js',
      needle: '// Tags will be here',
      splicable: [
        `User: 'User',`
      ]
    });

    util.rewrite({
      file: 'app/config/swagger/v1.doc.js',
      needle: '// Path will be here',
      splicable: [
        fs.readFileSync(path.join(__dirname, '../api/templates/swagger.js'), 'utf8')
            .replace(/\<\=\% resource \=\>/g, 'user')
            .replace(/\<\=\% Resource \=\>/g, 'User')
      ]
    });
  },

  install() {
    this.npmInstall();
  }
});
