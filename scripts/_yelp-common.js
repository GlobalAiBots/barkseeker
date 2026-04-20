// Shared helpers for Yelp enrichment scripts.
// Loaded via `node --env-file=.env.local scripts/enrich-*.js`

import fs from "node:fs";

export const API_KEY = process.env.YELP_API_KEY;
if (!API_KEY) {
  console.error("Missing YELP_API_KEY. Run with: node --env-file=.env.local scripts/enrich-*.js");
  process.exit(1);
}

const STOP_WORDS = new Set([
  "the", "a", "an", "and", "&", "of", "for", "at",
  "inc", "llc", "co", "ltd", "corp", "corporation", "company",
  "dog", "dogs", "pet", "pets", "doggy", "puppy", "canine", "k9",
  "grooming", "groomer", "groomers", "groom", "salon", "spa", "bath", "baths",
  "vet", "vets", "veterinary", "veterinarian", "hospital", "clinic",
  "animal", "animals", "care", "center", "services", "service",
]);

function normalize(s) {
  return (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w && !STOP_WORDS.has(w))
    .join(" ")
    .trim();
}

function bigrams(s) {
  const set = new Set();
  const t = s.replace(/\s/g, "");
  for (let i = 0; i < t.length - 1; i++) set.add(t.slice(i, i + 2));
  return set;
}

// Sørensen-Dice similarity on bigram sets, operating on normalized names.
// Falls back to 1.0 on exact normalized match (handles short names like "Rosella").
export function dice(a, b) {
  const an = normalize(a);
  const bn = normalize(b);
  if (!an || !bn) return 0;
  if (an === bn) return 1;
  const aB = bigrams(an);
  const bB = bigrams(bn);
  if (aB.size === 0 || bB.size === 0) return 0;
  let intersect = 0;
  for (const x of aB) if (bB.has(x)) intersect++;
  return (2 * intersect) / (aB.size + bB.size);
}

// Cheap haversine in miles — used as a sanity check on Yelp match location.
export function milesBetween(lat1, lng1, lat2, lng2) {
  if (lat1 == null || lng1 == null || lat2 == null || lng2 == null) return Infinity;
  const R = 3958.8;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export async function searchYelp({ term, city, stateAbbr, category, limit = 3 }) {
  const url = new URL("https://api.yelp.com/v3/businesses/search");
  url.searchParams.set("term", term);
  url.searchParams.set("location", `${city}, ${stateAbbr}`);
  url.searchParams.set("categories", category);
  url.searchParams.set("limit", String(limit));
  const res = await fetch(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
  if (res.status === 429) throw new Error("RATE_LIMIT");
  if (res.status === 400) return { businesses: [] }; // unknown location, skip
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Yelp ${res.status}: ${t.slice(0, 200)}`);
  }
  return res.json();
}

export function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

export function writeJson(p, data) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2));
}
