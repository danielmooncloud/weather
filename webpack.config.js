var webpack = require('webpack'),
       path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname + '/app',
    entry: {
        app: './app.js',
        vendor: ['angular', 'angular-route', 'angular-sanitize']  
    },
    output: {
        path: __dirname + '/public',
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.scss?/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader", 
                    use: "css-loader!resolve-url-loader!sass-loader?sourceMap",
                    publicPath: "images/"
                })
            },
            {
                test: /\.js$/,
                exclude: "/node_modules/",
                loader: ["babel-loader"]
            },
            {
                test: /\.png$/,
                loader: "file-loader?outputPath=images/"
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: "vendor.bundle.js"}),
        new ExtractTextPlugin("[name].css")
    ]
};