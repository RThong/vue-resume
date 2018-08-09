const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HTMLPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpack = require('webpack')

const config = {
	mode: 'production',
	entry: {
    app: path.join(__dirname, '../src/index')
  },
	output: {
		filename: 'bundle.[chunkhash:8].js',
		path: path.join(__dirname, '../dist'),
    // publicPath: 'http://127.0.0.1:8080/'
	},
	module: {
		rules: [
			{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
			{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
      	test: /\.css/,
      	use:[
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resources/[path][name].[hash:8].[ext]'
            }
          }
        ]
      }
		]
	},
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /node_modules/,   // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: 'vendor',  // 打包后的文件名，任意命名
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 10
        },
      }
    },
    // splitChunks: {
    //  chunks: 'all'
    // },
    runtimeChunk: {
      name: 'manifest'
    }
  },
	plugins: [
		new VueLoaderPlugin(),
    new HTMLPlugin({
	    template: path.join(__dirname, '../index.html')
	  }),//html
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css"
    }),
    new CleanWebpackPlugin('./dist/*.*', {
      root: path.join(__dirname, '../'),
      verbose: true,
      dry: false 
    })
	]
}

module.exports = config