var ejs = require('ejs');
var fs = require('fs');
var path = require('path');

var basePath = './src/views';
var filenames = ['index.ejs', 'open-source.ejs'].map(function (f) {
    return [basePath, f].join('/');
});

var pages = [
    {
        title: 'Home',
        filename: 'index.html'
    },
    {
        title: 'Open Platform',
        filename: 'open-platform.html'
    },
    {
        title: 'Open Source',
        filename: 'open-source.html'
    },
    {
        title: 'Events & Talks',
        filename: 'events-&-talks.html'
    },
    {
        title: 'Join the Team',
        filename: 'join-the-team.html'
    }
];

filenames.forEach(function (filename) {
    var file = fs.readFileSync(filename, { encoding: 'utf8' });
    var fileBasename = path.basename(filename);
    var output = ejs.render(file, {
        filename: filename,
        fileBasename: fileBasename,
        pages: pages
    });

    fs.writeFileSync('./target/' + fileBasename.replace(/\.ejs$/, '.html'),
        output, { encoding: 'utf8' });
});

