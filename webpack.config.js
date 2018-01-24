'use strict';

const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: '#cheap-module-source-map',
  entry: {
    app: ['babel-polyfill', './main.js'],
    styles: './assets/scss/app.scss'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './public/assets')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ['es2015', 'stage-0']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!resolve-url-loader!sass-loader?sourceMap')
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      'components'
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css', {
      allChunks: true
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 9000,
    publicPath: '/assets'
  }
}
