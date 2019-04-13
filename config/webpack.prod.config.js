const merge = require("webpack-merge");
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const paths = require("./paths");
const baseConfig = require("./webpack.base.config");

module.exports = merge(baseConfig, {
  mode: "production",
  entry: paths.entryPath,
  // You should configure your server to disallow access to the Source Map file for normal users!
  // https://webpack.js.org/configuration/devtool/#devtool
  devtool: "source-map",
  output: {
    filename: "[name].[hash].js",
    path: paths.outputPath,
    chunkFilename: "[name].[chunkhash].js",
    publicPath: "/"
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        parallel: true,
        cache: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "initial"
        },
        async: {
          test: /[\\/]node_modules[\\/]/,
          name: "async",
          chunks: "async",
          minChunks: 4
        }
      }
    },
    runtimeChunk: true
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    }),
    new HtmlWebpackPlugin({
      template: paths.templatePath,
      minify: true,
      inject: true
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: "async"
    })
  ]
});
