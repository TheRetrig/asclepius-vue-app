module.exports = {
  configureWebpack: {
    // other webpack options to merge in ...
  },
  // devServer Options don't belong into `configureWebpack`
  devServer: {
    hot: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'https://ceramic.asclepius.xyz',
        pathRewrite: { '^/api': '' },
      },
      '/ipfs': {
        target: 'https://ipfs.asclepius.xyz',
        pathRewrite: { '^/ipfs': '' },
      }, '/ws': {
        target: 'https://ws.asclepius.xyz',
        pathRewrite: { '^/ws': '' },
      },
    },
  },
};