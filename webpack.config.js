const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack        = require('webpack');
const path           = require('path');
const commonConfig = {
  mode: 'production',
  entry  : './src/index.ts',
  node: {
    fs: 'empty'

  },
  output : {
    filename     : 'index.js',
    path         : __dirname + '/dist/browser',
    libraryTarget: 'umd'
  },
  module : {
    rules: [
      {
        test   : /\.tsx?$/,
        loader : 'ts-loader',
        options: {
          transpileOnly: true
        },
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias     : {
      'sodium-native': 'empty-module',
      'sodium': 'empty-module',
      'crypto': 'empty-module',
      './utils/sha256': path.resolve(__dirname, 'src/browser/sha256.ts'),
      '../utils/sha256': path.resolve(__dirname, 'src/browser/sha256.ts'),
      '../../src/utils/sha256': path.resolve(__dirname, 'src/browser/sha256.ts'),
			'./sha256': path.resolve(__dirname, 'src/browser/sha256.ts')
    }
  },
  plugins: [
    new UglifyJSPlugin({})
  ]
};
module.exports     = [
  commonConfig
  // Object.assign({}, commonConfig, { output: Object.assign({}, commonConfig.output, { path: commonConfig.output.path + '/browser' }) }),
];
