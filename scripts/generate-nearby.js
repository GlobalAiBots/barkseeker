const fs = require("fs");
const path = require("path");

function haversine(lat1, lon1, lat2, lon2) {
  const R = 3959;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
const STATE_SLUGS = {AL:"alabama",AK:"alaska",AZ:"arizona",AR:"arkansas",CA:"california",CO:"colorado",CT:"connecticut",DE:"delaware",FL:"florida",GA:"georgia",HI:"hawaii",ID:"idaho",IL:"illinois",IN:"indiana",IA:"iowa",KS:"kansas",KY:"kentucky",LA:"louisiana",ME:"maine",MD:"maryland",MA:"massachusetts",MI:"michigan",MN:"minnesota",MS:"mississippi",MO:"missouri",MT:"montana",NE:"nebraska",NV:"nevada",NH:"new-hampshire",NJ:"new-jersey",NM:"new-mexico",NY:"new-york",NC:"north-carolina",ND:"north-dakota",OH:"ohio",OK:"oklahoma",OR:"oregon",PA:"pennsylvania",RI:"rhode-island",SC:"south-carolina",SD:"south-dakota",TN:"tennessee",TX:"texas",UT:"utah",VT:"vermont",VA:"virginia",WA:"washington",WV:"west-virginia",WI:"wisconsin",WY:"wyoming"};

const dataDir = path.join(__dirname, "..", "src", "data");
const files = fs.readdirSync(dataDir).filter(f => f.endsWith("-parks.json"));

const allParks = [];
files.forEach(f => {
  const stateName = f.replace("-parks.json", "");
  const stateCode = Object.entries(STATE_SLUGS).find(([, s]) => s === stateName)?.[0] || "";
  JSON.parse(fs.readFileSync(path.join(dataDir, f), "utf8")).forEach(p => {
    if (p.name && p.latitude && p.longitude) {
      allParks.push({ id: p.place_id, name: p.name, lat: p.latitude, lng: p.longitude, city: p.city || "", state: stateCode });
    }
  });
});

console.log(`Loaded ${allParks.length} parks`);
allParks.sort((a, b) => a.lat - b.lat);

const nearby = {};
const LAT_WINDOW = 0.75;
let comparisons = 0;

for (let i = 0; i < allParks.length; i++) {
  const p = allParks[i];
  const candidates = [];
  for (let j = i - 1; j >= 0 && allParks[j].lat >= p.lat - LAT_WINDOW; j--) {
    const dist = haversine(p.lat, p.lng, allParks[j].lat, allParks[j].lng);
    comparisons++;
    if (dist > 0.01 && dist <= 50) candidates.push({ id: allParks[j].id, name: allParks[j].name, distance: Math.round(dist * 10) / 10, city: allParks[j].city, state: allParks[j].state });
  }
  for (let j = i + 1; j < allParks.length && allParks[j].lat <= p.lat + LAT_WINDOW; j++) {
    const dist = haversine(p.lat, p.lng, allParks[j].lat, allParks[j].lng);
    comparisons++;
    if (dist > 0.01 && dist <= 50) candidates.push({ id: allParks[j].id, name: allParks[j].name, distance: Math.round(dist * 10) / 10, city: allParks[j].city, state: allParks[j].state });
  }
  candidates.sort((a, b) => a.distance - b.distance);
  if (candidates.length > 0) nearby[p.id] = candidates.slice(0, 5);
  if ((i + 1) % 2000 === 0) console.log(`  ${i + 1}/${allParks.length}`);
}

fs.writeFileSync(path.join(dataDir, "nearby.json"), JSON.stringify(nearby));
const withNearby = Object.keys(nearby).length;
console.log(`\nDone: ${comparisons.toLocaleString()} comparisons`);
console.log(`Parks with nearby: ${withNearby}/${allParks.length}`);
console.log(`File: ${(fs.statSync(path.join(dataDir, "nearby.json")).size / 1024 / 1024).toFixed(1)}MB`);
