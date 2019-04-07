const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const paths = require("./paths");
const baseConfig = require("./webpack.base.config");

module.exports = merge(baseConfig, {
  mode: "production",
  entry: paths.entryPath,
  devtool: "eval-source-map",
  output: {
    filename: "[name].[hash].js",
    path: paths.outputPath,
    chunkFilename: "[name].[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "style-loader",
          // "css-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: false,
              localIdentName: "[path][name]__[local]--[hash:base64:5]"
            }
          },
          "sass-loader"
        ]
      }
    ]
  },
  devServer: {
    contentBase: paths.outputPath,
    compress: true,
    host: "localhost",
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true"
    },
    port: 3010
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
    })
  ]
});
