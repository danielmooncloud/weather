var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var BrotliPlugin = require('brotli-webpack-plugin');
var ExtractMediaQueries = new ExtractTextPlugin("css/media.css");
var ExtractCriticalCSS = new ExtractTextPlugin("css/app.css");
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    context: __dirname + '/app',
    entry: {
        app: './app.js',
        vendor: ['angular', 'angular-route', 'angular-sanitize']
    },
    output: {
        path: __dirname + '/public',
        filename: 'scripts/app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.med.scss/i,
                exclude: /\.crit.scss/,
                loader: ExtractMediaQueries.extract({
                    fallback: "style-loader", 
                    use: "css-loader!resolve-url-loader!sass-loader",
                    publicPath: "images/"
                })
            },
            {
                test: /\.crit.scss/i,
                exclude: /\.med.scss/,
                loader: ExtractCriticalCSS.extract({
                    fallback: "style-loader", 
                    use: "css-loader!resolve-url-loader!sass-loader",
                    publicPath: "images/"
                })
            },
            {
                test: /\.js$/,
                exclude: "/node_modules/",
                loader: ["babel-loader", "eslint-loader"]
            },
            {
                test: /\.(png|jpg)$/,
                loader: "file-loader?outputPath=images/"
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: "scripts/vendor.bundle.js"}),
        new ExtractTextPlugin("css/[name].css"),
        new BrotliPlugin(),
        ExtractMediaQueries,
        ExtractCriticalCSS
    ]
};