/*
 * Base build configuration common to both live and development builds.
 *   references:
 *     * http://webpack.github.io/docs/
 *     * https://github.com/petehunt/webpack-howto
 */


// export the configuration
module.exports = {
    // output: {
    //     libraryTarget: 'commonjs2',
    // },
    // devtool: 'inline-source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel?stage=0',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['', '.js'],
        root: [
            './src/'
        ]
    },
}


// end of file
