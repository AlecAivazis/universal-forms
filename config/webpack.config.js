/**
 * Webpack configuration for source builds.
 */

// webpack imports
var webpack = require('webpack')
// local imports
var project_paths = require('./project_paths')


// default to using development configuration
var devtool = 'source-map'
var plugins = [
    // new webpack.BannerPlugin(
    //     "require('source-map-support').install();",
    //     { raw: true, entryOnly: false }
    // )
]
// if we are in a production environment
if (process.env.NODE_ENV === 'production') {
    // use production configuration instead
    plugins = [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
    ]
    // don't use any devtools
    devtool = ''
}


// export webpack configuration object
module.exports = {
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint',
                include: project_paths.source_dir,
            },
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: project_paths.source_dir,
                query: {
                    stage: 0,
                }
            },
        ],
    },
    resolve: {
        extensions: ['', '.js'],
        root: [project_paths.source_dir],
    },
    eslint: {
        configFile: project_paths.eslint_config,
        failOnError: true,
    },
    output: {
        libraryTarget: 'commonjs2',
    },
    plugins: plugins,
    devtool: devtool,
}
