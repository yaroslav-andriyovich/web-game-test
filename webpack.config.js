const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/main.ts',
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
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
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
    mode: 'production',
    performance: {
        hints: false,
    },
}