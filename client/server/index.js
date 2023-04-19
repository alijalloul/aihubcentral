require('ignore-styles'); // Import 'ignore-styles' module

require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
  ignore: [/(node_modules)/],
});
require('./server.js'); // Import your server file as an ESM module
