"format cjs";

/**
 * Module dependencies.
 */

var ejs = require('../')
  , fs = require('github:jspm/nodelibs@0.0.2/fs')
  , str = fs.readFileSync(__dirname + '/list.ejs', 'utf8');

var ret = ejs.render(str, {
  names: ['foo', 'bar', 'baz']
});

console.log(ret);