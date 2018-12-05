const path = require("path");

module.exports = function (env, args) {
	return {
		mode: "development",
		entry: path.join(__dirname, "./index.js"),
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					loader: "babel-loader"
				},
				{
					test: /\.(css)$/,
					loaders: ["style-loader", "css-loader"]
				}
			]
		},
		devtool: "source-map",
		target: "web",
		resolve: {
			extensions: [".js", ".jsx", ".css"]
		},
		output: {
			path: __dirname + "/dist",
			filename: "bundle.js"
		},
		devServer: {
			publicPath: "/dist/",
			port: 8080
		}
	};
};
