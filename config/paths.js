const path = require("path");

module.exports = {
  root: path.resolve(__dirname, ".."),
  outputPath: path.resolve(__dirname, "../", "dist"),
  entryPath: path.resolve(__dirname, "../", "src/index.tsx"),
  templatePath: path.resolve(__dirname, "../", "src/template.html"),
  publicPath: path.resolve(__dirname, "../", "public"),
  imagesPath: path.resolve(__dirname, "../", "public/images"),
  fontsPath: path.resolve(__dirname, "../", "public/fonts"),
  stylesPath: path.resolve(__dirname, "../", "public/styles")
};
