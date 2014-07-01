var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');

var ejs = require('ejs');
var fs = require('fs');
var path = require('path');
var assign = require('lodash-node/modern/objects/assign');

var basePath = __dirname + '/src';

gulp.task('sass', function () {
    gulp.src('./src/css/main.scss')
        .pipe(sass())
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


gulp.task('generate', function () {
    var pages = [
        {
            title: 'Home',
            fileBasename: 'index.ejs'
        },
        {
            title: 'Open Platform',
            fileBasename: 'open-platform.ejs'
        },
        {
            title: 'Open Source',
            fileBasename: 'open-source.ejs'
        },
        {
            title: 'Events & Talks',
            fileBasename: 'events-&-talks.ejs'
        },
        {
            title: 'Join the Team',
            fileBasename: 'join-the-team.ejs'
        }
    ];

    generatePages(pages);
});

gulp.task('watch', function () {
    var server = livereload();
    gulp.watch('./src/css/**/*.scss', ['sass']);
    gulp.watch('./src/**/*.ejs', ['generate']);
    gulp.watch('./src/js/**/*.js', ['copy']);
    gulp.watch('./src/images/**', ['copy']);
    gulp.watch('./src/enhanced-views/**/*.ejs', ['copy']);

    gulp.watch('./target/**').on('change', function (file) {
        server.changed(file.path);
    });
});

gulp.task('default', ['sass', 'copy', 'generate']);

function generatePages(pages) {
    pages.forEach(function (page) {
        var rootScope = {
            pages: pages
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
