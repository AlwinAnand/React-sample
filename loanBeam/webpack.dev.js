const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
// eslint-disable-next-line import/order
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('development')
          },
        }),
        new BundleAnalyzerPlugin() // Use this to analyze package weight 
      ],
});
