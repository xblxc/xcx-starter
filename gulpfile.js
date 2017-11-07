var gulp    = require('gulp');
var del     = require('del');
var filter  = require('gulp-filter');
// var postcss = require('gulp-postcss');
var sass    = require('gulp-sass');
var rename  = require('gulp-rename');
var gulpSequence = require('gulp-sequence');

gulp.task('clean', function(){
  return del(['dist/'], { force: true });
});

gulp.task('build', ['clean'],  function(){
    var sassFilter = filter('**/*.{scss,sass,wxss}', {restore: true});
    var otherFilter = filter(['**', '!**/*.{scss,sass,wxss}']);
    return gulp.src('src/**')
        .pipe(sassFilter)
        .pipe(sass().on('error', sass.logError))
        // .pipe(postcss([
        //     require('autoprefixer')(['iOS >= 8', 'Android >= 4.1'])
        // ]))
        .pipe(rename({'extname': '.wxss'}))
        .pipe(gulp.dest('dist/'))
        .pipe(sassFilter.restore)
        .pipe(otherFilter)
        .pipe(gulp.dest('dist/'))
});

gulp.task('watch', function(){
    return gulp.watch('src/**', ['build'])
});

gulp.task('default', gulpSequence('build', 'watch'));
