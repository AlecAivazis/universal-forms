/**
 * Provides a single, consistent place for js files to get
 * relevant paths, globs, etc pertaining to the project structure.
 */

// node imports
var path = require('path')


// project root directory
var rute = path.join(__dirname, '..')
// source directory
var source_dir = path.join(rute, 'src')
// test directory
var test_dir = path.join(rute, 'tests')
// build directory
var build_dir = path.join(rute, 'build')
// configuration directory
var config_dir = path.join(rute, 'config')


// export the project paths|globs object
module.exports = {
    // directories
    root_dir: rute,
    source_dir,
    build_dir,
    test_dir,
    // entry points
    source_entry: path.join(source_dir, 'index.js'),
    test_entry: path.join(test_dir, '**/test_*.js'),
    // configuration files
    eslint_config: path.join(config_dir, 'eslint.json'),
    webpack_config: path.join(config_dir, 'webpack.config.js'),
}
