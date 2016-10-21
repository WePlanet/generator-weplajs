'use strict';
const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const util = require('../util')

module.exports = yeoman.Base.extend({
  config() {
    this.config.set('errorcode.needle', `{ "// Error code will be here": true },`);
  },

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Create new error code'
    ));

    const prompts = [{
      type: 'input',
      name: 'cd',
      message: 'What is new error code in this product?',
      default: 'SomeErrorCode'
    }, {
      type: 'input',
      name: 'msg',
      message: `What is error message(in English) of this error code?`,
      default: 'Some error occured!'
    }];

    return this.prompt(prompts).then(props => this.props = props);
  },

  end() {
    util.rewrite({
      file: 'app/components/errors/error-codes.json',
      needle: this.config.get('errorcode.needle'),
      splicable: [
`{
    "code": "${this.props.cd}",
    "message": {
      "en": "${this.props.msg}"
    }
  },`
      ]
    });
  }
});
