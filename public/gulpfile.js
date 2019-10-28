const gulp = require('gulp'),
          sass = require('gulp-sass'),
          browserSync = require('browser-sync').create(),
          imagemin = require('gulp-imagemin'),
          print = require('gulp-print').default();


// Compile Sass
gulp.task('sass', function(done) {
  gulp.src('sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./css/'))
  .pipe(browserSync.reload({
    stream: true
  }))
  done();
});

// Optimize Images
gulp.task('imagemin', function(){
  return gulp.src('assets/pre-images/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('assets/images'))
});

// sync the browser
gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
});

// Watch Task
gulp.task('watch', gulp.series(['browserSync', 'sass'], function(){
  gulp.watch('sass/**/*.scss', ['sass'], browserSync.reload);
  gulp.watch('js/**/*.js', browserSync.reload);
  gulp.watch('./*.html', browserSync.reload);
}));