const webpack = require('webpack');

module.exports = {
    entry: {
	'tabs': './src/bootstrap-lib/tabs.jsx'
    },
    output: {
        path: 'dist/',
        filename: '[name].js',
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
        }]
    }
}
