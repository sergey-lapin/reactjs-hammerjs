/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpak-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */

'use strict';
var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
    output: {
        path: "./dist/dev/scripts",
        filename: "[name].js",
        chunkFilename: "[id].chunk.js"
    },

    entry: {
        reacthammer: "./scripts/main.js",
        example: "./scripts/example.jsx",
        vendor: "./scripts/vendor.js"
    },

    plugins: [
        new CommonsChunkPlugin("vendor.js", ['vendor', 'example'])
    ],

    cache: true,
    debug: true,
    devtool: false,
    context: __dirname + '/src',

    stats: {
        colors: true,
        reasons: true
    },

    resolve: {
        // Allow to omit extensions when requiring these files
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ["./node_modules", "./bower_components", "./libs"],
        packageFiles: ['package.json', 'bower.json', '.bower.json']
    },

    module: {
        preLoaders: [
            {
                test: '\\.js$',
                exclude: 'node_modules',
                loader: 'jshint'
            }
        ],

        loaders: [
            {
                test: /\.jsx$/,
                loader: 'jsx' },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.gif/,
                loader: 'url-loader?limit=10000&minetype=image/gif'
            },
            {
                test: /\.jpg/,
                loader: 'url-loader?limit=10000&minetype=image/jpg'
            },
            {
                test: /\.png/,
                loader: 'url-loader?limit=10000&minetype=image/png'
            },
            {
                test: /\.jsx$/,
                loader: 'jsx-loader'
            },
            { test: /\.woff$/, loader: "url-loader?prefix=font/&limit=5000" },
            { test: /\.eot$/, loader: "file-loader?prefix=font/" },
            { test: /\.ttf$/, loader: "file-loader?prefix=font/" },
            { test: /\.svg$/, loader: "file-loader?prefix=font/" }
        ]
    }
}
;