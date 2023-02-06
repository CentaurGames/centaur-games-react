const path = require('path');
const SRC = path.resolve(__dirname, 'src/main/js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './src/index.jsx',
   output: {
      path: path.join(__dirname, '/bundle'),
      filename: 'index_bundle.js',
      publicPath: '/public'
   },
   devServer: {
      port: 8001,
      historyApiFallback: true,
   },
   stats: {
      errorDetails: true,
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
               presets: ['@babel/env', '@babel/react']
            },
            resolve: {
               extensions: ['.js', '.jsx'],
            }
         },
         {
            test: /\.m?js/,
            resolve: {
              fullySpecified: false
            }
         },
         {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
              'file-loader',
              {
                loader: 'image-webpack-loader',
                options: {
                  bypassOnDebug: true, // webpack@1.x
                  disable: true, // webpack@2.x and newer
                  outputPath: '../images',
                },
              },
            ],
          },
          {
            test: /\.(ogg|mp3|wav|mpe?g)$/i,
            loader: 'url-loader',
          },
         {
            test: /\.css$/,
            use: ['style-loader','css-loader'],
         },
      ]
   },
   plugins:[
      new HtmlWebpackPlugin({
         template: './index.html',
         favicon: './public/favicon.png',
      })
   ]
}
