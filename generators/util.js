"use strict";

const fs = require('fs');

const escapeRegExp = str => {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
};

const rewrite = args => {
  // check if splicable is already in the body text
  var re = new RegExp(args.splicable.map(line => '\s*' + escapeRegExp(line))
                                    .join('\n'));
  if (re.test(args.haystack)) return args.haystack;

  let lines = args.haystack.split('\n');

  let otherwiseLineIndex = -1;
  lines.forEach((line, i) => {
    if (line.indexOf(args.needle) !== -1) otherwiseLineIndex = i;
  });
  if(otherwiseLineIndex === -1) return lines.join('\n');

  let spaces = 0;
  while (lines[otherwiseLineIndex].charAt(spaces) === ' ') spaces++;

  let spaceStr = '';
  while ((spaces -= 1) >= 0) spaceStr += ' ';

  lines.splice(otherwiseLineIndex + 1,
               0,
               args.splicable.map(line => spaceStr + line).join('\n'));

  return lines.join('\n');
};

exports.rewrite = args => {
  args.haystack = fs.readFileSync(args.file, 'utf8');
  fs.writeFileSync(args.file, rewrite(args));
};

exports.removeLines = args => {
  const text = fs.readFileSync(args.file, 'utf8')
      .split('\n')
      .filter(line => !line.includes(args.removeStr))
      .join('\n');
  fs.writeFileSync(args.file, text);
};

exports.replace = args => {
  const text = fs.readFileSync(args.file, 'utf8')
      .split('\n')
      .map(line => line.replace(args.subStr, args.newSubStr))
      .join('\n');
  fs.writeFileSync(args.file, text);
};

exports.capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

exports.exist = path => {
  try {
    fs.accessSync(path);
    return true;
  } catch(e) {
    return false;
  }
};

exports.sanitize = str => str.trim().replace(/\s/gi, '_');
