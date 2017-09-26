const webpack = require('webpack');


module.exports = {
  entry: './index.js',
  output: {
    path: 'lib',
    filename: 'react-axiom.min.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ],
  externals: [
    'react'
  ]
};
