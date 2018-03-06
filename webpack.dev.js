const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  output: {
    publicPath: '/publics/',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './src'),
    inline: true,
    host: '0.0.0.0'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new ExtractTextPlugin('[name].css'),
  ],
});
