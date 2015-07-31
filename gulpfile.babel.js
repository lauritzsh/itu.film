import del from 'del';
import sequence from 'run-sequence';
import gulp from 'gulp';
import compass from 'gulp-compass';
import gif from 'gulp-if';
import minifyCSS from 'gulp-minify-css';
import minifyHTML from 'gulp-minify-html';
import pages from 'gulp-gh-pages';
import replace from 'gulp-replace';
import uglify from 'gulp-uglify';
import autoprefixer from 'gulp-autoprefixer';

let isProduction = process.env.NODE_ENV === 'production';
const BUILD_FOLDER = isProduction ? 'dist' : 'build';

function prefix(path) {
  const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return replace(new RegExp(escaped, 'g'), `${path}itu.film/`);
}

gulp.task('clean', (cb) => {
  return del(BUILD_FOLDER, cb);
});

gulp.task('sass', () => {
  const options = {
    css: `${BUILD_FOLDER}/css`,
    require: ['susy'],
  };

  if (!isProduction) { options.sourcemap = true; }

  return gulp.src('sass/**/*.scss')
    .pipe(compass(options))
    .pipe(autoprefixer())
    .pipe(gif(isProduction, prefix('url("/')))
    .pipe(gif(isProduction, minifyCSS()))
    .pipe(gulp.dest(`${BUILD_FOLDER}/css`));
});

gulp.task('html', () => {
  return gulp.src('{.,events,search,who}/index.html')
    .pipe(gif(isProduction, prefix('src="/')))
    .pipe(gif(isProduction, prefix('href="/')))
    .pipe(gif(isProduction, prefix("Audio('/")))
    .pipe(gif(isProduction, minifyHTML()))
    .pipe(gulp.dest(BUILD_FOLDER));
});

gulp.task('js', () => {
  return gulp.src('js/**')
    .pipe(gif(isProduction, uglify()))
    .pipe(gulp.dest(`${BUILD_FOLDER}/js`));
});

gulp.task('images', () => {
  return gulp.src('images/**')
    .pipe(gulp.dest(`${BUILD_FOLDER}/images`));
});

gulp.task('audio', () => {
  return gulp.src('audio/**')
    .pipe(gulp.dest(`${BUILD_FOLDER}/audio`));
});

gulp.task('build', (cb) => {
  sequence('clean', ['sass', 'html', 'js', 'images', 'audio'], cb);
});

gulp.task('pages', ['build'], () => {
  isProduction = true;

  return gulp.src('dist/**')
    .pipe(pages());
});

gulp.task('default', ['build']);
