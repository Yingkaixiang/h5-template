const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const MyHtmlWebpackPlugin = require('./myHtmlWebpackPlugin');

const common = require('./webpack.common.js');

const getPages = () => {
  const pages = [];
  const files = glob.sync('./src/pages/**/*.html');
  files.forEach((file) => {
    const dir = path.parse(file).dir.split('/');
    const dirname = dir[dir.length - 1];
    const chunks = ['head', 'vendors', dirname];
    pages.push(new HtmlWebpackPlugin({
      template: file,
      filename: file.replace(/^\.\/src/, '../'),
      chunks,
      chunksSortMode: (chunk1, chunk2) => {
        const order1 = chunks.indexOf(chunk1.names[0]);
        const order2 = chunks.indexOf(chunk2.names[0]);
        return order1 - order2;
      },
    }));
  });
  pages.push(new MyHtmlWebpackPlugin());
  return pages;
};

module.exports = merge(common, {
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, './dist/publics'),
    publicPath: '../../publics',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new CleanWebpackPlugin(['dist']),
    new UglifyjsWebpackPlugin(),
  ].concat(getPages()),
});
