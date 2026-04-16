/**
 * fetch-missing-grid.ts — Resume groomers/vets fetch for states that timed out.
 * Subdivides each missing state bbox into a 3x3 grid of sub-cells so
 * Overpass returns faster per request. Dedupes by OSM id against existing data.
 *
 * Usage:
 *   npx tsx scripts/fetch-missing-grid.ts groomers
 *   npx tsx scripts/fetch-missing-grid.ts vets
 */
import axios from "axios";
import * as fs from "fs";
import * as path from "path";

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Bbox = { name: string; abbr: string; s: number; w: number; n: number; e: number };
const allStates: Bbox[] = [
  { name: "Alabama", abbr: "AL", s: 30.2, w: -88.5, n: 35.0, e: -84.9 },
  { name: "Alaska", abbr: "AK", s: 51.2, w: -179.1, n: 71.4, e: -129.9 },
  { name: "Arizona", abbr: "AZ", s: 31.3, w: -114.8, n: 37.0, e: -109.0 },
  { name: "Arkansas", abbr: "AR", s: 33.0, w: -94.6, n: 36.5, e: -89.6 },
  { name: "California", abbr: "CA", s: 32.5, w: -124.4, n: 42.0, e: -114.1 },
  { name: "Colorado", abbr: "CO", s: 37.0, w: -109.1, n: 41.0, e: -102.0 },
  { name: "Connecticut", abbr: "CT", s: 41.0, w: -73.7, n: 42.1, e: -71.8 },
  { name: "Delaware", abbr: "DE", s: 38.5, w: -75.8, n: 39.8, e: -75.0 },
  { name: "Florida", abbr: "FL", s: 24.5, w: -87.6, n: 31.0, e: -80.0 },
  { name: "Georgia", abbr: "GA", s: 30.4, w: -85.6, n: 35.0, e: -80.8 },
  { name: "Hawaii", abbr: "HI", s: 18.9, w: -160.2, n: 22.2, e: -154.8 },
  { name: "Idaho", abbr: "ID", s: 42.0, w: -117.2, n: 49.0, e: -111.0 },
  { name: "Illinois", abbr: "IL", s: 36.9, w: -91.5, n: 42.5, e: -87.0 },
  { name: "Indiana", abbr: "IN", s: 37.8, w: -88.1, n: 41.8, e: -84.8 },
  { name: "Iowa", abbr: "IA", s: 40.4, w: -96.6, n: 43.5, e: -90.1 },
  { name: "Kansas", abbr: "KS", s: 37.0, w: -102.1, n: 40.0, e: -94.6 },
  { name: "Kentucky", abbr: "KY", s: 36.5, w: -89.6, n: 39.1, e: -82.0 },
  { name: "Louisiana", abbr: "LA", s: 28.9, w: -94.0, n: 33.0, e: -89.0 },
  { name: "Maine", abbr: "ME", s: 43.1, w: -71.1, n: 47.5, e: -66.9 },
  { name: "Maryland", abbr: "MD", s: 37.9, w: -79.5, n: 39.7, e: -75.0 },
  { name: "Massachusetts", abbr: "MA", s: 41.2, w: -73.5, n: 42.9, e: -69.9 },
  { name: "Michigan", abbr: "MI", s: 41.7, w: -90.4, n: 48.3, e: -82.4 },
  { name: "Minnesota", abbr: "MN", s: 43.5, w: -97.2, n: 49.4, e: -89.5 },
  { name: "Mississippi", abbr: "MS", s: 30.2, w: -91.7, n: 35.0, e: -88.1 },
  { name: "Missouri", abbr: "MO", s: 36.0, w: -95.8, n: 40.6, e: -89.1 },
  { name: "Montana", abbr: "MT", s: 44.4, w: -116.0, n: 49.0, e: -104.0 },
  { name: "Nebraska", abbr: "NE", s: 40.0, w: -104.1, n: 43.0, e: -95.3 },
  { name: "Nevada", abbr: "NV", s: 35.0, w: -120.0, n: 42.0, e: -114.0 },
  { name: "New Hampshire", abbr: "NH", s: 42.7, w: -72.6, n: 45.3, e: -71.0 },
  { name: "New Jersey", abbr: "NJ", s: 38.9, w: -75.6, n: 41.4, e: -73.9 },
  { name: "New Mexico", abbr: "NM", s: 31.3, w: -109.1, n: 37.0, e: -103.0 },
  { name: "New York", abbr: "NY", s: 40.5, w: -79.8, n: 45.0, e: -71.9 },
  { name: "North Carolina", abbr: "NC", s: 33.8, w: -84.3, n: 36.6, e: -75.5 },
  { name: "North Dakota", abbr: "ND", s: 45.9, w: -104.0, n: 49.0, e: -96.6 },
  { name: "Ohio", abbr: "OH", s: 38.4, w: -84.8, n: 42.3, e: -80.5 },
  { name: "Oklahoma", abbr: "OK", s: 33.6, w: -103.0, n: 37.0, e: -94.4 },
  { name: "Oregon", abbr: "OR", s: 42.0, w: -124.6, n: 46.3, e: -116.5 },
  { name: "Pennsylvania", abbr: "PA", s: 39.7, w: -80.5, n: 42.3, e: -74.7 },
  { name: "Rhode Island", abbr: "RI", s: 41.1, w: -71.9, n: 42.0, e: -71.1 },
  { name: "South Carolina", abbr: "SC", s: 32.0, w: -83.4, n: 35.2, e: -78.5 },
  { name: "South Dakota", abbr: "SD", s: 42.5, w: -104.1, n: 45.9, e: -96.4 },
  { name: "Tennessee", abbr: "TN", s: 34.9, w: -90.3, n: 36.7, e: -81.6 },
  { name: "Texas", abbr: "TX", s: 25.8, w: -106.6, n: 36.5, e: -93.5 },
  { name: "Utah", abbr: "UT", s: 37.0, w: -114.1, n: 42.0, e: -109.0 },
  { name: "Vermont", abbr: "VT", s: 42.7, w: -73.4, n: 45.0, e: -71.5 },
  { name: "Virginia", abbr: "VA", s: 36.5, w: -83.7, n: 39.5, e: -75.2 },
  { name: "Washington", abbr: "WA", s: 45.5, w: -124.8, n: 49.0, e: -116.9 },
  { name: "West Virginia", abbr: "WV", s: 37.2, w: -82.6, n: 40.6, e: -77.7 },
  { name: "Wisconsin", abbr: "WI", s: 42.5, w: -92.9, n: 47.1, e: -86.8 },
  { name: "Wyoming", abbr: "WY", s: 41.0, w: -111.1, n: 45.0, e: -104.1 },
];

interface RawElement { id: number; lat?: number; lon?: number; tags?: Record<string, string>; center?: { lat: number; lon: number }; type: string; }
interface Record { id: string; name: string; latitude: number; longitude: number; state: string; stateAbbr: string; city?: string; address?: string; phone?: string; website?: string; tags: Record<string, string> | { [k: string]: string }; }

const mode = process.argv[2] as "groomers" | "vets";
if (mode !== "groomers" && mode !== "vets") {
  console.error("Usage: npx tsx scripts/fetch-missing-grid.ts <groomers|vets>");
  process.exit(1);
}

const QUERIES: { [k: string]: (bbox: string) => string } = {
  groomers: (bbox) => `[out:json][timeout:90];(` +
    `node["shop"="pet_grooming"](${bbox});way["shop"="pet_grooming"](${bbox});` +
    `node["shop"="dog_grooming"](${bbox});way["shop"="dog_grooming"](${bbox});` +
    `);out center tags;`,
  vets: (bbox) => `[out:json][timeout:90];(` +
    `node["amenity"="veterinary"](${bbox});way["amenity"="veterinary"](${bbox});` +
    `);out center tags;`,
};

const DEFAULT_NAME = mode === "groomers" ? "Dog Groomer" : "Veterinary Clinic";

async function overpass(bbox: string, attempt = 1): Promise<RawElement[]> {
  try {
    const res = await axios.post(OVERPASS_URL, `data=${encodeURIComponent(QUERIES[mode](bbox))}`, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      timeout: 120000,
    });
    return res.data.elements || [];
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (attempt < 3) {
      console.log(`      retry (${msg.slice(0, 60)})...`);
      await sleep(30000 * attempt);
      return overpass(bbox, attempt + 1);
    }
    console.log(`      gave up: ${msg.slice(0, 80)}`);
    return [];
  }
}

function gridCells(st: Bbox, n = 3): { label: string; bbox: string }[] {
  const cells: { label: string; bbox: string }[] = [];
  const dLat = (st.n - st.s) / n;
  const dLon = (st.e - st.w) / n;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const s = st.s + i * dLat;
      const nn = st.s + (i + 1) * dLat;
      const w = st.w + j * dLon;
      const ee = st.w + (j + 1) * dLon;
      cells.push({ label: `r${i}c${j}`, bbox: `${s.toFixed(3)},${w.toFixed(3)},${nn.toFixed(3)},${ee.toFixed(3)}` });
    }
  }
  return cells;
}

async function main() {
  const outPath = path.join(__dirname, "..", "src", "data", `${mode}.json`);
  const existing: Record[] = JSON.parse(fs.readFileSync(outPath, "utf-8"));
  console.log(`=== Grid resume for ${mode} (${existing.length} existing) ===\n`);

  const seen = new Map<string, Record>();
  for (const r of existing) seen.set(r.id, r);

  const haveStates = new Set(existing.map((r) => r.stateAbbr));
  const missing = allStates.filter((s) => !haveStates.has(s.abbr));
  console.log(`Missing ${missing.length} states: ${missing.map((s) => s.abbr).join(",")}\n`);

  for (let i = 0; i < missing.length; i++) {
    const st = missing[i];
    const cells = gridCells(st, 3);
    console.log(`[${i + 1}/${missing.length}] ${st.name} (${st.abbr}) — ${cells.length} cells`);
    let stateAdded = 0;

    for (const cell of cells) {
      process.stdout.write(`    ${cell.label} ${cell.bbox} ... `);
      const raws = await overpass(cell.bbox);
      let added = 0;
      for (const raw of raws) {
        const lat = raw.center?.lat ?? raw.lat;
        const lon = raw.center?.lon ?? raw.lon;
        if (lat == null || lon == null) continue;
        const key = `${raw.type}:${raw.id}`;
        if (seen.has(key)) continue;

        const t = raw.tags || {};
        const addrParts = [t["addr:housenumber"], t["addr:street"]].filter(Boolean).join(" ");
        const fullAddr = [addrParts, t["addr:city"], t["addr:state"], t["addr:postcode"]].filter(Boolean).join(", ");

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
      stateAdded += added;
      console.log(`${raws.length} raw, +${added}`);
      fs.writeFileSync(outPath, JSON.stringify(Array.from(seen.values()), null, 2));
      await sleep(4000);
    }
    console.log(`  → ${st.name}: +${stateAdded} total\n`);
    await sleep(3000);
  }

  const all = Array.from(seen.values());
  fs.writeFileSync(outPath, JSON.stringify(all, null, 2));

  const byState: { [k: string]: number } = {};
  for (const r of all) byState[r.stateAbbr] = (byState[r.stateAbbr] || 0) + 1;
  console.log(`\n=== Done: ${all.length} total ${mode} ===`);
  console.log(`States with data: ${Object.keys(byState).length}/50`);
  const stillMissing = allStates.filter((s) => !byState[s.abbr]).map((s) => s.abbr);
  if (stillMissing.length) console.log(`Still missing: ${stillMissing.join(",")}`);
}

main().catch((err) => { console.error("Fatal:", err); process.exit(1); });
