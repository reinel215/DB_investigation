var webpack = require('webpack');
var path = require('path')

module.exports = {
  mode: 'development',
  entry : {
    principal: path.resolve(__dirname, 'scripts') +'/react-p/indexPrincipal.js',
    aplicacion: path.resolve(__dirname, 'scripts') + '/react-p/indexAplicacion.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename : '[name].js',
    publicPath: path.resolve(__dirname, 'public')
  },
  devServer: {
    contentBase: '/public'
  },
  module: {
    rules: [{
      use: 'babel-loader',
      test: /\.(js|jsx)$/,
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  target:'electron-renderer'
}
