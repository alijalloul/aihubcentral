require('ignore-styles'); // Import 'ignore-styles' module

require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: ['@babel/preset-env', '@babel/preset-react'],
});
require('./server.js'); // Import your server file as an ESM module