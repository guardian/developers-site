var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');

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
    gulp.src('./src/js/**.js')
        .pipe(gulp.dest('./target/js'));
});

gulp.task('ejs', function () {
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
});

gulp.task('watch', function () {
    var server = livereload();
    gulp.watch('./src/css/**/*.scss', ['sass']);
    gulp.watch('./target/css/**').on('change', function (file) {
        server.changed(file.path);
    });

    gulp.watch('./src/views/**/*.ejs', ['ejs']);
    gulp.watch('./target/**/*.html').on('change', function (file) {
        server.changed(file.path);
    });
});

gulp.task('default', ['sass', 'copy', 'ejs']);
