// Z-Image-Turbo Update Script for Pinokio
// Pulls latest changes from git

const { execSync } = require('child_process');

console.log('=== Z-Image-Turbo Update ===');

try {
  execSync('git pull', { stdio: 'inherit', cwd: __dirname });
  console.log('Updated successfully.');
} catch (e) {
  console.error('Update failed:', e.message);
}

console.log('=== Update Complete ===');
