const webpack = require('webpack');

module.exports = {
    entry: {
	'input-autosuggest': './src/input-autosuggest.jsx',
	'tabs': './src/tabs.jsx',
	'msg': './src/msg.jsx'
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
