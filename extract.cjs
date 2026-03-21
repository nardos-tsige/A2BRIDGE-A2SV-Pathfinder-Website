const fs = require('fs');

const tsContent = fs.readFileSync('src/data/leetcodeDetails.ts', 'utf-8');

// Use a simple regex to extract keys, explanations, and implementations
const regex = /"([^"]+)":\s*\{\s*explanation:\s*"([^"]*)",\s*implementation:\s*"([^"]*)"\s*\}/g;
let match;
const extracted = {};

while ((match = regex.exec(tsContent)) !== null) {
  extracted[match[1]] = {
    explanation: match[2],
    implementation: match[3]
  };
}

// Write to extracted.json
fs.writeFileSync('extracted.json', JSON.stringify(extracted, null, 2));
console.log('Extracted', Object.keys(extracted).length, 'problems');
