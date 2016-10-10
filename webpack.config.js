const webpack = require('webpack');
const path = require('path');

const prod = process.env.npm_lifecycle_event === 'dist';
const dev = process.env.npm_lifecycle_event === 'build' || process.env.npm_lifecycle_event === 'live';

const prodPlugins = [
    new webpack.optimize.DedupePlugin(), //garante que nao existam copias de um mesmo modulo.
    new webpack.optimize.OccurrenceOrderPlugin(), //faz com que modulos mais utilizados recebam os menores ids. Segundo documentacao isso resulta em mais performance (runtime) e menor tamanho de arquivo dist
    new webpack.optimize.UglifyJsPlugin(), //minifier e uglyfier
];

const commonPlugins = [];

const plugins = prod ? commonPlugins.concat(prodPlugins) : commonPlugins;

const loaders = [{
    test: /\.html$/,
    loader: ["html"]
}, {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel', // 'babel-loader' is also a valid name to reference
}];

module.exports = {
    context: __dirname,
    entry: "./src/main",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "liquid-element.min.js"
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
