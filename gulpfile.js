var gulp = require('gulp');
var data = require('gulp-data');
var jade = require('gulp-jade');
var minify = require('gulp-minify-html');


gulp.task('jade', function () {
  gulp.src('./templates/*.jade')
    .pipe(data(function (file) {
      return { filename: file.path };
    }))
    .pipe(jade())
    .pipe(minify({ conditionals: true }))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
  gulp.watch('templates/**/*.*', [ 'jade' ]);
});
