const path = require('path');

module.exports = {
  outputDir: "docs",
  configureWebpack: {
    resolve: {
      alias: {
        '@bytegem/vue-heroicons': path.resolve(__dirname, 'dist/heroicons.umd.js'),
      }
    }
  },
};
