'use strict';

module.exports = function (gulp, $) {

  gulp.task('styles:copy-source', function () {
    return gulp.src('source/theme/**/*.*')
      .pipe(gulp.dest('dist'));
  });

  gulp.task('styles', function () {
    return gulp.src('source/theme/*.css')
      .pipe($.cssnano({ safe: true }))
      .pipe($.rename('bwc-component.min.css'))
      .pipe(gulp.dest('dist'));
  });

};
