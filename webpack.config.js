const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const prodPlugins = [
    new ExtractTextPlugin("styles.css"),
];

const commonPlugins = [
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: { browsers: ['last 2 versions'] },
        }
    }),
    new HtmlWebpackPlugin({
        filename: 'top.html',
        template: 'tests/top.html',
        hash: true,
    }),
    new HtmlWebpackPlugin({
        filename: 'center.html',
        template: 'tests/center.html',
        hash: true,
    }),
    new HtmlWebpackPlugin({
        filename: 'bottom.html',
        template: 'tests/bottom.html',
        hash: true,
    }),
    new HtmlWebpackPlugin({
        filename: 'misc.html',
        template: 'tests/misc.html',
        hash: true,
    })
];

const commonLoaders = [{
    test: /\.html$/,
    loader: ["html"]
},{
    test: /\.sass$/,
    loader: ["style", "css", "sass", "postcss"]
}, {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel', // 'babel-loader' is also a valid name to reference
}];

const devLoaders = [{
    test: /\.scss$/,
    loaders: ["style", "css", "sass"]
}];

const prodLoaders = [{
    test: /\.sass$/,
    loader: ExtractTextPlugin.extract(["css", "sass", "postcss"])
}];

const plugins = commonPlugins;
const loaders = commonLoaders.concat(devLoaders);

module.exports = {
    context: __dirname,
    entry: "./src/main",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        loaders: loaders,
    },
    resolve: {
        modules: [path.resolve(__dirname, "src"), path.resolve(__dirname, "node_modules")],
        extensions: [".js", ".json"],
    },
    plugins: plugins,
};
