const package = require("./package.json");
const path = require('path');

process.traceDeprecation = true;

module.exports = {
    entry: {
        'app/index': './app/index.jsx',
        'app/vendor': ['react', 'react-dom']
    },
    output: {
        filename: `[name].${package.version}.js`,
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        contentBase: './dist'
    },
    module: {
        loaders: [{
            test: /\.jsx$/,
            loader: 'babel-loader'
        }]
    }
}