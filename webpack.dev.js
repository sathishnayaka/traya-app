const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    hot: true,
    port: 3000,
    open: true
  },
  plugins: [new ReactRefreshWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [require.resolve('react-refresh/babel')]
          }
        }
      }
    ]
  }
});
