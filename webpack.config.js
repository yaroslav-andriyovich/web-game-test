const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/main.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js?$/i,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.ts?$/i,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "./public/")
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './html/template.html'
        }),
    ],
    mode: 'development',
    performance: {
        hints: false,
    }
}