var gulp = require('gulp');
var data = require('gulp-data');
var jade = require('gulp-jade');
var minify = require('gulp-minify-html');
var livereload = require('gulp-livereload');

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
  livereload.listen();
  gulp.watch('templates/**/*.*', [ 'jade', 'refresh' ]);
});

gulp.task('server', function () {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')());
  app.use(express.static(__dirname, { etag: false }));
  app.listen(4000, '0.0.0.0');
});

gulp.task('refresh', [ 'jade' ], function () {
  setTimeout(function () {
    livereload.reload();
  }, 200);
});
