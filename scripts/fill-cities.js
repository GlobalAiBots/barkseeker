const fs = require('fs');
const path = require('path');
const https = require('https');
const DATA_DIR = path.join(__dirname, '..', 'src', 'data');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function reverseGeocode(lat, lon) {
  return new Promise((resolve, reject) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=10`;
    https.get(url, { headers: { 'User-Agent': 'BarkSeeker/1.0 (hello@barkseeker.com)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const j = JSON.parse(data);
            const addr = j.address || {};
            const city = addr.city || addr.town || addr.village || addr.hamlet || addr.county || '';
            resolve(city);
          } catch(e) { resolve(''); }
        } else { resolve(''); }
      });
    }).on('error', () => resolve(''));
  });
}

async function processFile(filename) {
  const fp = path.join(DATA_DIR, filename);
  const parks = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const state = filename.replace('-parks.json', '');
  const needCity = parks.filter(p => !p.city || p.city.trim() === '');

  if (needCity.length === 0) {
    console.log(`${state.padEnd(20)} — all ${parks.length} parks have city data`);
    return 0;
  }

  let filled = 0;
  process.stdout.write(`${state.padEnd(20)} — ${needCity.length}/${parks.length} need city... `);

  for (let i = 0; i < needCity.length; i++) {
    const p = needCity[i];
    try {
      const city = await reverseGeocode(p.latitude, p.longitude);
      if (city) { p.city = city; filled++; }
    } catch(e) {}

    // Rate limit: 1 request per second
    if (i < needCity.length - 1) await sleep(1100);

    // Progress every 50 parks
    if ((i + 1) % 50 === 0) process.stdout.write(`${i+1}...`);
  }

  // Save after each state
  fs.writeFileSync(fp, JSON.stringify(parks, null, 2), 'utf8');
  console.log(`filled ${filled}/${needCity.length}`);
  return filled;
}

async function main() {
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('-parks.json'));

  // Sort by number of missing cities (smallest first for quick wins)
  const sorted = files.map(f => {
    const parks = JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), 'utf8'));
    const missing = parks.filter(p => !p.city || p.city.trim() === '').length;
    return { file: f, missing };
  }).filter(x => x.missing > 0).sort((a, b) => a.missing - b.missing);

  console.log(`Processing ${sorted.length} state files with missing city data...\n`);

  let totalFilled = 0;
  for (const { file } of sorted) {
    totalFilled += await processFile(file);
  }

  console.log(`\nDone! Filled ${totalFilled} cities total.`);
}

main().catch(console.error);
