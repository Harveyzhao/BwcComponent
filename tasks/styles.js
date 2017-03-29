'use strict';

module.exports = function (gulp, $) {

  gulp.task('styles:copy-source', function () {
    return gulp.src('source/*.css')
      .pipe(gulp.dest('dist'));
  });

  gulp.task('styles', function () {
    return gulp.src('source/*.css')
      .pipe($.cssnano({ safe: true }))
      .pipe($.rename('bwc-component.min.css'))
      .pipe(gulp.dest('dist'));
  });

};
