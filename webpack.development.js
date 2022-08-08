const { merge } = require("webpack-merge");
const common = require("./webpack.base");
const { resolve } = require("path");

let config = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: resolve(__dirname,"./tsconfig.development.json")
                        }
                    }
                ]
            }
        ]
    },
});

console.log(config);

module.exports = config;