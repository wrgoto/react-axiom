const webpack = require('webpack');


module.exports = {
  entry: './src/index.js',
  output: {
    path: 'lib',
    filename: 'react-axiom.min.js',
    library: 'react-axiom',
    libraryTarget: 'umd',
    umdNamedDefine: true
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
