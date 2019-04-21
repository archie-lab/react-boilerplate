const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const paths = require("./paths");
const baseConfig = require("./webpack.base.config");

module.exports = merge(baseConfig, {
  mode: "development",
  entry: paths.entryPath,
  devtool: "eval-source-map",
  output: {
    filename: "[name].[hash].js",
    path: paths.outputPath,
    chunkFilename: "[name].[chunkhash].js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // enable extracting when you need it in your dev env
          /*{
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development'
            }
          },*/
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: false, // enable when you need it
              modules: false,
              localIdentName: "[path][name]__[local]--[hash:base64:5]"
            }
          },
          "sass-loader"
        ]
      }
    ]
  },
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  },
  devServer: {
    contentBase: paths.outputPath,
    compress: true,
    host: "localhost",
    disableHostCheck: true,
    historyApiFallback: true,
    publicPath: "/",
    lazy: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true"
    },
    port: 3001
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[name][id].css"
    }),
    new HtmlWebpackPlugin({
      template: paths.templatePath,
      minify: false
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: "async"
    }),
    new BundleAnalyzerPlugin()
  ]
});
