'use strict';
var babel = require('gulp-babel'),
    uglify = require('gulp-uglify');

module.exports = function(gulp, $) {

    gulp.task('scripts:setup', function() {
        return gulp.src('source')
            .pipe($.symlink('examples/source'));
    });

    gulp.task('jscs', function() {
        return gulp.src([
                'source/**/*.js',
                'examples/js/*.js'
            ])
            .pipe($.jscs());
    });

    gulp.task('jshint', function() {
        return gulp.src([
                'source/**/*.js',
                'examples/js/*.js'
            ])
            .pipe($.jshint())
            .pipe($.jshint.reporter('jshint-stylish'))
            .pipe($.jshint.reporter('fail'));
    });

    gulp.task('concat', function() {
        return gulp.src([
                'source/**/*.js',
                '!**/*.spec.js'
            ])
            .pipe($.concat('/bwc-component.js'))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('uglify', ['concat'], function() {
        return gulp.src('dist/bwc-component.js')
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(uglify({
                preserveComments: 'some'
            }))
            .pipe($.rename('bwc-component.min.js'))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('karma', function() {
        var server = new $.karma.Server({
            configFile: __dirname + '/../karma.conf.js',
            singleRun: true
        }, function(err) {
            process.exit(err ? 1 : 0);
        });
        return server.start();
    });
};