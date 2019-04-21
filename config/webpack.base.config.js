const webpack = require("webpack");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const paths = require("./paths");

process.noDeprecation = true;
const nodeEnv = process.env.NODE_ENV || "development";
const isProduction = nodeEnv === "production";

module.exports = {
  entry: paths.entryPath,
  serve: {
    content: paths.entryPath,
    dev: {
      publicPath: paths.outputPath
    },
    open: true
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        loader: "eslint-loader",
        exclude: /(node_modules)/
        // options: {
        //   emitWarning: !isProduction
        // }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader"
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader?hash=sha512&digest=hex&name=[name].[hash].[ext]",
            options: {
              outputPath: paths.imagesPath
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: "65-90",
                speed: 4
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2|ttf|woff|eot|txt)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: paths.fontsPath
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: ["src", "node_modules"],
    extensions: ["*", ".js", ".jsx", ".css", ".scss"]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEV__: !isProduction,
      env: nodeEnv,
      "process.env": {
        NODE_ENV: JSON.stringify(nodeEnv)
      }
    }),
    new DuplicatePackageCheckerPlugin(),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|ru|fi/)
  ]
};
