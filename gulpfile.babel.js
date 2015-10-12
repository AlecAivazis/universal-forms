// gulp imports
import gulp from 'gulp'
import del from 'del'
import webpack from 'webpack-stream'
import named from 'vinyl-named'
import env from 'gulp-env'
import mocha from 'gulp-mocha'
import shell from 'gulp-shell'
// local imports
import project_paths from './config/project_paths'

// const  = file => file.history[0].slice(file.base.length, -3)

/**
 * Build entry point.
 */
gulp.task('build', ['clean'], () => {
    return gulp.src([project_paths.source_entry])
               .pipe(named()) // include relative path in filename
               .pipe(webpack(require(project_paths.webpack_config)))
               .pipe(gulp.dest(project_paths.build_dir))
})


/**
 * Watch entry point.
 */
gulp.task('watch', ['clean'], () => {
    const config = {
        ...require(project_paths.webpack_config),
        watch: true,
    }

    return gulp.src(project_paths.source_entry)
               .pipe(named()) // include relative path in filename
               .pipe(webpack(config))
               .pipe(gulp.dest(project_paths.build_dir))
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
    return gulp.src(project_paths.source_entry)
               .pipe(named()) // include relative path in filename
               .pipe(webpack(require(project_paths.webpack_config)))
               .pipe(gulp.dest(project_paths.build_dir))
})


/**
 * Remove all ouptut files from previous frontend builds.
 */
gulp.task('clean', () => {
    del.sync(project_paths.build_dir)
})


/**
 * Run the test suite.
 */
gulp.task('tdd', shell.task('karma start config/karma.conf.js'))


// end of file
