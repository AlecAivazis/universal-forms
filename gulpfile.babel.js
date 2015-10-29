// gulp imports
import gulp from 'gulp'
import del from 'del'
import webpack from 'webpack-stream'
import named from 'vinyl-named'
import env from 'gulp-env'
import mocha from 'gulp-mocha'
import shell from 'gulp-shell'
// local imports
import projectPaths from './config/projectPaths'

// const  = file => file.history[0].slice(file.base.length, -3)

/**
 * Build entry point.
 */
gulp.task('build', ['clean'], () => {
    return gulp.src([projectPaths.sourceEntry])
               .pipe(named()) // include relative path in filename
               .pipe(webpack(require(projectPaths.webpackConfig)))
               .pipe(gulp.dest(projectPaths.buildDir))
})


/**
 * Watch entry point.
 */
gulp.task('watch', ['clean'], () => {
    const config = {
        ...require(projectPaths.webpackConfig),
        watch: true,
    }

    return gulp.src(projectPaths.sourceEntry)
               .pipe(named()) // include relative path in filename
               .pipe(webpack(config))
               .pipe(gulp.dest(projectPaths.buildDir))
})


/**
 * Build the entry point for production.
 */
gulp.task('build-production', ['clean'], () => {
    // set the environment variable
    env({
        vars: {
            NODE_ENV: 'production',
        },
    })
    // build the client
    return gulp.src(projectPaths.sourceEntry)
               .pipe(named()) // include relative path in filename
               .pipe(webpack(require(projectPaths.webpackConfig)))
               .pipe(gulp.dest(projectPaths.buildDir))
})


/**
 * Remove all ouptut files from previous frontend builds.
 */
gulp.task('clean', () => {
    del.sync(projectPaths.buildDir)
})


/**
 * Run the test suite.
 */
gulp.task('tdd', shell.task('karma start config/karma.conf.js'))


// end of file
