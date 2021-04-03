const base = require('./base')
const { merge } = require('webpack-merge')
const Dotenv = require('dotenv-webpack');
const helpers = require('./helpers');

module.exports = merge(base, {
  mode: 'production',
  output: {
    path: helpers.resolveFromRootPath('dist'),
    filename: './js/[name].[chunkhash].js', // También podemos organizar los ficheros por carpetas '/js', '/images'...
    assetModuleFilename: './images/[hash][ext][query]',
  },
  optimization: { // Para los vendors/dependencias externas
    runtimeChunk: 'single', // inicialización de webpack
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          name: 'vendor', // Agrupamos todas las dependencias que se instalen en nuestro node_modules en un fichero unico llamado vendor
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new Dotenv({
      path: 'prod.env', // variables de entorno en prod
    }),
  ],
})
