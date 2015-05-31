var gulp = require('gulp');
var data = require('gulp-data');
var jade = require('gulp-jade');
var minify = require('gulp-minify-html');
var path = require('path');

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

gulp.task('server', function () {
  require('live-server').start({
    port: 8080,
    host: '0.0.0.0',
    logLevel: 0,
    ignore: [ path.join(__dirname, 'templates') ]
  });
});

gulp.task('dev-server', [ 'watch', 'server' ]);
