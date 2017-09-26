module.exports = {
  entry: './index.js',
  output: {
    path: 'lib',
    filename: 'react-axiom.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  externals: {
    react: 'react'
  }
};
