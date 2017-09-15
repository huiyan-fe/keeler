const package = require("./package.json");
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.traceDeprecation = true;

module.exports = {
    entry: {
        'app/index': './src/app/index.jsx',
        'app/vendor': ['react', 'react-dom']
    },
    output: {
        filename: `[name].${package.version}.js`,
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/page/index.html',
            hash: true
        })
    ],
    devServer: {
        contentBase: './dist',
    },
    module: {
        loaders: [{
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
            }
        ]
    }
}
