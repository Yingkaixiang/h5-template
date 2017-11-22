const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * 获取各个页面下的入口文件
 */ 
const getEntry = () => {
  const jsPath = path.resolve(__dirname, './src/pages/');
  const dirs = fs.readdirSync(jsPath);
  const entry = {};
  dirs.forEach((item) => {
    const files = glob.sync(`./src/pages/${item}/**/*.js`);
    if (files.length > 0) {
      entry[item] = files;
    }
  });
  return entry;
};

const entry = Object.assign(getEntry(), {
  flexible: ['./src/assets/js/flexible.js'],
  vendors: [
    './src/assets/js/common.js',
    './src/assets/js/rela.js'
  ]
});

module.exports = {
  entry: entry,
  output: {
    filename: '[name].js',
  },
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
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      Hammer: 'hammerjs'
    }),
    new ExtractTextPlugin('[name].css'),
  ],
}