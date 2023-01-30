import gulp from 'gulp';
import sass from 'sass';
import gulpSass from 'gulp-sass';
import {deleteSync} from 'del';

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

gulp.task('default', gulp.series(['clean', 'styles']));
