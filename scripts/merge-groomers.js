/**
 * Merge OSM + Yelp groomers, deduplicate by name+city+state.
 * Prefers Yelp data (has ratings, phone, reviews).
 * Output: src/data/groomers.json (unified)
 */
const fs = require("fs");
const path = require("path");

const OSM_PATH = path.join(__dirname, "..", "src", "data", "groomers.json");
const YELP_PATH = path.join(__dirname, "..", "src", "data", "yelp-groomers.json");

const stateNameToAbbr = {
  "Alabama":"AL","Alaska":"AK","Arizona":"AZ","Arkansas":"AR","California":"CA",
  "Colorado":"CO","Connecticut":"CT","Delaware":"DE","Florida":"FL","Georgia":"GA",
  "Hawaii":"HI","Idaho":"ID","Illinois":"IL","Indiana":"IN","Iowa":"IA","Kansas":"KS",
  "Kentucky":"KY","Louisiana":"LA","Maine":"ME","Maryland":"MD","Massachusetts":"MA",
  "Michigan":"MI","Minnesota":"MN","Mississippi":"MS","Missouri":"MO","Montana":"MT",
  "Nebraska":"NE","Nevada":"NV","New Hampshire":"NH","New Jersey":"NJ","New Mexico":"NM",
  "New York":"NY","North Carolina":"NC","North Dakota":"ND","Ohio":"OH","Oklahoma":"OK",
  "Oregon":"OR","Pennsylvania":"PA","Rhode Island":"RI","South Carolina":"SC",
  "South Dakota":"SD","Tennessee":"TN","Texas":"TX","Utah":"UT","Vermont":"VT",
  "Virginia":"VA","Washington":"WA","West Virginia":"WV","Wisconsin":"WI","Wyoming":"WY",
  "District of Columbia":"DC"
};
const abbrToName = Object.fromEntries(Object.entries(stateNameToAbbr).map(([k,v])=>[v,k]));

const stateBounds = [
  {s:"AL",n:30.2,x:35.0,w:-88.5,e:-84.9},{s:"AK",n:51.2,x:71.4,w:-179.1,e:-129.9},
  {s:"AZ",n:31.3,x:37.0,w:-114.8,e:-109.0},{s:"AR",n:33.0,x:36.5,w:-94.6,e:-89.6},
  {s:"CA",n:32.5,x:42.0,w:-124.4,e:-114.1},{s:"CO",n:37.0,x:41.0,w:-109.1,e:-102.0},
  {s:"CT",n:41.0,x:42.1,w:-73.7,e:-71.8},{s:"DE",n:38.5,x:39.8,w:-75.8,e:-75.0},
  {s:"FL",n:24.5,x:31.0,w:-87.6,e:-80.0},{s:"GA",n:30.4,x:35.0,w:-85.6,e:-80.8},
  {s:"HI",n:18.9,x:22.2,w:-160.2,e:-154.8},{s:"ID",n:42.0,x:49.0,w:-117.2,e:-111.0},
  {s:"IL",n:36.9,x:42.5,w:-91.5,e:-87.0},{s:"IN",n:37.8,x:41.8,w:-88.1,e:-84.8},
  {s:"IA",n:40.4,x:43.5,w:-96.6,e:-90.1},{s:"KS",n:37.0,x:40.0,w:-102.1,e:-94.6},
  {s:"KY",n:36.5,x:39.1,w:-89.6,e:-82.0},{s:"LA",n:28.9,x:33.0,w:-94.0,e:-89.0},
  {s:"ME",n:43.1,x:47.5,w:-71.1,e:-66.9},{s:"MD",n:37.9,x:39.7,w:-79.5,e:-75.0},
  {s:"MA",n:41.2,x:42.9,w:-73.5,e:-69.9},{s:"MI",n:41.7,x:48.3,w:-90.4,e:-82.4},
  {s:"MN",n:43.5,x:49.4,w:-97.2,e:-89.5},{s:"MS",n:30.2,x:35.0,w:-91.7,e:-88.1},
  {s:"MO",n:36.0,x:40.6,w:-95.8,e:-89.1},{s:"MT",n:44.4,x:49.0,w:-116.0,e:-104.0},
  {s:"NE",n:40.0,x:43.0,w:-104.1,e:-95.3},{s:"NV",n:35.0,x:42.0,w:-120.0,e:-114.0},
  {s:"NH",n:42.7,x:45.3,w:-72.6,e:-71.0},{s:"NJ",n:38.9,x:41.4,w:-75.6,e:-73.9},
  {s:"NM",n:31.3,x:37.0,w:-109.1,e:-103.0},{s:"NY",n:40.5,x:45.0,w:-79.8,e:-71.9},
  {s:"NC",n:33.8,x:36.6,w:-84.3,e:-75.5},{s:"ND",n:45.9,x:49.0,w:-104.0,e:-96.6},
  {s:"OH",n:38.4,x:42.3,w:-84.8,e:-80.5},{s:"OK",n:33.6,x:37.0,w:-103.0,e:-94.4},
  {s:"OR",n:42.0,x:46.3,w:-124.6,e:-116.5},{s:"PA",n:39.7,x:42.3,w:-80.5,e:-74.7},
  {s:"RI",n:41.1,x:42.0,w:-71.9,e:-71.1},{s:"SC",n:32.0,x:35.2,w:-83.4,e:-78.5},
  {s:"SD",n:42.5,x:45.9,w:-104.1,e:-96.4},{s:"TN",n:34.9,x:36.7,w:-90.3,e:-81.6},
  {s:"TX",n:25.8,x:36.5,w:-106.6,e:-93.5},{s:"UT",n:37.0,x:42.0,w:-114.1,e:-109.0},
  {s:"VT",n:42.7,x:45.0,w:-73.4,e:-71.5},{s:"VA",n:36.5,x:39.5,w:-83.7,e:-75.2},
  {s:"WA",n:45.5,x:49.0,w:-124.8,e:-116.9},{s:"WV",n:37.2,x:40.6,w:-82.6,e:-77.7},
  {s:"WI",n:42.5,x:47.1,w:-92.9,e:-86.8},{s:"WY",n:41.0,x:45.0,w:-111.1,e:-104.1},
];

function getStateByCoords(lat, lng) {
  for (const b of stateBounds) {
    if (lat >= b.n && lat <= b.x && lng >= b.w && lng <= b.e) return b.s;
  }
  return null;
}

function normKey(name, city, state) {
  return `${(name||"").toLowerCase().trim()}|${(city||"").toLowerCase().trim()}|${(state||"").toUpperCase().trim()}`;
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const osm = JSON.parse(fs.readFileSync(OSM_PATH, "utf-8"));
const yelp = JSON.parse(fs.readFileSync(YELP_PATH, "utf-8"));

console.log(`OSM: ${osm.length}, Yelp: ${yelp.length}`);

const merged = new Map();

// Add OSM first
for (const r of osm) {
  const abbr = r.stateAbbr || stateNameToAbbr[r.state] || getStateByCoords(r.latitude, r.longitude);
  if (!abbr) continue;
  const stateName = r.state || abbrToName[abbr] || abbr;
  const city = r.city || "";
  const key = normKey(r.name, city, abbr);
  const slug = `${slugify(stateName)}-${slugify(r.name || "groomer")}-${String(r.id).replace(/[^a-z0-9]/gi,"")}`;

  merged.set(key, {
    id: r.id || `osm-${r.latitude}-${r.longitude}`,
    slug,
    name: r.name || "Dog Groomer",
    latitude: r.latitude,
    longitude: r.longitude,
    state: stateName,
    stateAbbr: abbr,
    city,
    address: r.address || "",
    phone: r.phone || "",
    website: r.website || "",
    rating: 0,
    reviewCount: 0,
    source: "osm",
  });
}

// Overlay Yelp — replace OSM dupes, add new
let yelpNew = 0, yelpReplace = 0;
for (const r of yelp) {
  const abbr = r.state || stateNameToAbbr[r.state] || getStateByCoords(r.latitude, r.longitude);
  if (!abbr) continue;
  const stateName = abbrToName[abbr] || r.state || abbr;
  const city = r.city || "";
  const key = normKey(r.name, city, abbr);
  const slug = `${slugify(stateName)}-${slugify(r.name || "groomer")}-${slugify(r.id || "")}`;

  const rec = {
    id: r.id || `yelp-${r.latitude}-${r.longitude}`,
    slug,
    name: r.name || "Dog Groomer",
    latitude: r.latitude,
    longitude: r.longitude,
    state: stateName,
    stateAbbr: abbr,
    city,
    address: r.address || "",
    phone: r.phone || "",
    website: r.yelp_url || "",
    rating: r.rating || 0,
    reviewCount: r.review_count || 0,
    source: "yelp",
  };

  if (merged.has(key)) { yelpReplace++; } else { yelpNew++; }
  merged.set(key, rec);
}

const all = Array.from(merged.values());

// Deduplicate slugs
const slugCount = {};
for (const r of all) {
  if (slugCount[r.slug]) {
    slugCount[r.slug]++;
    r.slug = `${r.slug}-${slugCount[r.slug]}`;
  } else {
    slugCount[r.slug] = 1;
  }
}

// Sort by state, then rating desc, then name
all.sort((a, b) => a.state.localeCompare(b.state) || b.rating - a.rating || a.name.localeCompare(b.name));

fs.writeFileSync(OSM_PATH, JSON.stringify(all, null, 2));

const byState = {};
for (const r of all) byState[r.stateAbbr] = (byState[r.stateAbbr] || 0) + 1;

console.log(`\nMerged: ${all.length} groomers`);
console.log(`Yelp replaced: ${yelpReplace}, Yelp new: ${yelpNew}`);
console.log(`States: ${Object.keys(byState).length}`);
console.log(`Top states:`, Object.entries(byState).sort((a,b)=>b[1]-a[1]).slice(0,10).map(([s,n])=>`${s}:${n}`).join(", "));
console.log(`\nWrote ${OSM_PATH}`);
