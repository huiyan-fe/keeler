const package = require("./package.json");
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let defaultWebpackEntry = {
    'app/vendor': ['react', 'react-dom', 'babel-polyfill']
};

let defaultHTMLEntry = [];
try {
    keelEntry = require('./keel.entry.webpack.config.json');
    Object.keys(keelEntry).map(key => {
        defaultWebpackEntry[key] = keelEntry[key];
        //
        defaultHTMLEntry.push(
            new HtmlWebpackPlugin({
                filename: `${key.split('/')[0]}.html`,
                template: `src/page/${key}.html`,
                hash: true,
                chunks: [key, 'app/vendor']
            })
        )
    })
} catch (e) {

}

process.traceDeprecation = true;

module.exports = {
    entry: defaultWebpackEntry,
    output: {
        filename: `[name].js`,
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
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
    ].concat(defaultHTMLEntry),
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
                    use: ['css-loader', 'postcss-loader']
                })
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
            }
        ]
    }
}