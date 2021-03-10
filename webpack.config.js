
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: path.resolve(__dirname, "./src/index.js"),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,"dist")
    },
    resolve: {
		// 要解析的文件的扩展名
        extensions: [".js", ".jsx", ".json"],
		// 解析目录时要使用的文件名
        mainFiles: ["index"],
    },
    plugins:[
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, "./public/index.html")
        })
    ],
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
        ]
    },
    devServer:{
        port: 8000
    }
}