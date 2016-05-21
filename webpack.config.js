const webpack = require('webpack');

module.exports = {
    entry: {
	test: './src/test.jsx'
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
