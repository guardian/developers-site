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
});

gulp.task('watch', function () {
    var server = livereload();
    gulp.watch('./src/css/**/*.scss', ['sass']);
    gulp.watch('./target/css/**').on('change', function (file) {
        server.changed(file.path);
    });
});

gulp.task('default', ['sass', 'watch']);
