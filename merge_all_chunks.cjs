const fs = require('fs');

const leetcodeDetailsPath = './src/data/leetcodeDetails.ts';
let content = fs.readFileSync(leetcodeDetailsPath, 'utf-8');

const chunk2 = JSON.parse(fs.readFileSync('chunk2.json', 'utf-8'));
const chunk3 = JSON.parse(fs.readFileSync('chunk3.json', 'utf-8'));
const chunk4 = JSON.parse(fs.readFileSync('chunk4.json', 'utf-8'));

const allNewProblems = { ...chunk2, ...chunk3, ...chunk4 };

// Find the last closing brace of the LEETCODE_DETAILS object
const lastBraceIndex = content.lastIndexOf('};');

if (lastBraceIndex !== -1) {
  let newContent = content.substring(0, lastBraceIndex);
  
  // Check if we need a comma
  if (!newContent.trim().endsWith(',')) {
    newContent += ',\n';
  }

  for (const [title, details] of Object.entries(allNewProblems)) {
    newContent += `  "${title}": {\n`;
    newContent += `    explanation: ${JSON.stringify(details.explanation)},\n`;
    newContent += `    implementation: ${JSON.stringify(details.implementation)}\n`;
    newContent += `  },\n`;
  }

  // Remove trailing comma if any
  newContent = newContent.replace(/,\n$/, '\n');
  newContent += '};\n';

  fs.writeFileSync(leetcodeDetailsPath, newContent);
  console.log(`Successfully merged ${Object.keys(allNewProblems).length} problems into leetcodeDetails.ts`);
} else {
  console.error('Could not find the end of LEETCODE_DETAILS object.');
}
