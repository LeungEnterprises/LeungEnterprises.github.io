var gulp = require('gulp');

var harp = require('harp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

var shell = require('gulp-shell'),
    prettify = require('gulp-prettify'),
    useref = require('gulp-useref'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    minifyInline = require('gulp-minify-inline'),
    minifyHtml = require('gulp-minify-html'),
    del = require('del');

var ghPages = require('gulp-gh-pages');

// development

// livereload implementation based on https://github.com/superhighfives/harp-gulp-browsersync-boilerplate
gulp.task('dev', function() {
  harp.server('./src', {
    port: 9000
  }, function() {
    console.log('Non-browsersync server started at localhost:9000');
    browserSync({
      proxy: "localhost:9000",
      open: false,
      notify: {
        styles: ['opacity: 0', 'position: absolute;']
      }
    });
  });

  gulp.watch('./src/css/styles.styl', function() {
    reload('css/styles.css', { stream: true });
  });

  gulp.watch('./src/js/scripts.js', function() {
    reload('js/scripts.js', { stream: true });
  });

  gulp.watch('./src/**/*.jade', function() {
    reload();
  });
});

// production

gulp.task('compile', function() {
  return gulp.src('')
    .pipe(shell([
      'harp compile ./src ./build'
    ]));
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
  return gulp.src('./temp/css/styles.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('minify-js', ['useref'], function() {
  return gulp.src('./temp/js/scripts.js')
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
  del(['./build/**', './temp/**'], cb);
});

gulp.task('copy-cname', function() {
  return gulp.src('./src/CNAME')
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy-fonts', function() {
  return gulp.src('./src/fonts/**')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('copy-js', function() {
  return gulp.src(['./src/js/modernizr-custom.min.js', './src/js/trianglify-0.3.1.min.js'])
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('minify-img', function() {
  return gulp.src('./src/img/**')
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('produce', ['clean', 'copy-fonts', 'copy-js', 'minify-img']);

gulp.task('production', ['produce'], function() {
  harp.server('./dist', {
    port: 8080
  }, function() {
    console.log('Server started at http://localhost:8080/');
  });
});

gulp.task('deploy', ['produce'], function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages({
      branch: 'master'
    }));
});

gulp.task('default', function() {
  console.log('\n');
  console.log('run ', '\x1b[36m', 'gulp dev','\x1b[0m', ' to start a harp server with browsersync at localhost:3000');
  console.log('run ', '\x1b[36m', 'gulp produce','\x1b[0m', ' to compile and minify all your files');
  console.log('run ', '\x1b[36m', 'gulp production','\x1b[0m', ' to produce your files and serve them at localhost:8080');
  console.log('run ', '\x1b[36m', 'gulp deploy','\x1b[0m', ' to produce your files and send them up to the github repository');
  console.log('\n');
});
