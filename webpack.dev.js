const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const config = require('./webpack.config');

module.exports = merge(config, {
	mode: 'development',
	bail: false,
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		hot: true,
		host: 'localhost',
		open: true,
		compress: true,
		port: 2018,
		historyApiFallback: true,
		allowedHosts: ['localhost:2018'],
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	plugins: [
		new Dotenv({
			path: './.env',
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
});
