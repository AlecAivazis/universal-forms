// gulp imports
var gulp = require('gulp')
var mocha = require('gulp-mocha')


/**
 * Run the test suite.
 */
gulp.task('test', function() {
    gulp.src('tests/**/*.js', {read: false})
        .pipe(mocha({require: ['chai']}))
})


// end of file
