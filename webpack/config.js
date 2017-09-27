module.exports = {
  entry: './src/index.js',
  output: {
    filename: './lib/react-axiom.js',
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
  externals: [
    'react'
  ]
};
