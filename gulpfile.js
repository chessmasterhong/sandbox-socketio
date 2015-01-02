'use strict';

var gulp    = require('gulp'),
    jshint  = require('gulp-jshint'),
    nodemon = require('gulp-nodemon');

gulp.task('lint', function() {
    return gulp.src('./scripts/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(require('jshint-stylish')));
});

gulp.task('default', function() {
    nodemon({
        script: 'server.js',
        watch: ['./public/', './server.js'],
        ext: 'js',
        env: { 'NODE_ENV': 'development' },
        //ignore: ['./build/**'],
        nodeArgs: ['--debug=8081']
    })
    .on('change', ['lint'])
    .on('restart', function() {
        console.log('Server restarted.');
    });
});
