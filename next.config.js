const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');
const withLess = require('@zeit/next-less');

module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  webpack: config => {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
    config.plugins = config.plugins || []

    config.plugins = [
      ...config.plugins
    ]

    return config;
  },
  env: {
    SERVER_HOST: 'https://secure-depths-00768.herokuapp.com',
    CLIENT_ID: 2,
    CLIENT_SECRET: 'cOT3cDGSBQm8jLoOvz8Di629lWH88kL54do9oCcf'
  }
});