// gulp imports
var gulp = require('gulp')
var mocha = require('gulp-mocha')

// the project paths
const project_dirs = {
    source: './src/',
    test: './tests/'
}


/**
 * Run the test suite.
 */
gulp.task('test', function() {
    gulp.src(project_dirs.test + '**/test_*.js', {read: false})

        .pipe(mocha({require: ['chai']}))
})


// end of file
