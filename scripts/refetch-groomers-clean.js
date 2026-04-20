// Refetch groomer data from Yelp with the CORRECT category slug ("petgroomers"),
// replace all source=yelp records, keep source=osm records (including today's
// clean enrichments), dedup by name+city+stateAbbr, and write a unified groomers.json.
//
// Original scrape used "pet_grooming" which is not a valid Yelp slug, so Yelp
// silently ignored the category filter and returned restaurants in the top-rated slots.
//
// Run: node --env-file=.env.local scripts/refetch-groomers-clean.js

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const cities = require("./yelp-cities.js");

const API_KEY = process.env.YELP_API_KEY;
if (!API_KEY) { console.error("Missing YELP_API_KEY"); process.exit(1); }

const GROOMERS_PATH = path.resolve("src/data/groomers.json");
const YELP_OUT_PATH = path.resolve("src/data/yelp-groomers.json");
const CATEGORY = "groomer"; // Correct Yelp alias. Both "pet_grooming" and "petgroomers" are silently ignored — Yelp returns restaurants.
const SLEEP_MS = 300;
const SAVE_EVERY = 25;

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
  "District of Columbia":"DC",
};
const abbrToName = Object.fromEntries(Object.entries(stateNameToAbbr).map(([k, v]) => [v, k]));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function slugify(s) {
  return (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function dedupKey(name, city, stateAbbr) {
  return (
    (name || "").toLowerCase().replace(/[^a-z0-9]/g, "") +
    "|" +
    (city || "").toLowerCase().replace(/[^a-z0-9]/g, "") +
    "|" +
    (stateAbbr || "").toUpperCase()
  );
}

async function yelpSearch(city, state, offset = 0) {
  const url = new URL("https://api.yelp.com/v3/businesses/search");
  url.searchParams.set("categories", CATEGORY);
  url.searchParams.set("location", `${city}, ${state}`);
  url.searchParams.set("limit", "50");
  if (offset) url.searchParams.set("offset", String(offset));
  const res = await fetch(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
  if (res.status === 429) throw new Error("RATE_LIMIT");
  if (res.status === 400) return { businesses: [] };
  if (!res.ok) { const t = await res.text(); throw new Error(`Yelp ${res.status}: ${t.slice(0, 200)}`); }
  return res.json();
}

function yelpToRecord(b, fallbackCity, fallbackStateAbbr) {
  const stateAbbr = b.location?.state || fallbackStateAbbr;
  const city = b.location?.city || fallbackCity;
  return {
    id: b.id,
    slug: `${slugify(abbrToName[stateAbbr] || "")}-${slugify(b.name)}-${slugify(b.id)}`,
    name: b.name,
    latitude: b.coordinates?.latitude,
    longitude: b.coordinates?.longitude,
    state: abbrToName[stateAbbr] || "",
    stateAbbr: stateAbbr || "",
    city,
    address: (b.location?.display_address || []).join(", "),
    phone: b.display_phone || b.phone || "",
    website: (b.url || "").split("?")[0],
    rating: b.rating ?? 0,
    reviewCount: b.review_count ?? 0,
    source: "yelp",
  };
}

async function main() {
  console.log(`Loading existing groomers.json...`);
  const existing = JSON.parse(fs.readFileSync(GROOMERS_PATH, "utf8"));
  console.log(`Existing total: ${existing.length}`);

  const osmOnly = existing.filter((r) => r.source !== "yelp");
  const removed = existing.length - osmOnly.length;
  console.log(`Keeping source=osm records: ${osmOnly.length}`);
  console.log(`Removing source=yelp records (contaminated): ${removed}`);
  console.log("");

  console.log(`Fetching Yelp '${CATEGORY}' across ${cities.length} cities...`);
  const yelpById = new Map();
  let apiCalls = 0, apiErrors = 0;
  const startedAt = Date.now();

  for (let i = 0; i < cities.length; i++) {
    const [city, state] = cities[i];
    try {
      const json = await yelpSearch(city, state, 0);
      apiCalls++;
      const biz = json.businesses || [];
      let added = 0;
      for (const b of biz) {
        if (yelpById.has(b.id)) continue;
        const rec = yelpToRecord(b, city, state);
        if (!rec.latitude || !rec.longitude) continue;
        yelpById.set(b.id, rec);
        added++;
      }
      if ((i + 1) % SAVE_EVERY === 0) {
        const elapsed = ((Date.now() - startedAt) / 1000).toFixed(0);
        console.log(`  [${i + 1}/${cities.length}] api=${apiCalls} errors=${apiErrors} unique=${yelpById.size} (${elapsed}s)`);
        fs.writeFileSync(YELP_OUT_PATH, JSON.stringify([...yelpById.values()], null, 2));
      }
    } catch (e) {
      if (e.message === "RATE_LIMIT") {
        console.log(`\nRate limit after ${apiCalls} calls. Saving what we have.`);
        break;
      }
      apiErrors++;
      if (apiErrors <= 3) console.log(`  error at ${city}, ${state}: ${e.message}`);
    }
    await sleep(SLEEP_MS);
  }

  const newYelpRecords = [...yelpById.values()];
  fs.writeFileSync(YELP_OUT_PATH, JSON.stringify(newYelpRecords, null, 2));
  console.log(`\nYelp refetch complete. Unique records: ${newYelpRecords.length}`);

  // Merge OSM + new Yelp, dedup by name+city+stateAbbr (prefer Yelp = has ratings).
  const seen = new Set();
  const merged = [];

  for (const r of newYelpRecords) {
    const k = dedupKey(r.name, r.city, r.stateAbbr);
    if (seen.has(k)) continue;
    seen.add(k);
    merged.push(r);
  }

  let osmKept = 0, osmDroppedAsDupe = 0;
  for (const r of osmOnly) {
    const k = dedupKey(r.name, r.city, r.stateAbbr);
    if (seen.has(k)) { osmDroppedAsDupe++; continue; }
    seen.add(k);
    merged.push(r);
    osmKept++;
  }

  fs.writeFileSync(GROOMERS_PATH, JSON.stringify(merged, null, 2));

  // Spot-check: look for obvious restaurant/bar/cafe keywords in the final data.
  const contamKeywords = /\b(restaurant|pizzeria|pizza|sushi|ramen|tacos|taqueria|bar\b|cafe|café|bakery|bistro|brewery|kitchen|burger|grill|coffee|steakhouse|deli|donut|donuts|thai|mexican|italian|chinese|korean)\b/i;
  const suspicious = merged.filter((r) => contamKeywords.test(r.name || ""));

  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(0);
  console.log(`\n=== REFETCH DONE ===`);
  console.log(`API calls: ${apiCalls}`);
  console.log(`API errors: ${apiErrors}`);
  console.log(`New Yelp records (unique): ${newYelpRecords.length}`);
  console.log(`OSM records kept: ${osmKept}`);
  console.log(`OSM records dropped as dupes of Yelp: ${osmDroppedAsDupe}`);
  console.log(`Final groomers.json total: ${merged.length}`);
  console.log(`Removed from prior file: ${existing.length - merged.length}`);
  console.log(`Elapsed: ${elapsed}s`);
  console.log("");
  console.log(`SPOT-CHECK: records whose name matches restaurant/bar keywords: ${suspicious.length}`);
  if (suspicious.length > 0) {
    console.log("Sample suspicious names (up to 10):");
    for (const r of suspicious.slice(0, 10)) console.log(`  - ${r.name} (${r.city}, ${r.stateAbbr}, source=${r.source})`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
