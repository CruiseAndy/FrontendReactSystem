// 這邊使用 HtmlWebpackPlugin，將 bundle 好得 <script> 插入到 body
const webpack = require('webpack');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');	// 程式碼壓縮
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
	template: `${__dirname}/src/index.html`,
	filename: 'index.html',
	inject: 'body',
});
// const commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common');

// 檔案起始點從 entry 進入，也可以是多個檔案。output 是放入產生出來的結果的相關參數。
// loaders 則是放欲使用的 loaders，在這邊是使用 babel-loader 將所有 .js（這邊用到正則式）相關檔案轉譯成瀏覽器可以閱讀的 JavaScript。
// devServer 則是 webpack-dev-server 設定。plugins 放置所使用的外掛
module.exports = {
	entry: {
		bundle: `./src/${process.env.npm_config_mode}/${process.env.npm_config_site}/index.js`,
		vendor: ['react', 'react-dom'],
	},
	output: {
		path: `${__dirname}/dist`,
		filename: '[name].js',
		publicPath: '',
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				options: {
					presets: ["@babel/preset-env","@babel/preset-react"],
					plugins: ['@babel/plugin-proposal-object-rest-spread']
				},
			},
			{
				test: /\.(gif|png|jpe?g|svg|webp)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							useRelativePath: process.env.NODE_ENV === "production",
							outputPath: "images/",
						}
					}
				]
			},
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
      },
			{
				test: /\.css/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.scss/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test:/\.json$/,
				loader: 'json-loader'
			},
		],
	},
	devServer: {
		historyApiFallback: true,
		contentBase: './',
		inline: true,
		port: 8008,
		open: true,
		host: "0.0.0.0"
	},
	// for debug
	devtool: 'source-map',
	plugins: [
		HTMLWebpackPluginConfig,
	// 	new CleanWebpackPlugin(['dist']),
	// 	commonsPlugin,
	],
	// watch: true,	//Add a delay before rebuilding once the first file changed.
	watchOptions: {
		aggregateTimeout: 100,
		poll: 1000,
	},
};