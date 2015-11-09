import gulp from 'gulp';
import plumber from 'gulp-plumber';

import jade from 'gulp-jade';
import stylus from 'gulp-stylus';
import babel from 'gulp-babel';

import flatten from 'gulp-flatten';

gulp.task('jade', () => {
  return gulp.src(['./**/*.jade', '!_partials/*.jade', '!_layout.jade'])
    .pipe(plumber())
    .pipe(jade({
      basedir: './',
      pretty: true
    }))
    .pipe(gulp.dest('./build'));
})

gulp.task('stylus', () => {
  return gulp.src('./css/index.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('babel', () => {
  return gulp.src('./js/*.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('copy-img', () => {
  return gulp.src('./img/**/*')
    .pipe(gulp.dest('./build/img'));
});

// Copies all fonts
gulp.task('fonts', () => {
  return gulp.src(['./vendor/**/*.{eot,svg,ttf,woff,woff2}', '!./vendor/Ionicons/src/*'])
    .pipe(flatten())
    .pipe(gulp.dest('fonts'));
});

gulp.task('copy-fonts', () => {
  return gulp.src('./fonts/**/*')
    .pipe(gulp.dest('./build/fonts'));
});

// Copies the `vendor` directory into the `build` directory
gulp.task('copy-vendor', () => {
  return gulp.src(['./vendor/**/*', '!./vendor/Ionicons/src/*'])
    .pipe(gulp.dest('./build/vendor'));
});

gulp.task('default', ['jade', 'stylus', 'babel', 'copy-img', 'fonts', 'copy-fonts', 'copy-vendor'], () => {
  gulp.watch('./**/*.jade', ['jade']);
  gulp.watch('./css/*.styl', ['stylus']);
  gulp.watch('./js/*.js', ['babel']);

  gulp.watch('./img/**/*', ['copy-img']);
  gulp.watch('./vendor/**/*', ['fonts', 'copy-fonts', 'copy-vendor']);
});