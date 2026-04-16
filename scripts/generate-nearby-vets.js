const fs = require("fs");
const path = require("path");

function haversine(lat1, lon1, lat2, lon2) {
  const R = 3959;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const dataDir = path.join(__dirname, "..", "src", "data");
const vets = JSON.parse(fs.readFileSync(path.join(dataDir, "vets.json"), "utf8"))
  .filter(v => v.latitude && v.longitude && v.slug);

console.log(`Loaded ${vets.length} vets`);
vets.sort((a, b) => a.latitude - b.latitude);

const nearby = {};
const LAT_WINDOW = 0.5;

for (let i = 0; i < vets.length; i++) {
  const p = vets[i];
  const candidates = [];
  for (let j = i - 1; j >= 0 && vets[j].latitude >= p.latitude - LAT_WINDOW; j--) {
    const dist = haversine(p.latitude, p.longitude, vets[j].latitude, vets[j].longitude);
    if (dist > 0.01 && dist <= 30) candidates.push({ slug: vets[j].slug, name: vets[j].name, distance: Math.round(dist * 10) / 10, city: vets[j].city, stateAbbr: vets[j].stateAbbr });
  }
  for (let j = i + 1; j < vets.length && vets[j].latitude <= p.latitude + LAT_WINDOW; j++) {
    const dist = haversine(p.latitude, p.longitude, vets[j].latitude, vets[j].longitude);
    if (dist > 0.01 && dist <= 30) candidates.push({ slug: vets[j].slug, name: vets[j].name, distance: Math.round(dist * 10) / 10, city: vets[j].city, stateAbbr: vets[j].stateAbbr });
  }
  candidates.sort((a, b) => a.distance - b.distance);
  if (candidates.length > 0) nearby[p.slug] = candidates.slice(0, 5);
  if ((i + 1) % 5000 === 0) console.log(`  ${i + 1}/${vets.length}`);
}

fs.writeFileSync(path.join(dataDir, "nearby-vets.json"), JSON.stringify(nearby));
console.log(`Done: ${Object.keys(nearby).length} vets with nearby data`);
console.log(`File: ${(fs.statSync(path.join(dataDir, "nearby-vets.json")).size / 1024 / 1024).toFixed(1)}MB`);
