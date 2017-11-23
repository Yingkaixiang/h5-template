const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackRequireHttp = require('webpack-require-http');

/**
 * 获取各个页面下的入口文件
 */
const getEntry = (src) => {
  const pagePath = path.resolve(__dirname, src);
  const dirs = fs.readdirSync(pagePath);
  const entry = {};
  dirs.forEach((item) => {
    const files = glob.sync(`${src}${item}/**/*.js`);
    if (files.length > 0) {
      entry[item] = files;
    }
  });
  return entry;
};


module.exports = {
  entry: Object.assign(
    getEntry('./src/pages/'),
    getEntry('./src/common/js/'),
  ),
  output: {
    filename: '[name].js',
  },
  externals: [
    WebpackRequireHttp,
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'url-loader?limit=5120',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      Hammer: 'hammerjs',
    }),
    new ExtractTextPlugin('[name].css'),
  ],
};
