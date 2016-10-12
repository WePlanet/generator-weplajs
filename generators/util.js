"use strict";

const fs = require('fs');

const rewrite = args => {
  let lines = args.haystack.split('\n');

  let otherwiseLineIndex = -1;
  lines.forEach((line, i) => {

    console.log('line:', line);

    if (line.indexOf(args.needle) !== -1) {
      otherwiseLineIndex = i;
    }
  });
  if(otherwiseLineIndex === -1) return lines.join('\n');

  let spaces = 0;
  while (lines[otherwiseLineIndex].charAt(spaces) === ' ') {
    spaces += 1;
  }

  let spaceStr = '';
  while ((spaces -= 1) >= 0) {
    spaceStr += ' ';
  }

  lines.splice(otherwiseLineIndex + 1, 0, args.splicable.map(function(line) {
    return spaceStr + line;
  }).join('\n'));

  return lines.join('\n');
};

exports.rewrite = args => {
  args.haystack = fs.readFileSync(args.file, 'utf8');
  const body = rewrite(args);

  fs.writeFileSync(args.file, body);
};
