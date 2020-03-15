const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    mode: isProduction ? 'production' : 'development',
    devtool: 'inline-source-map',
    entry: './src/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 8000
    },
    optimization: {
        minimize: isProduction,
        minimizer: [
            new TerserPlugin()
        ],
    }
};