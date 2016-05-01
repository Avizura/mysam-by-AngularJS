var gulp = require('gulp');
var babel = require("gulp-babel");
var runElectron = require("gulp-run-electron");
var gulpSequence = require('gulp-sequence');

gulp.task('built', ['html'], function() {
    return gulp.src("src/**/*.js")
      .pipe(babel())
      .pipe(gulp.dest("dist"));
});

gulp.task('html', function() {
  return gulp.src("src/**/*.html")
    .pipe(gulp.dest("dist"));
});

gulp.task('js', function() {
  return gulp.src("src/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});

gulp.task('run', function() {
  return gulp.src("")
    .pipe(runElectron());
});

gulp.task('js-run', function(callback) {
  gulpSequence('js', 'run')(callback)
});

gulp.task('html-run', function(callback) {
  gulpSequence('html', 'run')(callback)
});

gulp.task('watch', function() {
  gulp.watch("src/**/*.html", ['html-run']);
  gulp.watch("src/**/*.js", ['js-run']);
});
