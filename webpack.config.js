const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeTagsPlugin = require('./html-webpack-exclude-tags-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('./html-webpack-exclude-assets-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    // minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
          output: {
            comments: true
          },
          sourceMap: true,
        },
        // cache: true,
        // parallel: true,
      }),
    ]
  },
  entry: {
    main: './src/js/index.js',
    styles: './src/css/main.css',
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'src/img', to: 'img' },
        { from: 'src/favicon', to: 'favicon' },
      ],
    }),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new OptimizeCssAssetsPlugin(),
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new HtmlWebpackExcludeTagsPlugin(),
    new HtmlWebpackExcludeAssetsPlugin({ entry: 'styles', ext: 'js' }),
    new webpack.LoaderOptionsPlugin({
      options: {
        // devtool: 'source-map',
        // postcss: [
        //   require('autoprefixer')({
        //     browsers: ['last 2 versions'],
        //   }),
        // ],
      },
      // minimize: true,
      // debug: false,
    }),
  ],
};
