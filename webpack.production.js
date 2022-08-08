const common = require("./webpack.base");
const { merge } = require("webpack-merge");
const { resolve } = require("path");

let config = merge(common, {
    mode: "production",
    optimization: {
        minimize: false,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: resolve(__dirname, "./tsconfig.base.json")
                        }
                    }
                ]
            }
        ]
    },
});

console.log(config);

module.exports = config;