const webpack = require('webpack'),
path = require('path'),
MiniCSSExtractPlugin = require('mini-css-extract-plugin'),
HTMLWebpackPlugin = require('html-webpack-plugin');
// My default settings for very simple webpack 
module.exports = {
	context : path.resolve(__dirname,'src'),
	entry: { 
		scripts :'./scripts.js'
	},
	output: {
		filename: 'result-[name].js',
		path: path.resolve(__dirname,'dist')
	},
	resolve : {
		extensions : ['.js','.css']
	},
	plugins : [
	new HTMLWebpackPlugin({
		hash: true,
		template : './index.html',
		minify : false
	}),
	new MiniCSSExtractPlugin({
		filename : 'css/[name].[ContentHash].css',
	}),
	new webpack.HotModuleReplacementPlugin()
	],
	module : {
		rules : [
		{
			test: /\.html$/,
			loader: 'html-loader',
			options: {
				minimize: false
			}
		},
		{
			test: /\.(svg|png|gif|jpeg|jpg|bmp)$/,
			use: {
				loader: "file-loader",
				options: {
					name: "[name].[hash].[ext]",
					outputPath: 'imgs'
				}
			}
		},
		{
			test: /\.scss$/,
			use: [	{
				loader: MiniCSSExtractPlugin.loader,
							// options : {
							// 	publicPath: '/dist/css/',
							// }
						},
						'css-loader',
						'sass-loader'
						]
					}
					]
	},
				devServer : {
					port: 3000,
					contentBase: path.resolve(__dirname,'src'),
					watchContentBase: true,
					hot: true,
				}
};