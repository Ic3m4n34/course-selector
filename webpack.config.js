const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: process.env.NODE_ENV,
	target: process.env.NODE_ENV === "development" ? "web" : "electron-renderer",
	entry: path.join(__dirname, "./src/app/main.js"),
	output: {
		path: path.join(__dirname, "./dist/app"),
		filename: "[name].js"
	},
	devServer: {
		historyApiFallback: true,
		overlay: {
			warnings: true,
			errors: true
		}
	},
	performance: {
		hints: false
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: [
				"vue-style-loader",
				"css-loader"
			],
		}, {
			test: /\.scss$/,
			use: [
				"vue-style-loader",
				"css-loader",
				"sass-loader"
			],
		}, {
			test: /\.sass$/,
			use: [
				"vue-style-loader",
				"css-loader",
				"sass-loader?indentedSyntax"
			],
		}, {
			test: /\.vue$/,
			loader: "vue-loader",
			options: {
				loaders: {
					"scss": [
						"vue-style-loader",
						"css-loader",
						"sass-loader"
					],
					"sass": [
						"vue-style-loader",
						"css-loader",
						"sass-loader?indentedSyntax"
					]
				}
			}
		}, {
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: "file-loader",
			options: {
				name: "images/[name].[hash:8].[ext]"
			}
		}, {
			test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
			loader: "file-loader",
			options: {
				name: "media/[name].[hash:8].[ext]"
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: "file-loader",
			options: {
				name:"fonts/[name].[hash:8].[ext]"
			}
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: "./index.html",
			template: "./src/index.html",
			inject: true,
			xhtml: true
		})
	],
	resolve: {
		extensions: [".js", ".vue", ".json"],
		alias: {
			"vue$": "vue/dist/vue.esm.js",
			"@": path.join(__dirname, "./src/app")
		}
	}
}
