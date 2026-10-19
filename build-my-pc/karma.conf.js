import karmaJasmine from 'karma-jasmine';
import karmaChromeLauncher from 'karma-chrome-launcher';
import karmaWebpack from 'karma-webpack';

export default function(config) {
  config.set({
    basePath: '',

    plugins: [
      karmaJasmine,
      karmaChromeLauncher,
      karmaWebpack
    ],

    frameworks: ['jasmine', 'webpack'],

    // Buscamos tus archivos de pruebas directamente
    files: [
      'src/demo.spec.js',
      'src/**/*.spec.jsx'
    ],

    exclude: [],

    // Le asignamos el procesamiento a Webpack
    preprocessors: {
      'src/demo.spec.js': ['webpack'],
      'src/**/*.spec.jsx': ['webpack']
    },

    // Configuración interna de Webpack para entender React (.jsx)
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      }
    },

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
