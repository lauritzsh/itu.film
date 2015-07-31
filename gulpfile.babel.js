import del from 'del';
import path from 'path';
import sequence from 'run-sequence';
import gulp from 'gulp';
import compass from 'gulp-compass';
import minifyCSS from 'gulp-minify-css';
import minifyHTML from 'gulp-minify-html';
import pages from 'gulp-gh-pages';
import uglify from 'gulp-uglify';

gulp.task('clean', (cb) => {
  return del('dist', cb);
});

gulp.task('sass', () => {
  return gulp.src('sass/**/*.scss')
    .pipe(compass({
      config_file: 'config.rb'
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('html', () => {
  return gulp.src('{.,events,search,who}/index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('dist'));
});

gulp.task('js', () => {
  return gulp.src('js/**')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('images', () => {
  return gulp.src('images/**')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('build', (cb) => {
  sequence('clean', ['sass', 'html', 'js', 'images'], cb);
});

gulp.task('pages', ['build'], () => {
  return gulp.src('dist/**')
    .pipe(pages());
});

gulp.task('default', ['build']);
