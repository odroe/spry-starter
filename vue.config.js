const path = require('path');

module.exports = {
  publicPath: "/vue-heroicons/",
  outputDir: "docs",
  configureWebpack: {
    resolve: {
      alias: {
        '@bytegem/vue-heroicons': path.resolve(__dirname, 'lib/main.js'),
      }
    }
  },
};
