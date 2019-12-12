const gulp = require('gulp')
const ts = require('gulp-typescript')
const clean = require('gulp-clean')

const STATIC_FILES = ['src/*.json', 'src/**/*.json', 'src/**/*.md', 'README.md']

const tsProject = ts.createProject('tsconfig.json')

gulp.task('clean', function () {
    return gulp.src('dist', { read: false })
        .pipe(clean());
});

gulp.task('compile', () => {
    const tsResult = tsProject.src()
        .pipe(tsProject());
    return tsResult.js
        .pipe(gulp.dest('dist'))
});

gulp.task('assets', function () {
    return gulp.src(STATIC_FILES)
        .pipe(gulp.dest('dist'));
});

gulp.task('partials', function () {
    return gulp.src(['src/partials/*'])
        .pipe(gulp.dest('dist/partials/'));
});

gulp.task('css', function () {
    return gulp.src(['src/css/*'])
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('img', function () {
    return gulp.src(['src/img/*'])
        .pipe(gulp.dest('dist/img/'));
});

gulp.task('watch', gulp.series(function () {
    gulp.watch('src/**/*.ts', gulp.series('compile'));
    gulp.watch('src/**/*.json', gulp.series('assets'));
    gulp.watch('src/**/*.md', gulp.series('assets'));
    gulp.watch('src/partials/*', gulp.series('partials'));
    gulp.watch('src/css/*', gulp.series('css'));
    gulp.watch('src/img/*', gulp.series('img'));
}));

gulp.task('build', gulp.series(['clean', 'compile', 'assets', 'partials', 'css', 'img']));

gulp.task('default', gulp.series(['build', 'watch']));