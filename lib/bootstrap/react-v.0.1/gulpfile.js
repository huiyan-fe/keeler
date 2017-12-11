/**
 * @file gulpfile
 * @test
 */
const env = process.env.NODE_ENV || 'production';
console.log(env);

const webpackConfig = require('./webpack.config.js');
const gulp = require('gulp');
const webpack = require('webpack-stream');
const wk = require('webpack');
const sass = require('gulp-sass');

gulp.task('page', () => {
    gulp.src('src/page/*.*')
        .pipe(gulp.dest('./dist/'))
});

gulp.task('static', () => {
    gulp.src(['src/static/**/{*.*,!*.scss}'])
        .pipe(gulp.dest('./dist/static'))
});

gulp.task('sass', () =>
    gulp.src('./src/static/scss/**/{*.scss,!_*.scss}')
    .pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/static/css'))
);


if (env === 'development') {
    gulp.watch('src/static/scss/**/{*.scss,!_*.scss}', ['sass']);
    gulp.watch('src/static/**/{*.*,!*.scss}', ['static']);
}

gulp.task('default', ['sass', 'static']);