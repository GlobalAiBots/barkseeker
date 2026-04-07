const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const DATA_DIR = path.join(__dirname, '..', 'src', 'data');

const states = [
  { name: "Alabama", slug: "alabama", code: "AL" },
  { name: "Arizona", slug: "arizona", code: "AZ" },
  { name: "Arkansas", slug: "arkansas", code: "AR" },
  { name: "California", slug: "california", code: "CA" },
  { name: "Colorado", slug: "colorado", code: "CO" },
  { name: "Connecticut", slug: "connecticut", code: "CT" },
  { name: "Delaware", slug: "delaware", code: "DE" },
  { name: "Florida", slug: "florida", code: "FL" },
  { name: "Georgia", slug: "georgia", code: "GA" },
  { name: "Hawaii", slug: "hawaii", code: "HI" },
  { name: "Idaho", slug: "idaho", code: "ID" },
  { name: "Illinois", slug: "illinois", code: "IL" },
  { name: "Indiana", slug: "indiana", code: "IN" },
  { name: "Iowa", slug: "iowa", code: "IA" },
  { name: "Kansas", slug: "kansas", code: "KS" },
  { name: "Kentucky", slug: "kentucky", code: "KY" },
  { name: "Louisiana", slug: "louisiana", code: "LA" },
  { name: "Maine", slug: "maine", code: "ME" },
  { name: "Maryland", slug: "maryland", code: "MD" },
  { name: "Massachusetts", slug: "massachusetts", code: "MA" },
  { name: "Michigan", slug: "michigan", code: "MI" },
  { name: "Minnesota", slug: "minnesota", code: "MN" },
  { name: "Mississippi", slug: "mississippi", code: "MS" },
  { name: "Missouri", slug: "missouri", code: "MO" },
  { name: "Montana", slug: "montana", code: "MT" },
  { name: "Nebraska", slug: "nebraska", code: "NE" },
  { name: "Nevada", slug: "nevada", code: "NV" },
  { name: "New Hampshire", slug: "new-hampshire", code: "NH" },
  { name: "New Jersey", slug: "new-jersey", code: "NJ" },
  { name: "New Mexico", slug: "new-mexico", code: "NM" },
  { name: "New York", slug: "new-york", code: "NY" },
  { name: "North Carolina", slug: "north-carolina", code: "NC" },
  { name: "North Dakota", slug: "north-dakota", code: "ND" },
  { name: "Ohio", slug: "ohio", code: "OH" },
  { name: "Oklahoma", slug: "oklahoma", code: "OK" },
  { name: "Oregon", slug: "oregon", code: "OR" },
  { name: "Pennsylvania", slug: "pennsylvania", code: "PA" },
  { name: "South Carolina", slug: "south-carolina", code: "SC" },
  { name: "South Dakota", slug: "south-dakota", code: "SD" },
  { name: "Tennessee", slug: "tennessee", code: "TN" },
  { name: "Texas", slug: "texas", code: "TX" },
  { name: "Utah", slug: "utah", code: "UT" },
  { name: "Virginia", slug: "virginia", code: "VA" },
  { name: "Washington", slug: "washington", code: "WA" },
  { name: "West Virginia", slug: "west-virginia", code: "WV" },
  { name: "Wyoming", slug: "wyoming", code: "WY" },
];

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function fetchOverpass(query) {
  return new Promise((resolve, reject) => {
    const postData = `data=${encodeURIComponent(query)}`;
    const options = {
      hostname: 'overpass-api.de',
      port: 443,
      path: '/api/interpreter',
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(postData) },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try { resolve(JSON.parse(data)); } catch(e) { reject(new Error('JSON parse error')); }
        } else if (res.statusCode === 429 || res.statusCode === 504) {
          reject(new Error(`Rate limited: ${res.statusCode}`));
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(90000, () => { req.destroy(); reject(new Error('Timeout')); });
    req.write(postData);
    req.end();
  });
}

async function scrapeState(state) {
  const query = `[out:json][timeout:60];
area["name"="${state.name}"]["admin_level"="4"]->.state;
(
  nwr["leisure"="dog_park"](area.state);
  nwr["name"~"[Dd]og [Pp]ark"](area.state);
  nwr["name"~"[Bb]ark [Pp]ark"](area.state);
  nwr["name"~"[Oo]ff.?[Ll]eash"](area.state);
);
out center;`;

  const result = await fetchOverpass(query);
  const parks = [];
  for (const el of (result.elements || [])) {
    const name = (el.tags && el.tags.name) || '';
    if (!name || name === 'dog_park' || name.trim().length < 3) continue;
    const lat = el.lat || (el.center && el.center.lat);
    const lon = el.lon || (el.center && el.center.lon);
    if (!lat || !lon) continue;
    parks.push({
      place_id: `osm_${el.id}`,
      name,
      formatted_address: `, ${state.name}, USA`,
      latitude: lat,
      longitude: lon,
      city: '',
      county: '',
      rating: null,
      total_ratings: 0,
      types: ['leisure_dog_park'],
      business_status: 'OPERATIONAL',
      tags: el.tags || {},
    });
  }
  return parks;
}

function mergeParks(existing, newParks) {
  const existingIds = new Set(existing.map(p => p.place_id));
  let added = 0;
  for (const np of newParks) {
    if (existingIds.has(np.place_id)) continue;
    const tooClose = existing.some(ep => haversineDistance(ep.latitude, ep.longitude, np.latitude, np.longitude) < 100);
    if (tooClose) continue;
    existing.push(np);
    existingIds.add(np.place_id);
    added++;
  }
  return added;
}

async function main() {
  const summary = [];
  let totalOld = 0, totalNew = 0;

  for (let i = 0; i < states.length; i++) {
    const state = states[i];
    const filePath = path.join(DATA_DIR, `${state.slug}-parks.json`);
    let existing = [];
    try { existing = JSON.parse(fs.readFileSync(filePath, 'utf8')); } catch(e) {}
    const oldCount = existing.length;

    process.stdout.write(`[${i+1}/${states.length}] ${state.name.padEnd(20)} (${oldCount} existing) ... `);

    let scraped = [];
    try {
      scraped = await scrapeState(state);
      process.stdout.write(`${scraped.length} from OSM ... `);
    } catch(e) {
      process.stdout.write(`FAILED (${e.message}) ... `);
    }

    const added = mergeParks(existing, scraped);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf8');

    const newCount = existing.length;
    console.log(`+${added} = ${newCount} total`);
    summary.push({ state: state.name, slug: state.slug, old: oldCount, new: newCount, added });
    totalOld += oldCount;
    totalNew += newCount;

    if (i < states.length - 1) await sleep(5000);
  }

  console.log('\n=== SUMMARY ===');
  summary.filter(s => s.added > 0).forEach(s => console.log(`${s.state.padEnd(20)} ${s.old} -> ${s.new} (+${s.added})`));
  console.log(`\nTOTAL: ${totalOld} -> ${totalNew} (+${totalNew - totalOld})`);
}

main().catch(console.error);
