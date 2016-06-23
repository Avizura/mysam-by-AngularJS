var gulp = require('gulp');
var babel = require("gulp-babel");
var runElectron = require("gulp-run-electron");
var gulpSequence = require('gulp-sequence');
var path = require('path');

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

gulp.task('jsx', function() {
  return gulp.src("node_modules/dist/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/node_modules/jarvis-weather"));
});
var appPath = path.join(__dirname, 'dist');

gulp.task('run', function() {
  console.log(appPath);
  return gulp.src(appPath)
    .pipe(runElectron());
});

gulp.task('js-run', function(callback) {
  gulpSequence('js', 'run')(callback)
});

gulp.task('html-run', function(callback) {
  gulpSequence('html', 'run')(callback)
});

gulp.task('watch', function() {
  gulp.watch("src/**/*.html", ['html']);
  gulp.watch("src/**/*.js", ['js']);
});
