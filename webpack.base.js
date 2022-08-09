const path = require("path");

module.exports = {
	entry: {
		main: "./src/entry.tsx"
	},
	output: {
		path: path.resolve(__dirname, "static"),
		filename: "[name].b.js"
	},
	resolve: {
		extensions: [".ts",".tsx",".js",".jsx"]
	},
	optimization: {
		runtimeChunk: "single",
		splitChunks: {
			cacheGroups: {
				fabric_ui: {
					test: /[\\/]node_modules[\\/]@fluentui/,
					name: "fabric_ui",
					chunks: "all"
				},
				vendor: {
					test: /[\\/]node_modules[\\/](?!@fluentui)/,
					name: "vendor",
					chunks: "all"
				}
			}
		}
	},
	plugins: []
};