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
    SERVER_HOST: 'https://warm-basin-45112.herokuapp.com',
    CLIENT_ID: 2,
    CLIENT_SECRET: 'cOT3cDGSBQm8jLoOvz8Di629lWH88kL54do9oCcf',
    FIXER_API_KEY: 'c757afc523443c0abe5180c9bd42763a',
    FIXER_ENDPOINT: 'http://data.fixer.io/api/latest'
  }
});