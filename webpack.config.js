const path = require('path');

module.exports = config = {
    entry: './index.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'ref-net.js',
        library: 'drawing',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env']
                    }
                }
            }
        ]
    }
};
