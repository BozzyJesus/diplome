var gulp     = require('gulp');
 cleanCSS    = require('gulp-clean-css');
 sass        = require('gulp-ruby-sass');
 browserSync = require('browser-sync');
 cssScss     = require('gulp-css-scss');

/*//css - scss
gulp.task('css-scss',() => {
    return gulp.src('source/stylesheet/css/*.css')
        .pipe(cssScss())
        .pipe(gulp.dest('source/stylesheet/sass/'))
        .pipe(browserSync.reload({stream: true}))
});
*/

gulp.task('ruby-sass', () => {
//sass
    sass('source/stylesheet/sass/*.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('source/stylesheet/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('min-css', () => {
    //css-min
         gulp.src('source/stylesheet/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('source/stylesheet/min-css/'))
         //browserSync
    .pipe(browserSync.reload({stream: true}))

});

gulp.task('browser-sync', function(){
    browserSync({
        server: {
            baseDir: 'source'
        },
        notify: false
    });
});

gulp.task('watch',['browser-sync','ruby-sass','min-css'] ,function(){
    gulp.watch('source/stylesheet/sass/*.scss', ['ruby-sass']);
   // gulp.watch('source/stylesheet/sass/*.scss', ['css-scss']);
    gulp.watch('source/stylesheet/css/*.css', ['min-css']);
    gulp.watch('source/*html', browserSync.reload);
    gulp.watch('source/js/*js', browserSync.reload);

});