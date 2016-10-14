"use strict";

const path = require('path');
const util = require('../generators/util');
const fs = require('fs');
const assert = require('assert');

describe('util.js', () => {
  describe('rewrite()', () => {
    const filePath = path.join(__dirname, './rewrite-test-sample.js');

    before('Create sample file', () => {
      const text = `
        const foo = _=> {
          // Insert below
        
        };`;
      fs.writeFileSync(filePath, text);
    });

    after('Delete sample file', () => {
      fs.unlinkSync(filePath);
    });


    it('should insert splicable in below haystack', () => {
      const args = {
        file: filePath,
        needle: '// Insert below',
        splicable: [
          'insert it'
        ]
      };

      util.rewrite(args);
      const r = fs.readFileSync(filePath, 'utf8');
      console.log(r);

      const lines = r.split('\n');
      const needleIdx = lines.findIndex((l, i) => l.indexOf(args.needle) > -1);
      assert.equal(lines[needleIdx + 1].indexOf(args.splicable[0]) > -1, true);
    });
  });
});
