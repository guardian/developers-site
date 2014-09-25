/* */ 
"format cjs";
var ejs = require("../index"),
    fs = require("github:jspm/nodelibs@0.0.3/fs"),
    str = fs.readFileSync(__dirname + '/list.ejs', 'utf8');
var ret = ejs.render(str, {names: ['foo', 'bar', 'baz']});
console.log(ret);
