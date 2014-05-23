var ejs = require('ejs');
var fs = require('fs');
var path = require('path');

var filenames = ['./src/views/index.ejs', './src/views/open-source.ejs'];

filenames.forEach(function (filename) {
    var file = fs.readFileSync(filename, { encoding: 'utf8' });
    var output = ejs.render(file, {
        filename: filename,
        pages: [
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
        ]
    });

    fs.writeFileSync('./target/' + path.basename(filename, '.ejs') + '.html', output, { encoding: 'utf8' });
});

