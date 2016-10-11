var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    cleanCss = require('gulp-clean-css'),
    gutil = require('gulp-util');

var stylesPath = 'src/styles/*.less',
    scriptsPath = 'src/scripts/*.js';

gulp.task('scripts', function() {
    return gulp.src(scriptsPath)
        .pipe(concat('angular-placeholder-field.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('angular-placeholder-field.min.js'))
        .pipe(uglify().on('error', gutil.log))
        .pipe(gulp.dest('dist'))
        .on('error', function(e) {
            gutil.log(e);
        });
});

gulp.task('styles', function() {
    return gulp.src(stylesPath)
        .pipe(less())
        .pipe(concat('angular-placeholder-field.css'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('angular-placeholder-field.min.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    var watchers = [
            gulp.watch(scriptsPath, ['scripts']),
            gulp.watch(stylesPath, ['styles'])
        ];
    for (var i = 0; i < watchers.length; i++) {
        watchers[i].on('change', function(event) {
            gutil.log('Watched file ' + event.type + ' \'' + gutil.colors.cyan(event.path) + '\'');
        });

    }

});

gulp.task('default', ['scripts', 'styles', 'watch']);