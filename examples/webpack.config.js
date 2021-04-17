const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    // mode:"production",
    entry: {
        generic: "./src/generic.ts",
        "life-game": "./src/life-game.ts",
        "engine-test": "./src/engine-test.ts",
        "fbx-loader": "./src/fbx-loader.ts",
        "tilemap": "./src/tilemap.ts",
        "snake": "./src/snake/index.ts",
        "particle": "./src/particle.ts",
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
    devServer: {
        contentBase: "./dist",
        writeToDisk: true,
        open: false,
        host: "0.0.0.0",
    },
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
                test: /\.css$/i,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.glsl$/i,
                use: [
                    {
                        loader: 'raw-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'static/img'
                },
            },
            {
                test: /\.(fbx|obj)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'static/model'
                },
            },
        ]
    },
    plugins: ["generic", "life-game", "engine-test", "fbx-loader", "tilemap", "snake", "particle"].map(chunk => new HtmlWebpackPlugin({
        filename: `${chunk}.html`,
        template: "html/base.html",
        inject: true,
        minify: false,
        chunks: [chunk],
    }))
};
