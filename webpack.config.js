const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = config = {
    mode: 'production',
    entry: {
        'ref-net': './index.js',
        'ref-net.min': './index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'Drawing',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/preset-env' ]
                    }
                }
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [ new UglifyJsPlugin({ include: /\.min\.js$/ }) ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'example'),
        filename: 'ref-net.js',
        compress: true,
        port: 4000
    }
};
