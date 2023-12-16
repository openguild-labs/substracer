const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@constants': path.resolve(__dirname, 'src/constants/'),
      '@core': path.resolve(__dirname, 'src/core/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
      '@services': path.resolve(__dirname, 'src/services/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@stores': path.resolve(__dirname, 'src/stores/'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@registry': path.resolve(__dirname, 'src/registry'),
    },
    resolve: {
      fallback: { buffer: require.resolve('buffer/') },
    },
  },
};
