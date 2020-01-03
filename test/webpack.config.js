const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    // mode:"production",
    entry: {
        generic: "./src/generic.ts",
    },
    output: {
        path: path.resolve("./dist"),
        filename: "js/[name].js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
    },
    devtool: "source-map",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            attrs: ["img:src", "link:href"]
                        }
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.jpe?g|\.png|\.webp/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "img/[name].[hash:7].[ext]",
                            limit: 10000,
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "generic.html",
            template: "html/base.html",
            inject: true,
            minify: false,
            chunks: ["generic"],
        }),
    ]
};
