const path = require('path')

module.exports = {
  entry: './src/main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules'),
    ],
    alias: {
      vue: 'vue/dist/vue.js'
    },
    extensions: ['.js', '.vue'],
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: 'dist',
  },
}
