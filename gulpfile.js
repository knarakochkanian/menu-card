import gulp from 'gulp';
import sass from 'sass';
import gulpSass from 'gulp-sass';
import {deleteSync} from 'del';
import browserSync from 'browser-sync';
const gulpTest = gulpSass(sass);

gulp.task('styles', (done) => {
    gulp.src('sass/**/*.scss')
        .pipe(gulpTest(null, null).on('error', gulpTest.logError))
        .pipe(gulp.dest('./css/'));

    done();
});

gulp.task('clean', (done) => {
    deleteSync([
        'css/main.css',
    ]);
    done();
});

gulp.task('html',  () => {
    return gulp.src('*.html')
        .pipe(gulp.dest('build'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('serve',  () => {
    browserSync.init({
        server: "build",
    });
    gulp.watch("sass/**/*.scss", gulp.parallel('styles', 'clean')); // следить за всеми файлами в папке scss и при изменении запускать таск под названием scss
    gulp.watch("*.html", gulp.parallel("html")); // тоже самое, только с таском html
});


gulp.task('default', gulp.series(['serve','html', 'styles', 'clean' ]));

