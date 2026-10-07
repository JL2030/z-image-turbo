// Z-Image-Turbo Pinokio Integration
// Main entry point for Pinokio

const path = require('path');
const fs = require('fs');

const APP_PATH = __dirname;

console.log('=== Z-Image-Turbo for Pinokio ===');

// Check if installed
const envPath = path.join(APP_PATH, 'env');
if (!fs.existsSync(envPath)) {
  console.log('Not installed. Running install...');
  require('./install.js');
} else {
  console.log('Already installed. Starting...');
  require('./start.js');
}
