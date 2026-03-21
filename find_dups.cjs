const fs = require('fs');
const content = fs.readFileSync('./src/pages/Tracker.tsx', 'utf-8');
const matches = content.match(/title: "([^"]+)"/g);
const titles = matches.map(m => m.replace('title: "', '').replace('"', ''));
const counts = {};
titles.forEach(t => {
  counts[t] = (counts[t] || 0) + 1;
});
for (const [t, c] of Object.entries(counts)) {
  if (c > 1) {
    console.log(t, c);
  }
}
