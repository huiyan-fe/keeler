/**
 * @file gulpfile
 * @test
 */

const env = process.env.NODE_ENV || 'production';
console.log(env);

const gulp = require('gulp');
const gulpWebpack = require('gulp-webpack');
const webpackStream = require('webpack-stream');
const sass = require('gulp-sass');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const webpack = require('webpack');


const webpackCof = {
    entry: require('./.keel/entry.js'),
    output: {
        filename: './app/[name].js',
        chunkFilename: env === 'production' ? './app/[name]-[hash].chunk.js' : './app/[name].chunk.js',
        publicPath: '../'
    },
    module: {
        loaders: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            query: {
                compact: false,
                presets: ['es2015', 'react', 'stage-3']
            }
        }, {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        }]
    },
    plugins: env === 'production' ? [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin()
    ] : [],
    watch: env !== 'production'
};

gulp.task('webpack', () => {
    return gulp.src('src/**/*.jsx')
        .pipe(webpackStream(webpackCof, webpack))
        .pipe(gulp.dest('dist/'));
});

gulp.task('sass', () =>
    gulp.src('./src/static/sass/**/{*.scss,!_*.scss}')
    .pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/static/css'))
);

gulp.task('static', () => {
    gulp.src('./src/static/fonts/**/*.*')
        .pipe(gulp.dest('./dist/static/fonts'));
    gulp.src('./src/static/js/**/*.*')
        .pipe(gulp.dest('./dist/static/js'));

    if (env !== 'production') {
        gulp.src('./src/page/**/*.html')
            .pipe(gulp.dest('./dist/'));
    } else {
        gulp.src('./src/page/**/*.html')
            .pipe(gulp.dest('./dist/'));
    }

    gulp.src('./src/static/images/**/*.*')
        .pipe(gulp.dest('./dist/static/images'));

    gulp.src('./src/static/geojson/**/*.*')
        .pipe(gulp.dest('./dist/static/geojson'));
});

gulp.task('revAndReplaceStatic', ['default'], () =>
    gulp.src(['./dist/static/**/*.*'])
    .pipe(rev())
    .pipe(gulp.dest('./online/static'))
    .pipe(rev.manifest({}))
    .pipe(revReplace())
    .pipe(gulp.dest('./online/static'))
);

gulp.task('revAndReplaceApp', ['default'], () =>
    gulp.src(['./dist/app/**/*.*'])
    .pipe(rev())
    .pipe(gulp.dest('./online/app'))
    .pipe(rev.manifest({}))
    .pipe(revReplace())
    .pipe(gulp.dest('./online/app'))
);

gulp.task('replacePage', ['revAndReplaceApp', 'revAndReplaceStatic'], () => {
    const manifest = gulp.src('./online/static/rev-manifest.json');
    const manifestApp = gulp.src('./online/app/rev-manifest.json');
    gulp.src(['./dist/**/*.html'])
        .pipe(revReplace({
            manifest
        }))
        .pipe(revReplace({
            manifest: manifestApp
        }))
        .pipe(gulp.dest('./online'));
});

gulp.task('onlineCP', ['replacePage'], () => {
    gulp.src('./src/static/fonts/**/*.*')
        .pipe(gulp.dest('./online/static/fonts'));
    gulp.src('./src/static/js/**/*.*')
        .pipe(gulp.dest('./online/static/js'));
    gulp.src('./src/static/images/**/*.*')
        .pipe(gulp.dest('./online/static/images'));
    gulp.src('./dist/app/**/*.*')
        .pipe(gulp.dest('./online/app/'));
});



gulp.task('default', ['webpack', 'sass', 'static'], () => {
    if (env === 'production') {
        gulp.start('onlineCP');
    }
});


if (env !== 'production') {
    gulp.watch('src/static/scss/**/*.scss', ['sass']);
    gulp.watch('src/page/**/*.html', ['static']);
    gulp.watch('src/static/js/**/*.*', ['static']);
    gulp.watch('src/static/fonts/**/*.*', ['static']);
    gulp.watch('src/static/images/**/*.*', ['static']);
}