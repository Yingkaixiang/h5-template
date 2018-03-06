const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackRequireHttp = require('webpack-require-http');
const HappyPack = require('happypack');
const os = require('os');

HappyPack.ThreadPool({ size: os.cpus().length });

/**
 * 获取各个页面下的入口文件
 */
const getEntry = (src, arr) => {
  const pagePath = path.resolve(__dirname, src);
  const dirs = fs.readdirSync(pagePath);
  const entry = {};
  const exclude = arr || ['.DS_Store'];
  dirs.forEach((item) => {
    if (!exclude.includes(item)) {
      const files = glob.sync(`${src}${item}/**/*.js`);
      if (files.length > 0) {
        entry[item] = files;
      }
    }
  });
  return entry;
};


module.exports = {
  entry: Object.assign(
    {},
    getEntry('./src/pages/'),
    getEntry('./src/common/js/', ['lib']),
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
        use: 'happypack/loader',
      },
      {
        test: /\.(scss|sass|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          }, {
            loader: 'postcss-loader',
          }, 'fast-sass-loader'],
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
    new HappyPack({
      loaders: [{
        loader: 'babel-loader',
        options: {
          presets: ['env'],
          cacheDirectory: true,
        },
      }],
    }),
  ],
};
