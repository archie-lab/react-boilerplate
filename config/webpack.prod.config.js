const merge = require("webpack-merge");
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const MediaQueryPlugin = require("media-query-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const paths = require("./paths");
const baseConfig = require("./webpack.base.config");

module.exports = merge(baseConfig, {
  mode: "production",
  entry: paths.entryPath,
  // You should configure your server to disallow access to the Source Map file for normal users!
  // https://webpack.js.org/configuration/devtool/#devtool
  devtool: "none", // add source map when you need it
  output: {
    filename: "[name].[hash].js",
    path: paths.outputPath,
    chunkFilename: "[name].[chunkhash].js",
    publicPath: "/"
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserJSPlugin({
        parallel: true,
        cache: true,
        sourceMap: true,
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true
          }
        }
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
        use: [MiniCssExtractPlugin.loader, "css-loader", MediaQueryPlugin.loader, "sass-loader"]
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
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: "async"
    }),
    new WebpackPwaManifest({
      name: "Hello World",
      short_name: "Hello World",
      description: "React Boilerplate Demo",
      theme_color: "#212121",
      background_color: "#212121",
      favicons: [],
      icons: [
        {
          src: paths.faviconPath,
          sizes: [16, 32, 36, 48, 72, 96, 144, 192, 512],
          ios: true
        }
      ]
    }),
    new GenerateSW({
      swDest: "sw.js",
      importWorkboxFrom: "local",
      clientsClaim: true,
      skipWaiting: true
    })
  ]
});
