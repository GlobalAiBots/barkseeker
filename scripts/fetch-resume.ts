/**
 * fetch-resume.ts — Resumable fetch for groomers + vets.
 * - Reads existing groomers.json / vets.json, only queries states with 0 entries.
 * - Sequential (never parallel). Rotates 3 Overpass mirrors on failure.
 * - Subdivides big states (CA, TX, NY, FL) into 4 quadrants.
 * - 15s between states, 45s between mirror retries, 5 attempts per bbox.
 *
 * Run: npx tsx scripts/fetch-resume.ts groomers
 *      npx tsx scripts/fetch-resume.ts vets
 */
import axios from "axios";
import * as fs from "fs";
import * as path from "path";

const MIRRORS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
];
const SLEEP_BETWEEN_STATES = 15000;
const SLEEP_ON_FAIL = 45000;
const MAX_ATTEMPTS = 5;

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

interface RawElement { id: number; lat?: number; lon?: number; tags?: Record<string, string>; center?: { lat: number; lon: number }; type: string; }
interface Entry {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  state: string;
  stateAbbr: string;
  city?: string;
  address?: string;
  phone?: string;
  website?: string;
  tags: Record<string, string>;
}

interface StateDef { name: string; abbr: string; bbox: string; subdivide?: boolean; }

const states: StateDef[] = [
  { name: "Alabama", abbr: "AL", bbox: "30.2,-88.5,35.0,-84.9" },
  { name: "Alaska", abbr: "AK", bbox: "51.2,-179.1,71.4,-129.9" },
  { name: "Arizona", abbr: "AZ", bbox: "31.3,-114.8,37.0,-109.0" },
  { name: "Arkansas", abbr: "AR", bbox: "33.0,-94.6,36.5,-89.6" },
  { name: "California", abbr: "CA", bbox: "32.5,-124.4,42.0,-114.1", subdivide: true },
  { name: "Colorado", abbr: "CO", bbox: "37.0,-109.1,41.0,-102.0" },
  { name: "Connecticut", abbr: "CT", bbox: "41.0,-73.7,42.1,-71.8" },
  { name: "Delaware", abbr: "DE", bbox: "38.5,-75.8,39.8,-75.0" },
  { name: "Florida", abbr: "FL", bbox: "24.5,-87.6,31.0,-80.0", subdivide: true },
  { name: "Georgia", abbr: "GA", bbox: "30.4,-85.6,35.0,-80.8" },
  { name: "Hawaii", abbr: "HI", bbox: "18.9,-160.2,22.2,-154.8" },
  { name: "Idaho", abbr: "ID", bbox: "42.0,-117.2,49.0,-111.0" },
  { name: "Illinois", abbr: "IL", bbox: "36.9,-91.5,42.5,-87.0" },
  { name: "Indiana", abbr: "IN", bbox: "37.8,-88.1,41.8,-84.8" },
  { name: "Iowa", abbr: "IA", bbox: "40.4,-96.6,43.5,-90.1" },
  { name: "Kansas", abbr: "KS", bbox: "37.0,-102.1,40.0,-94.6" },
  { name: "Kentucky", abbr: "KY", bbox: "36.5,-89.6,39.1,-82.0" },
  { name: "Louisiana", abbr: "LA", bbox: "28.9,-94.0,33.0,-89.0" },
  { name: "Maine", abbr: "ME", bbox: "43.1,-71.1,47.5,-66.9" },
  { name: "Maryland", abbr: "MD", bbox: "37.9,-79.5,39.7,-75.0" },
  { name: "Massachusetts", abbr: "MA", bbox: "41.2,-73.5,42.9,-69.9" },
  { name: "Michigan", abbr: "MI", bbox: "41.7,-90.4,48.3,-82.4" },
  { name: "Minnesota", abbr: "MN", bbox: "43.5,-97.2,49.4,-89.5" },
  { name: "Mississippi", abbr: "MS", bbox: "30.2,-91.7,35.0,-88.1" },
  { name: "Missouri", abbr: "MO", bbox: "36.0,-95.8,40.6,-89.1" },
  { name: "Montana", abbr: "MT", bbox: "44.4,-116.0,49.0,-104.0" },
  { name: "Nebraska", abbr: "NE", bbox: "40.0,-104.1,43.0,-95.3" },
  { name: "Nevada", abbr: "NV", bbox: "35.0,-120.0,42.0,-114.0" },
  { name: "New Hampshire", abbr: "NH", bbox: "42.7,-72.6,45.3,-71.0" },
  { name: "New Jersey", abbr: "NJ", bbox: "38.9,-75.6,41.4,-73.9" },
  { name: "New Mexico", abbr: "NM", bbox: "31.3,-109.1,37.0,-103.0" },
  { name: "New York", abbr: "NY", bbox: "40.5,-79.8,45.0,-71.9", subdivide: true },
  { name: "North Carolina", abbr: "NC", bbox: "33.8,-84.3,36.6,-75.5" },
  { name: "North Dakota", abbr: "ND", bbox: "45.9,-104.0,49.0,-96.6" },
  { name: "Ohio", abbr: "OH", bbox: "38.4,-84.8,42.3,-80.5" },
  { name: "Oklahoma", abbr: "OK", bbox: "33.6,-103.0,37.0,-94.4" },
  { name: "Oregon", abbr: "OR", bbox: "42.0,-124.6,46.3,-116.5" },
  { name: "Pennsylvania", abbr: "PA", bbox: "39.7,-80.5,42.3,-74.7" },
  { name: "Rhode Island", abbr: "RI", bbox: "41.1,-71.9,42.0,-71.1" },
  { name: "South Carolina", abbr: "SC", bbox: "32.0,-83.4,35.2,-78.5" },
  { name: "South Dakota", abbr: "SD", bbox: "42.5,-104.1,45.9,-96.4" },
  { name: "Tennessee", abbr: "TN", bbox: "34.9,-90.3,36.7,-81.6" },
  { name: "Texas", abbr: "TX", bbox: "25.8,-106.6,36.5,-93.5", subdivide: true },
  { name: "Utah", abbr: "UT", bbox: "37.0,-114.1,42.0,-109.0" },
  { name: "Vermont", abbr: "VT", bbox: "42.7,-73.4,45.0,-71.5" },
  { name: "Virginia", abbr: "VA", bbox: "36.5,-83.7,39.5,-75.2" },
  { name: "Washington", abbr: "WA", bbox: "45.5,-124.8,49.0,-116.9" },
  { name: "West Virginia", abbr: "WV", bbox: "37.2,-82.6,40.6,-77.7" },
  { name: "Wisconsin", abbr: "WI", bbox: "42.5,-92.9,47.1,-86.8" },
  { name: "Wyoming", abbr: "WY", bbox: "41.0,-111.1,45.0,-104.1" },
];

function splitBbox(bbox: string): string[] {
  const [s, w, n, e] = bbox.split(",").map(Number);
  const midLat = (s + n) / 2, midLon = (w + e) / 2;
  return [
    `${s},${w},${midLat},${midLon}`,
    `${s},${midLon},${midLat},${e}`,
    `${midLat},${w},${n},${midLon}`,
    `${midLat},${midLon},${n},${e}`,
  ];
}

const KIND = (process.argv[2] || "").toLowerCase();
if (KIND !== "groomers" && KIND !== "vets") {
  console.error("Usage: tsx fetch-resume.ts [groomers|vets]");
  process.exit(1);
}

const TAGS_QUERY = KIND === "groomers"
  ? (bbox: string) => `node["shop"="pet_grooming"](${bbox});way["shop"="pet_grooming"](${bbox});node["shop"="dog_grooming"](${bbox});way["shop"="dog_grooming"](${bbox});`
  : (bbox: string) => `node["amenity"="veterinary"](${bbox});way["amenity"="veterinary"](${bbox});`;

const DEFAULT_NAME = KIND === "groomers" ? "Dog Groomer" : "Veterinary Clinic";
const OUT_PATH = path.join(__dirname, "..", "src", "data", `${KIND}.json`);

async function queryOverpass(bbox: string): Promise<RawElement[] | null> {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const mirror = MIRRORS[attempt % MIRRORS.length];
    try {
      const query = `[out:json][timeout:180];(${TAGS_QUERY(bbox)});out center tags;`;
      const res = await axios.post(mirror, `data=${encodeURIComponent(query)}`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        timeout: 240000,
      });
      return res.data.elements || [];
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.log(`      mirror ${mirror.split("//")[1].split("/")[0]} failed (${msg}); attempt ${attempt + 1}/${MAX_ATTEMPTS}`);
      await sleep(SLEEP_ON_FAIL);
    }
  }
  return null;
}

async function fetchState(st: StateDef): Promise<RawElement[]> {
  const bboxes = st.subdivide ? splitBbox(st.bbox) : [st.bbox];
  const all: RawElement[] = [];
  for (const bb of bboxes) {
    if (bboxes.length > 1) process.stdout.write(`    quadrant ${bb}... `);
    const res = await queryOverpass(bb);
    if (res == null) {
      console.log(`    FAILED after all retries`);
      continue;
    }
    if (bboxes.length > 1) console.log(`${res.length}`);
    all.push(...res);
    if (bboxes.length > 1) await sleep(SLEEP_BETWEEN_STATES);
  }
  return all;
}

async function main() {
  let existing: Entry[] = [];
  try { existing = JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")); } catch {}
  console.log(`Loaded ${existing.length} existing ${KIND}\n`);

  const seen = new Map<string, Entry>();
  for (const e of existing) seen.set(e.id, e);

  const counts: Record<string, number> = {};
  for (const e of existing) counts[e.state] = (counts[e.state] || 0) + 1;

  const missing = states.filter(s => !counts[s.name]);
  console.log(`Missing states (${missing.length}): ${missing.map(s => s.abbr).join(", ")}\n`);

  for (let i = 0; i < missing.length; i++) {
    const st = missing[i];
    process.stdout.write(`  ${i + 1}/${missing.length} ${st.name} (${st.abbr})${st.subdivide ? " [subdivided]" : ""}... `);

    const results = await fetchState(st);
    let added = 0;
    for (const raw of results) {
      const lat = raw.center?.lat ?? raw.lat;
      const lon = raw.center?.lon ?? raw.lon;
      if (lat == null || lon == null) continue;
      const t = raw.tags || {};
      const key = `${raw.type}:${raw.id}`;
      if (seen.has(key)) continue;

      const addrParts = [t["addr:housenumber"], t["addr:street"]].filter(Boolean).join(" ");
      const fullAddr = [addrParts, t["addr:city"], t["addr:state"], t["addr:postcode"]]
        .filter(Boolean).join(", ");

      seen.set(key, {
        id: key,
        name: t.name || t["name:en"] || t.brand || DEFAULT_NAME,
        latitude: lat,
        longitude: lon,
        state: st.name,
        stateAbbr: st.abbr,
        city: t["addr:city"] || "",
        address: fullAddr || undefined,
        phone: t.phone || t["contact:phone"] || undefined,
        website: t.website || t["contact:website"] || undefined,
        tags: t,
      });
      added++;
    }
    console.log(`${results.length} raw, +${added} new (total ${seen.size})`);

    fs.writeFileSync(OUT_PATH, JSON.stringify(Array.from(seen.values()), null, 2));
    if (i < missing.length - 1) await sleep(SLEEP_BETWEEN_STATES);
  }

  console.log(`\nFinal ${KIND}: ${seen.size}`);
}

main().catch((e) => { console.error("Fatal:", e); process.exit(1); });
