import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// We'll read the file directly since we're in a script
const animalsFile = fs.readFileSync('src/animals.ts', 'utf8');

// Regex to find animal entries
// looking for: { name: 'Name', emoji: 'X', soundUrl: 'URL', ... }
const regex = /\{ name: '([^']+)', emoji: '[^']+', soundUrl: '([^']+)'/g;

let match;
const downloads = [];

while ((match = regex.exec(animalsFile)) !== null) {
  const name = match[1];
  const url = match[2];
  // Create a clean filename: "Red Fox" -> "red_fox.ogg"
  const filename = name.toLowerCase().replace(/ /g, '_') + '.ogg';
  downloads.push({ name, url, filename });
}

console.log(`Found ${downloads.length} animals to download.`);

if (!fs.existsSync('public/sounds')) {
  fs.mkdirSync('public/sounds', { recursive: true });
}

downloads.forEach(d => {
  const dest = `public/sounds/${d.filename}`;
  // Only download if we don't have it or if it's a placeholder (size check could happen but let's overwrite to be safe with verified URLs)
  // Actually, let's use curl -L to follow redirects
  try {
    console.log(`Downloading ${d.name} from ${d.url}...`);
    execSync(`curl -sL "${d.url}" -o "${dest}"`);
    // Verify it's an Ogg file
    const type = execSync(`file "${dest}"`).toString();
    if (type.includes('Ogg') || type.includes('audio') || type.includes('media')) {
      console.log(`  OK: ${d.filename}`);
    } else {
      console.error(`  ERROR: ${d.filename} is not an audio file!`);
    }
  } catch (e) {
    console.error(`  FAILED: ${d.name}`);
  }
});
