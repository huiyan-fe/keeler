const package = require("./package.json");
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.traceDeprecation = true;

module.exports = {
    entry: {
        'app/index': './src/app/index.jsx',
        'app/vendor': ['react', 'react-dom', 'babel-polyfill']
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
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['app/vendor'], // Specify the common bundle's name.
            minChunks: Infinity,
        }),
        new ExtractTextPlugin({
            filename: (getPath) => {
                return getPath('static/css/[name].[chunkhash].css').replace('css/js', 'css');
            },
            allChunks: true
        })
    ],
    devServer: {
        contentBase: './dist',
    },
    module: {
        loaders: [{
                test: /\.(jsx|js)$/,
                loader: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?modules', 'sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
            }
        ]
    }
}
