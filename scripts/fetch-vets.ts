/**
 * fetch-vets.ts — Pull US veterinarians from OSM, state-by-state bbox.
 * Tag: amenity=veterinary
 * Output: src/data/vets.json (flat array with state/stateAbbr)
 */
import axios from "axios";
import * as fs from "fs";
import * as path from "path";

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";
function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

interface RawElement { id: number; lat?: number; lon?: number; tags?: Record<string, string>; center?: { lat: number; lon: number }; type: string; }
interface Vet {
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

const states: { name: string; abbr: string; bbox: string }[] = [
  { name: "Alabama", abbr: "AL", bbox: "30.2,-88.5,35.0,-84.9" },
  { name: "Alaska", abbr: "AK", bbox: "51.2,-179.1,71.4,-129.9" },
  { name: "Arizona", abbr: "AZ", bbox: "31.3,-114.8,37.0,-109.0" },
  { name: "Arkansas", abbr: "AR", bbox: "33.0,-94.6,36.5,-89.6" },
  { name: "California", abbr: "CA", bbox: "32.5,-124.4,42.0,-114.1" },
  { name: "Colorado", abbr: "CO", bbox: "37.0,-109.1,41.0,-102.0" },
  { name: "Connecticut", abbr: "CT", bbox: "41.0,-73.7,42.1,-71.8" },
  { name: "Delaware", abbr: "DE", bbox: "38.5,-75.8,39.8,-75.0" },
  { name: "Florida", abbr: "FL", bbox: "24.5,-87.6,31.0,-80.0" },
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
  { name: "New York", abbr: "NY", bbox: "40.5,-79.8,45.0,-71.9" },
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
  { name: "Texas", abbr: "TX", bbox: "25.8,-106.6,36.5,-93.5" },
  { name: "Utah", abbr: "UT", bbox: "37.0,-114.1,42.0,-109.0" },
  { name: "Vermont", abbr: "VT", bbox: "42.7,-73.4,45.0,-71.5" },
  { name: "Virginia", abbr: "VA", bbox: "36.5,-83.7,39.5,-75.2" },
  { name: "Washington", abbr: "WA", bbox: "45.5,-124.8,49.0,-116.9" },
  { name: "West Virginia", abbr: "WV", bbox: "37.2,-82.6,40.6,-77.7" },
  { name: "Wisconsin", abbr: "WI", bbox: "42.5,-92.9,47.1,-86.8" },
  { name: "Wyoming", abbr: "WY", bbox: "41.0,-111.1,45.0,-104.1" },
];

async function queryOverpass(bbox: string, attempt = 1): Promise<RawElement[]> {
  try {
    const query = `[out:json][timeout:180];(` +
      `node["amenity"="veterinary"](${bbox});` +
      `way["amenity"="veterinary"](${bbox});` +
      `);out center tags;`;
    const res = await axios.post(OVERPASS_URL, `data=${encodeURIComponent(query)}`, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      timeout: 240000,
    });
    return res.data.elements || [];
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (attempt < 3) {
      console.log(`    Failed (${msg}), retrying in 60s...`);
      await sleep(60000);
      return queryOverpass(bbox, attempt + 1);
    }
    console.log(`    Gave up: ${msg}`);
    return [];
  }
}

async function main() {
  console.log("=== BarkSeeker: US Veterinarian Fetch (state-by-state bbox) ===\n");

  const outPath = path.join(__dirname, "..", "src", "data", "vets.json");
  const seen = new Map<string, Vet>();
  let total = 0;

  for (let i = 0; i < states.length; i++) {
    const st = states[i];
    process.stdout.write(`  ${i + 1}/${states.length} ${st.name} (${st.abbr})... `);

    const results = await queryOverpass(st.bbox);
    let added = 0;

    for (const raw of results) {
      const lat = raw.center?.lat ?? raw.lat;
      const lon = raw.center?.lon ?? raw.lon;
      if (lat == null || lon == null) continue;

      const t = raw.tags || {};
      const name = t.name || t["name:en"] || t.brand || "Veterinary Clinic";
      const key = `${raw.type}:${raw.id}`;
      if (seen.has(key)) continue;

      const addrParts = [t["addr:housenumber"], t["addr:street"]].filter(Boolean).join(" ");
      const fullAddr = [addrParts, t["addr:city"], t["addr:state"], t["addr:postcode"]]
        .filter(Boolean).join(", ");

      seen.set(key, {
        id: key,
        name,
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

    total += added;
    console.log(`${results.length} raw, +${added} new (running total ${total})`);

    fs.writeFileSync(outPath, JSON.stringify(Array.from(seen.values()), null, 2));

    if (i < states.length - 1) await sleep(8000);
  }

  const all = Array.from(seen.values());
  fs.writeFileSync(outPath, JSON.stringify(all, null, 2));

  const byState: Record<string, number> = {};
  for (const v of all) byState[v.state] = (byState[v.state] || 0) + 1;

  console.log(`\n=== Final counts ===`);
  Object.entries(byState).sort((a, b) => b[1] - a[1]).forEach(([s, n]) => console.log(`  ${s}: ${n}`));
  console.log(`\nTotal vets: ${all.length}`);
  console.log(`Wrote ${outPath}`);
}

main().catch((err) => { console.error("Fatal:", err); process.exit(1); });
