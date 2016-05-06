/* */ 
var ejs = require('../lib/ejs'),
    fs = require('fs'),
    str = fs.readFileSync(__dirname + '/list.ejs', 'utf8');
var ret = ejs.render(str, {names: ['foo', 'bar', 'baz']});
console.log(ret);
