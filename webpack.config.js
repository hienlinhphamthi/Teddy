const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
      admin: './frontend/static/admin/index.js',
      client: './frontend/static/client/index.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'frontend/static'),
    },
  };