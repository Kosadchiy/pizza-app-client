require('dotenv').config();
const withLess = require('@zeit/next-less');

const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  webpack: config => {
    config.plugins = config.plugins || []

    config.plugins = [
      ...config.plugins,

      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ]

    return config;
  }
});