const package = require("./package.json");
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const os = require('os');
const isWindow = os.platform() == 'win32';

let defaultWebpackEntry = {
    'app/vendor': ['react', 'react-dom', 'babel-polyfill']
};

let defaultHTMLEntry = [];
try {
    keelEntry = require('./keel.entry.webpack.config.json');
    Object.keys(keelEntry).map(key => {
        defaultWebpackEntry[key] = keelEntry[key];
        //
        const keyArr = key.split(isWindow ? '//' : '/').slice(1);
        defaultHTMLEntry.push(
            new HtmlWebpackPlugin({
                filename: `${keyArr[1]}/index.html`,
                template: `src/page/${keyArr.join(isWindow ? '//' : '/')}.html`,
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
                // exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                            loader: 'css-loader',
                            options: { modules: true, localIdentName: '[local]-[hash:base64:5]' }
                        },
                        'postcss-loader',
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader'
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
            }
        ]
    }
}
