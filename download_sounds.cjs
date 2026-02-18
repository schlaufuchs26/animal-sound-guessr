const fs = require('fs');
const { execSync } = require('child_process');

// Read animals file
const animalsFile = fs.readFileSync('src/animals.ts', 'utf8');
const regex = /\{ name: '([^']+)', emoji: '[^']+', soundUrl: '([^']+)'/g;

let match;
const downloads = [];

while ((match = regex.exec(animalsFile)) !== null) {
  const name = match[1];
  const url = match[2];
  const filename = name.toLowerCase().replace(/ /g, '_') + '.ogg';
  downloads.push({ name, url, filename });
}

console.log(`Found ${downloads.length} animals to download.`);

if (!fs.existsSync('public/sounds')) {
  fs.mkdirSync('public/sounds', { recursive: true });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function downloadAll() {
  for (const d of downloads) {
    const dest = `public/sounds/${d.filename}`;
    
    // Check if file already exists and is valid size (>1KB)
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
        console.log(`Skipping ${d.name} (already exists)`);
        continue;
    }

    console.log(`Downloading ${d.name}...`);
    
    // Use User-Agent and retry logic
    let attempts = 0;
    let success = false;
    
    while (attempts < 3 && !success) {
      try {
        // Wikimedia requires a User-Agent
        execSync(`curl -sL -A "AnimalSoundGuessrBot/1.0 (https://github.com/schlaufuchs26/animal-sound-guessr; schlaufuchs@agentmail.to)" "${d.url}" -o "${dest}"`);
        
        // Simple validation check (size > 1KB)
        if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
           console.log(`  OK: ${d.filename}`);
           success = true;
        } else {
           console.log(`  Failed (empty/small file), retrying...`);
           attempts++;
           await sleep(5000); // Wait longer on retry
        }
      } catch (e) {
        console.error(`  Error downloading ${d.name}: ${e.message}`);
        attempts++;
        await sleep(5000);
      }
    }
    
    if (!success) {
        console.error(`  Gave up on ${d.name}`);
    }

    // Be nice to the server
    await sleep(60000);
  }
}

downloadAll();
