const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(c|sc)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        include: path.join(__dirname, 'src', 'assets'),
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
      {
        test: /\.svg$/,
        use: [
          'babel-loader',
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new Dotenv(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()],
      },
    }),
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true,
    port: process.env.PORT || 3000
  },
};
