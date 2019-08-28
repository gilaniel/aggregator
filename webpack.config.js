const path = require('path');

const pathModules = path.resolve(__dirname);

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname),
	entry: {
		content_scripts: './src/index.js',
		popup: './src/popup'
	},
	output: {
		path: path.resolve(__dirname, './build/'),
		filename: '[name].js',
		chunkFilename: '[name].js'
	},
	watch: true,
	resolve: {
		modules: [pathModules,'node_modules'],
	},  
	module: {
		rules: [
			{
				test: /\.js?$/,
				use: {
					loader: 'babel-loader'
				}
			},
			{ 
				test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      }
		]
	},
	mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: 4,
        terserOptions: {
          drop_console: true,
          drop_debugger: true,
          module: true,
          mangle: true,
          passes: 2, // or higher,
          toplevel: true
        },
      }),
    ],
  },
	plugins: [
    new MiniCssExtractPlugin()
  ],
  // optimization: {
  //   splitChunks: {
  //     chunks: 'async',
  //     minSize: 30000,
  //     maxSize: 0,
  //     minChunks: 1,
  //     maxAsyncRequests: 5,
  //     maxInitialRequests: 3,
  //     automaticNameDelimiter: '~',
  //     name: true,
  //     cacheGroups: {
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true
  //       }
  //     }
  //   }
	// },
	// devtool: 'source-map'
};
