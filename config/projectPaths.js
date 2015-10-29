/**
 * Provides a single, consistent place for js files to get
 * relevant paths, globs, etc pertaining to the project structure.
 */

// node imports
var path = require('path')


// project root directory
var rute = path.join(__dirname, '..')
// source directory
var sourceDir = path.join(rute, 'src')
// test directory
var testDir = path.join(rute, 'tests')
// build directory
var buildDir = path.join(rute, 'build')
// configuration directory
var configDir = path.join(rute, 'config')


// export the project paths|globs object
module.exports = {
    // directories
    rootDir: rute,
    sourceDir,
    buildDir,
    testDir,
    // entry points
    sourceEntry: path.join(sourceDir, 'index.js'),
    testEntry: path.join(testDir, '**/test_*.js'),
    // configuration files
    eslintConfig: path.join(configDir, 'eslint.json'),
    webpackConfig: path.join(configDir, 'webpack.config.js'),
}
