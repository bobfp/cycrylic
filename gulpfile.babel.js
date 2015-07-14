import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import babelify from 'babelify';
import connect from 'gulp-connect';

gulp.task('browserify', () => {
  return browserify('./src/app.js')
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload());
})

gulp.task('connect', () => {
  connect.server({
    livereload: true
  })
})

gulp.task('html', () => {
  gulp.src('index.html')
  .pipe(connect.reload());
})

gulp.task('watch', () => {
  gulp.watch(['./src/*.js', './src/**/*.js'], ['browserify'])
  gulp.watch(['index.html'], ['html'])
})

gulp.task('default', ['browserify', 'connect', 'watch'])
