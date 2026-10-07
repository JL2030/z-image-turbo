// Z-Image-Turbo Start Script for Pinokio
// Launches the Gradio app and captures the URL

const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const APP_PATH = __dirname;
const ENV_PATH = path.join(APP_PATH, 'env');
const pythonPath = path.join(ENV_PATH, 'Scripts', 'python.exe');

console.log('=== Z-Image-Turbo Start ===');

// Check if env exists
if (!fs.existsSync(ENV_PATH)) {
  console.error('Virtual environment not found. Please run Install first.');
  process.exit(1);
}

// Launch the app
const app = spawn(pythonPath, [path.join(APP_PATH, 'app', 'app.py')], {
  stdio: ['inherit', 'pipe', 'pipe'],
  env: process.env,
});

// Capture URL from stdout
let url = '';
app.stdout.on('data', (data) => {
  const text = data.toString();
  process.stdout.write(text);
  
  // Look for Gradio URL
  const match = text.match(/http:\/\/(127\.0\.0\.1|localhost):\d+/);
  if (match && !url) {
    url = match[0];
    console.log(`\n[pinokio] App URL: ${url}`);
    // In Pinokio, this would be stored via local.set('url', url)
  }
});

app.stderr.on('data', (data) => {
  process.stderr.write(data);
});

app.on('close', (code) => {
  console.log(`App exited with code ${code}`);
  process.exit(code);
});

// Handle Ctrl+C
process.on('SIGINT', () => {
  app.kill('SIGINT');
});
