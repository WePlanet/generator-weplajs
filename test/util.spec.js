"use strict";

const path = require('path');
const util = require('../generators/util');
const fs = require('fs');
const assert = require('assert');

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
      assert.equal(lines[needleIdx + 1].indexOf(args.splicable[0]) > -1, true);
    });

    it('should origin text if already has splicable', () => {
      util.rewrite({
        file: filePath,
            needle: '// Insert below',
            splicable: [
          'already here!'
        ]
      });
      assert.equal(text, fs.readFileSync(filePath, 'utf8'));
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
      assert.equal(true, r.indexOf('Remove it') === -1)
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
      assert.equal(true, r.indexOf('function ()') === -1)
    });
  });

  describe('capitalize()', () => {
    it('should capitalzie firest charactor of input', () => {
      assert.equal(util.capitalize('test'), 'Test');
    });
  });

  describe('exist()', () => {
    const path = `./${Date.now()}.txt`;
    before('Create sample file', () => fs.writeFileSync(path, 'test'));
    after('Delete smaple file', () => fs.unlinkSync(path));


    it('should return true if file is not exist', () => {
      assert.equal(util.exist(path), true);
    });

    it('should return false if file is not exist', () => {
      assert.equal(util.exist(`${Date.now()}.txt`), false);
    });
  })
});
