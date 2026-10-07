// Z-Image-Turbo Reset Script for Pinokio
// Deletes the virtual environment for a fresh reinstall

const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const APP_PATH = __dirname;
const ENV_PATH = path.join(APP_PATH, 'env');

console.log('=== Z-Image-Turbo Reset ===');

if (fs.existsSync(ENV_PATH)) {
  console.log('Deleting virtual environment...');
  execSync(`rm -rf "${ENV_PATH}"`, { stdio: 'inherit' });
  console.log('Virtual environment deleted.');
} else {
  console.log('No virtual environment found.');
}

console.log('=== Reset Complete ===');
console.log('Run "Install" to reinstall.');
