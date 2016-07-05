/**
 * Created by LIJA3 on 7/5/2016.
 */

var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
module.exports = {
    resolve: { extensions: ['', '.js', '.ts'] },
    entry: "./spec-bundle.js",
    output: { path: BUILD_PATH, filename: 'bundle.js' },
    module: { loaders: [ { test: /\.ts$/, loader: 'ts-loader' } ] },
    node: { global: 'window', progress: false, crypto: 'empty', module: false, clearImmediate: false, setImmediate: false }
};