/**
 * AGDATA Color Lint Script
 * ==========================
 * Checks for hard-coded hex colors in CSS files under src/
 * (excluding tokens.css where they are allowed).
 * 
 * Run: npm run lint:colors
 * 
 * This script will exit with code 1 if violations are found,
 * making it suitable for pre-commit hooks or CI pipelines.
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src');
const TOKENS_FILE = 'tokens.css';

// Regex to match hex colors: #RGB, #RRGGBB, #RGBA, #RRGGBBAA
const HEX_COLOR_REGEX = /#([0-9a-fA-F]{3,8})\b/g;

// Allowed patterns (CSS functions that might contain hex-like values)
const ALLOWED_PATTERNS = [
  /url\([^)]*\)/g, // URLs
  /content:\s*["'][^"']*["']/g, // Content strings
];

let violations = [];
let filesChecked = 0;

/**
 * Recursively find all CSS files in a directory
 */
function findCssFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Skip node_modules and other build directories
      if (!['node_modules', 'dist', '.angular'].includes(entry.name)) {
        findCssFiles(fullPath, files);
      }
    } else if (entry.isFile() && entry.name.endsWith('.css')) {
      // Skip tokens.css - hex colors are allowed there
      if (entry.name !== TOKENS_FILE) {
        files.push(fullPath);
      }
    }
  }
  
  return files;
}

/**
 * Check a CSS file for hard-coded hex colors
 */
function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const relativePath = path.relative(SRC_DIR, filePath);
  
  let fileViolations = [];
  
  lines.forEach((line, index) => {
    // Skip comment lines
    if (line.trim().startsWith('/*') || line.trim().startsWith('*') || line.trim().startsWith('//')) {
      return;
    }
    
    // Remove allowed patterns from the line before checking
    let cleanLine = line;
    ALLOWED_PATTERNS.forEach(pattern => {
      cleanLine = cleanLine.replace(pattern, '');
    });
    
    // Check for hex colors
    let match;
    while ((match = HEX_COLOR_REGEX.exec(cleanLine)) !== null) {
      fileViolations.push({
        file: relativePath,
        line: index + 1,
        color: match[0],
        context: line.trim().substring(0, 80)
      });
    }
  });
  
  return fileViolations;
}

// Main execution
console.log('🎨 AGDATA Color Lint');
console.log('====================\n');
console.log(`Scanning CSS files in: ${SRC_DIR}\n`);

try {
  const cssFiles = findCssFiles(SRC_DIR);
  filesChecked = cssFiles.length;
  
  for (const file of cssFiles) {
    const fileViolations = checkFile(file);
    violations = violations.concat(fileViolations);
  }
  
  console.log(`Files checked: ${filesChecked}`);
  console.log(`Violations found: ${violations.length}\n`);
  
  if (violations.length > 0) {
    console.log('❌ VIOLATIONS DETECTED\n');
    console.log('The following hard-coded hex colors must be replaced with design tokens:\n');
    
    // Group by file
    const byFile = violations.reduce((acc, v) => {
      if (!acc[v.file]) acc[v.file] = [];
      acc[v.file].push(v);
      return acc;
    }, {});
    
    for (const [file, fileViolations] of Object.entries(byFile)) {
      console.log(`📄 ${file}`);
      fileViolations.forEach(v => {
        console.log(`   Line ${v.line}: ${v.color}`);
        console.log(`   → ${v.context}`);
      });
      console.log('');
    }
    
    console.log('💡 Use tokens from src/styles/tokens.css instead of hex values.');
    console.log('📖 See README-THEMING.md for guidance.\n');
    
    process.exit(1);
  } else {
    console.log('✅ No hard-coded hex colors found. All clear!\n');
    process.exit(0);
  }
  
} catch (error) {
  console.error('Error running color lint:', error.message);
  process.exit(1);
}
