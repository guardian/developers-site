var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var livereload = require('gulp-livereload');
var autoprefixCss = require('gulp-autoprefixer');

var ejs = require('ejs');
var fs = require('fs');
var path = require('path');
var Q = require('q');
var moment = require('moment');
var flatten = require('lodash-node/modern/arrays/flatten');
var assign = require('lodash-node/modern/objects/assign');
var filter = require('lodash-node/modern/collections/filter');
var find = require('lodash-node/modern/collections/find');
var groupBy = require('lodash-node/modern/collections/groupBy');
var Lanyrd = require('lanyrd');

var basePath = __dirname + '/src';

gulp.task('css', function () {
    gulp.src('./src/css/main.scss')
        .pipe(sass({
            // FIXME:
            // https://github.com/sindresorhus/gulp-ruby-sass/pull/68
            // sourcemap: true
        }))
        // TODO: Not exhaustive? What is our support?
        // https://github.com/ai/autoprefixer#browsers
        .pipe(autoprefixCss('Safari 7'))
        .pipe(gulp.dest('./target/css'));
});

gulp.task('copy', function () {
    gulp.src('./src/images/**')
        .pipe(gulp.dest('./target/images'));
    // TODO: jspm bundle
    // https://github.com/jspm/jspm-cli/issues/43
    // TODO: Concatenate with polyfills
    gulp.src('./src/jspm_packages/**')
        .pipe(gulp.dest('./target/jspm_packages'));
    // SystemJS config
    gulp.src('./src/config.js')
        .pipe(gulp.dest('./target'));
    gulp.src('./src/js/**/*.js')
        .pipe(gulp.dest('./target/js'));
    gulp.src('./src/enhanced-views/**/*.ejs')
        .pipe(gulp.dest('./target/enhanced-views'));
});


gulp.task('generate', ['lanyrd'], function () {
    generatePages();
});

gulp.task('watch', function () {
    var server = livereload();
    gulp.watch('./src/css/**/*.scss', ['css']);
    gulp.watch('./src/**/*.ejs', ['generate']);
    gulp.watch('./src/js/**/*.js', ['copy']);
    gulp.watch('./src/images/**', ['copy']);
    gulp.watch('./src/enhanced-views/**/*.ejs', ['copy']);

    gulp.watch('./target/**').on('change', function (file) {
        server.changed(file.path);
    });
});

gulp.task('default', ['css', 'copy', 'lanyrd', 'generate']);

var talks = require('./src/content/talks.json');
var authors = require('./src/content/authors.json');
var jobs = require('./src/content/jobs.json');

var pages = [
    {
        title: 'Home',
        fileBasename: 'index.ejs'
    },
    {
        title: 'Open Source',
        fileBasename: 'open-source.ejs'
    },
    {
        title: 'Events & Talks',
        fileBasename: 'events-&-talks.ejs',
        talks: talks
    },
    {
        title: "Join the Guardian's development team",
        fileBasename: 'join-the-team.ejs',
        description: "The Guardian is the world's leading liberal voice, come join the team of developers behind the Pulitzer Prize-winning site theguardian.com",
        jobs: jobs
    }
];

function createMd5Hash(emailAddress) {
    var crypto = require('crypto');
    return crypto.createHash('md5').update(emailAddress).digest('hex');
}

function generatePages() {
    pages.forEach(function (page) {
        var rootScope = {
            pages: pages,
            findAuthorByName: function (authorName) {
                return find(authors, { name: authorName });
            },
            momentFilter: function (dateString, formatString) {
                return moment(dateString).format(formatString);
            },
            getGravatarUrl: function (emailAddress) {
                return 'http://www.gravatar.com/avatar/' + createMd5Hash(emailAddress);
            }
        };
        var pageScope = Object.create(rootScope);
        assign(pageScope, page);
        var filename = path.join(basePath, page.fileBasename);
        var file = fs.readFileSync(filename, { encoding: 'utf8' });
        var output = ejs.render(file, {
            // Needed by EJS
            filename: filename,
            scope: pageScope
        });

        fs.writeFileSync('./target/' + page.fileBasename.replace(/\.ejs$/, '.html'),
            output, { encoding: 'utf8' });
    });
}

function getUpcomingEvents() {
    var users = filter(authors, 'lanyrd');
    var events = users.map(function(user) {
        var futureEvents = Q.nbind(Lanyrd.futureEvents, Lanyrd);
        return futureEvents(user.lanyrd).spread(function(resp, events) {
            return events.map(function(event) {
                event.users = [user];
                return event;
            });
        });
    });

    return Q.all(events);
}

function sortEvents(events) {
    //Group events by activity type 'speaking', 'attending' or 'tracking'
    var groups = groupBy(flatten(events), 'subsubtitle_class');

    Object.keys(groups).forEach(function(type) {
        //First sort events by date
        groups[type] = groups[type].sort(function(a, b){
            return moment(a.month).unix() > moment(b.month).unix() ? 1 : -1;

        //Dedupe events whilst maintaining users attending
        }).reduce(function(newEvents, event) {
            var existingEvent = find(newEvents, { title: event.title });

            if (existingEvent) {
                event.users.forEach(function(user) {
                    existingEvent.users.push(user);
                });
            } else {
                newEvents.push(event);
            }

            return newEvents;
        }, []);
    });

    return groups;
}

gulp.task('lanyrd', function() {
    return getUpcomingEvents().then(function(events){
        find(pages, {title: 'Events & Talks'}).upcomingEvents = sortEvents(events);
    });
});
