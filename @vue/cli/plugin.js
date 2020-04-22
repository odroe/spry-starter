const generator = require('./lib/generator');

module.exports = (api) => {
  api.registerCommand('heroicons:generator', generator);
};
