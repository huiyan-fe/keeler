const package = require("./package.json");
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const keelEntry =;
// console.log('@@@@', );

let defaultEntry = {
    'app/vendor': ['react', 'react-dom', 'babel-polyfill']
};
let keelEntry = {};
try {
    keelEntry = require('./keel.entry.webpack.config.json');
    Object.keys(keelEntry).map(key => {
        defaultEntry[key] = keelEntry[key]
    })
} catch (e) {

}

// console.log(defaultEntry)

process.traceDeprecation = true;

module.exports = {
    entry: defaultEntry,
    output: {
        filename: `[name].js`,
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'demo.html',
            template: 'src/page/DEMO/demo.html',
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
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
            }
        ]
    }
}