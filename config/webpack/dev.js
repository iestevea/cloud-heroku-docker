const { mergeWithCustomize, customizeObject } = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const base = require('./base');
const helpers = require('./helpers');

// Para poder ver los cambios en la pagina sin tener que refrescarla, y así mantener el estado de redux
// Por lo tanto, esto solo lo necesitamos en desarrollo
const hotReloadingEntries = ['react-hot-loader/patch'];

module.exports = mergeWithCustomize({
  customizeObject: customizeObject({
    entry: 'prepend',
  }),
})(base, {
  mode: 'development',
  devtool: 'inline-source-map', // Ficheros source map para debuggear en dev. *Recordar que los ficheros source map son ficheros mapeados al build index.js de forma que todavia se pueda debuggear
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  entry: {
    app: hotReloadingEntries,
  },
  output: { // El tema de punto de salida sí que va a haber que diferenciarlo entre dev y prod.
    path: helpers.resolveFromRootPath('dist'), // Aquí era la carpeta donde se va a generar este fichero de salida
    filename: '[name].js', // Esto es lo que va a cambiar en prod. Ya que en prod vamos a tener que añadir un hash al final del nombre del fichero, de forma que si hay cambios en la app, el navegador no lo cachee
  },
  devServer: { // webpack-dev-server -> solo para dev
    inline: true,
    host: 'localhost',
    port: 8080,
    stats: 'minimal',
    hot: true,
  },
  plugins: [
    new Dotenv({
      path: 'dev.env',
    }),
  ],
});
