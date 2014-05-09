var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', function () {
    gulp.src('./src/css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./target/css'));
});
