import del from 'del';
import path from 'path';
import sequence from 'run-sequence';
import gulp from 'gulp';
import compass from 'gulp-compass';
import minifyCSS from 'gulp-minify-css';
import minifyHTML from 'gulp-minify-html';
import pages from 'gulp-gh-pages';
import replace from 'gulp-replace';
import uglify from 'gulp-uglify';

function prefix(path) {
  const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return replace(new RegExp(escaped, 'g'), `${path}itu.film/`);
}

gulp.task('clean', (cb) => {
  return del('dist', cb);
});

gulp.task('sass', () => {
  return gulp.src('sass/**/*.scss')
    .pipe(compass({
      config_file: 'config.rb'
    }))
    .pipe(prefix('url("/'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('html', () => {
  return gulp.src('{.,events,search,who}/index.html')
    .pipe(prefix('src="/'))
    .pipe(prefix('href="/'))
    .pipe(prefix("Audio('/"))
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

gulp.task('audio', () => {
  return gulp.src('audio/**')
    .pipe(gulp.dest('dist/audio'));
});

gulp.task('build', (cb) => {
  sequence('clean', ['sass', 'html', 'js', 'images', 'audio'], cb);
});

gulp.task('pages', ['build'], () => {
  return gulp.src('dist/**')
    .pipe(pages());
});

gulp.task('default', ['build']);
