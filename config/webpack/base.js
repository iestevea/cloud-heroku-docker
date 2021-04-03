const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const helpers = require('./helpers');

module.exports = merge(
  {},
  {
    context: helpers.resolveFromRootPath('src'),
    resolve: {
      alias: { // los alias de los imports
        assets: helpers.resolveFromRootPath('src/assets'),
        common: helpers.resolveFromRootPath('src/common'),
        core: helpers.resolveFromRootPath('src/core'),
        layouts: helpers.resolveFromRootPath('src/layouts'),
        pods: helpers.resolveFromRootPath('src/pods'),
        scenes: helpers.resolveFromRootPath('src/scenes'),
        'common-app': helpers.resolveFromRootPath('src/common-app'),
      },
      extensions: ['.js', '.ts', '.tsx'], // Para no tener que indicar las extensiones de los ficheros al importarlos
    },
    entry: {
      app: ['regenerator-runtime/runtime', './index.tsx'], // Punto de entrada
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader', // Loader para Ficheros typescript
        },
        {
          test: /\.(png|jpg|gif|svg)$/, // Loader para imagenes
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html', // index.html punto de entrada en React
        template: 'index.html',
      }),
    ],
  }
);
