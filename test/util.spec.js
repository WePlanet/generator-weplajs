"use strict";

const fs = require('fs');
const path = require('path');
const should = require('should');
const util = require('../generators/util');

describe('util.js', () => {
  describe('rewrite()', () => {
    const filePath = path.join(__dirname, './rewrite-test-sample.js');
    const text = `
      const foo = _=> {
        // Insert below
        
        already here! 
      };`;
    beforeEach('Create sample file', () => fs.writeFileSync(filePath, text));
    afterEach('Delete sample file', () => fs.unlinkSync(filePath));

    it('should insert splicable in below haystack', () => {
      const args = {
        file: filePath,
        needle: '// Insert below',
        splicable: [
          'insert it'
        ]
      };

      util.rewrite(args);
      const lines = fs.readFileSync(filePath, 'utf8')
                      .split('\n');
      const needleIdx = lines.findIndex((l, i) => l.indexOf(args.needle) > -1);
      lines[needleIdx + 1].indexOf(args.splicable[0]).should.be.greaterThan(-1);
    });

    it('should origin text if already has splicable', () => {
      util.rewrite({
        file: filePath,
            needle: '// Insert below',
            splicable: [
          'already here!'
        ]
      });
      fs.readFileSync(filePath, 'utf8').should.be.equal(text);
    })
  });

  describe('removeLines()', () => {
    const filePath = path.join(__dirname, './removeLines-test-sample.js');
    const text = `
      const foo = _=> {
        // Remove it
        Remain it
      };`;
    before('Create sample file', () => fs.writeFileSync(filePath, text));
    after('Delete sample file', () => fs.unlinkSync(filePath));

    it('should remove matched lines from text', () => {
      let r = fs.readFileSync(filePath, 'utf8');
      util.removeLines({
        file: filePath,
        removeStr: 'Remove it'
      });
      r = fs.readFileSync(filePath, 'utf8');
      r.indexOf('Remove it').should.be.equal(-1);
    });
  });

  describe('replace()', () => {
    const filePath = path.join(__dirname, './replace-test-sample.js');
    const text = `
      const foo = _=> {
        function () {
        
        }
      };`;
    before('Create sample file', () => fs.writeFileSync(filePath, text));
    after('Delete sample file', () => fs.unlinkSync(filePath));

    it('should replace sub string', () => {
      let r = fs.readFileSync(filePath, 'utf8');
      util.replace({
        file: filePath,
        subStr: 'function ()',
        newSubStr: '() =>'
      });
      r = fs.readFileSync(filePath, 'utf8');
      r.indexOf('function ()').should.be.equal(-1);
    });
  });

  describe('capitalize()', () => {
    it('should capitalzie firest charactor of input', () => {
      util.capitalize('test').should.be.equal('Test');
    });
  });

  describe('exist()', () => {
    const path = `./${Date.now()}.txt`;
    before('Create sample file', () => fs.writeFileSync(path, 'test'));
    after('Delete smaple file', () => fs.unlinkSync(path));


    it('should return true if file is not exist', () => {
      util.exist(path).should.be.true;
    });

    it('should return false if file is not exist', () => {
      util.exist(`${Date.now()}.txt`).should.be.false;
    });
  });

  describe('sanitize()', () => {
    it('should replace space to _', () => {
      util.sanitize('hello world project').should.be.equal('hello_world_project');
      util.sanitize(' hello world ').should.be.equal('hello_world');
    });
  });
});
