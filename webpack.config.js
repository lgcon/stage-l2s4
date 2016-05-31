const webpack = require('webpack');

module.exports = {
    entry: {
	'tabs': './src/tabs.jsx'
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
