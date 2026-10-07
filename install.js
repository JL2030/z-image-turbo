// Z-Image-Turbo Install Script for Pinokio
// Installs dependencies using uv

const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const APP_PATH = __dirname;
const ENV_PATH = path.join(APP_PATH, 'env');

console.log('=== Z-Image-Turbo Install ===');

// Create virtual environment
if (!fs.existsSync(ENV_PATH)) {
  console.log('Creating virtual environment...');
  execSync(`python -m venv "${ENV_PATH}"`, { stdio: 'inherit' });
}

// Get python path
const pythonPath = path.join(ENV_PATH, 'Scripts', 'python.exe');

// Install PyTorch
console.log('Installing PyTorch...');
execSync(`"${pythonPath}" -m pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121`, { stdio: 'inherit' });

// Install other dependencies using uv
console.log('Installing Python dependencies...');
try {
  execSync(`uv pip install -r "${path.join(APP_PATH, 'app', 'requirements.txt')}" --python "${pythonPath}"`, { stdio: 'inherit' });
} catch (e) {
  // Fallback to pip if uv not available
  execSync(`"${pythonPath}" -m pip install -r "${path.join(APP_PATH, 'app', 'requirements.txt')}"`, { stdio: 'inherit' });
}

console.log('=== Install Complete ===');
console.log('Run "Start" to launch the app.');
