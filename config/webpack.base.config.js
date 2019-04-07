const webpack = require("webpack");
const paths = require("./paths");

process.noDeprecation = true;

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
        loader: "babel-loader",
        exclude: /(node_modules)/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: paths.imagesPath
            }
          }
        ]
      },
      {
        test: /\.(woff2|ttf|woff|eot)$/,
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
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    })
  ]
};
