const path = require('path');
const devConfig = require('../webpack.dev.config');

module.exports = async ({ config, mode }) => {
  return { ...config, module: { ...config.module, rules: devConfig.module.rules } };
};
