const fs = require('fs');

const detailsPath = 'src/data/leetcodeDetails.ts';
let detailsContent = fs.readFileSync(detailsPath, 'utf-8');

// Extract the existing object
const match = detailsContent.match(/export const LEETCODE_DETAILS: Record<string, any> = (\{[\s\S]*\});/);
let details = {};
if (match) {
  // We can't easily eval it if it has complex TS, but it's just a JS object.
  // Actually, it's better to just rewrite the file completely from a merged JSON.
}

// Let's just read the JSON chunks and write the TS file.
const chunks = fs.readdirSync(__dirname).filter(f => f.startsWith('chunk') && f.endsWith('.json'));
let merged = {};

for (const chunk of chunks) {
  const data = JSON.parse(fs.readFileSync(chunk, 'utf-8'));
  merged = { ...merged, ...data };
}

let tsContent = `export const LEETCODE_DETAILS: Record<string, { description: string; explanation: string; implementation: string }> = {\n`;
for (const [key, value] of Object.entries(merged)) {
  tsContent += `  ${JSON.stringify(key)}: {\n`;
  tsContent += `    description: ${JSON.stringify(value.description)},\n`;
  tsContent += `    explanation: ${JSON.stringify(value.explanation)},\n`;
  tsContent += `    implementation: ${JSON.stringify(value.implementation)}\n`;
  tsContent += `  },\n`;
}
tsContent += `};\n`;

fs.writeFileSync(detailsPath, tsContent);
console.log('Successfully merged chunks into leetcodeDetails.ts');
