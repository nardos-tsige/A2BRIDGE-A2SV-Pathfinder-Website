const fs = require('fs');

const trackerContent = fs.readFileSync('src/pages/Tracker.tsx', 'utf-8');
const detailsContent = fs.readFileSync('src/data/leetcodeDetails.ts', 'utf-8');

const trackerMatches = [...trackerContent.matchAll(/title:\s*"([^"]+)"/g)].map(m => m[1]);
const detailsMatches = [...detailsContent.matchAll(/"([^"]+)":\s*\{/g)].map(m => m[1]);

const missing = trackerMatches.filter(t => !detailsMatches.includes(t));
console.log("Total in Tracker:", trackerMatches.length);
console.log("Total in Details:", detailsMatches.length);
console.log("Missing:", missing.length);
console.log(missing.join('\n'));
