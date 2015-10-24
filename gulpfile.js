var gulp = require('gulp');

var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var merge = require('merge-stream');

var shell = require('gulp-shell'),
    prettify = require('gulp-prettify'),
    useref = require('gulp-useref'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    minifyInline = require('gulp-minify-inline'),
    minifyHtml = require('gulp-minify-html'),
    del = require('del');

gulp.task('jade', function() {
  return gulp.src('./src/**/*.jade')
    .pipe(jade({
      basedir: './src'
    }))
    .pipe(gulp.dest('./build'));
})

gulp.task('stylus', function() {
  return gulp.src('./src/css/styles.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('pre-copy-js', function() {
  // For useref
  return gulp.src('./src/js/*.js')
    .pipe(gulp.dest('./build/js'));
});

gulp.task('compile', ['jade', 'stylus', 'pre-copy-js'], function() {
});

gulp.task('useref', ['compile'], function() {
  var assets = useref.assets();
  return gulp.src('./build/**/*.html')
    .pipe(prettify({indent_size: 2}))
    .pipe(assets)
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('./temp'));
});

gulp.task('minify-css', ['useref'], function() {
  return gulp.src('./temp/css/dist.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('minify-js', ['useref'], function() {
  return gulp.src('./temp/js/dist.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('minify-html', ['useref'], function() {
  return gulp.src('./temp/**/*.html')
    .pipe(minifyInline())
    .pipe(minifyHtml())
    .pipe(gulp.dest('./dist'));
});

gulp.task('clean', ['minify-css', 'minify-js', 'minify-html'], function(cb) {
  // del(['./build/**', './temp/**', './dist/partials/**', './dist/layout.html'], cb);
});

gulp.task('copy-cname', function() {
  return gulp.src('./src/CNAME')
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy-sitemap', function() {
  return gulp.src('./src/sitemap.xml')
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy-readme', function() {
  return gulp.src('./README.md')
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy-license', function() {
  return gulp.src('./LICENSE')
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy-fonts', function() {
  return gulp.src('./src/fonts/**')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('copy-js', function() {
  return gulp.src(['./src/js/modernizr-custom.min.js', './src/js/trianglify-0.3.1.min.js', './src/js/birthday.js'])
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('minify-img', function() {
  return gulp.src('./src/img/**')
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('produce', ['clean', 'copy-fonts', 'copy-cname', 'copy-sitemap', 'copy-readme', 'copy-license', 'copy-js', 'minify-img']);