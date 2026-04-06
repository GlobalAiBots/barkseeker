/**
 * fetch-dogparks.ts — Fetch all dog parks from OpenStreetMap Overpass API
 */
import axios from "axios";
import * as fs from "fs";
import * as path from "path";

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";
function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

interface RawElement { id: number; lat?: number; lon?: number; tags?: Record<string, string>; center?: { lat: number; lon: number }; type: string; }
interface Park { id: number; name: string; latitude: number; longitude: number; state: string; stateAbbr: string; tags: Record<string, string>; }

const stateData: Record<string, { abbr: string; lat: [number, number]; lng: [number, number] }> = {
  "Alabama":{abbr:"AL",lat:[30.2,35.0],lng:[-88.5,-84.9]},"Alaska":{abbr:"AK",lat:[51.2,71.4],lng:[-180,-129]},"Arizona":{abbr:"AZ",lat:[31.3,37.0],lng:[-114.8,-109]},"Arkansas":{abbr:"AR",lat:[33.0,36.5],lng:[-94.6,-89.6]},"California":{abbr:"CA",lat:[32.5,42.0],lng:[-124.4,-114.1]},"Colorado":{abbr:"CO",lat:[37.0,41.0],lng:[-109.1,-102]},"Connecticut":{abbr:"CT",lat:[41.0,42.1],lng:[-73.7,-71.8]},"Delaware":{abbr:"DE",lat:[38.5,39.8],lng:[-75.8,-75]},"Florida":{abbr:"FL",lat:[24.5,31.0],lng:[-87.6,-80]},"Georgia":{abbr:"GA",lat:[30.4,35.0],lng:[-85.6,-80.8]},"Hawaii":{abbr:"HI",lat:[18.9,22.2],lng:[-160.2,-154.8]},"Idaho":{abbr:"ID",lat:[42.0,49.0],lng:[-117.2,-111]},"Illinois":{abbr:"IL",lat:[37.0,42.5],lng:[-91.5,-87.5]},"Indiana":{abbr:"IN",lat:[37.8,41.8],lng:[-88.1,-84.8]},"Iowa":{abbr:"IA",lat:[40.4,43.5],lng:[-96.6,-90.1]},"Kansas":{abbr:"KS",lat:[37.0,40.0],lng:[-102.1,-94.6]},"Kentucky":{abbr:"KY",lat:[36.5,39.1],lng:[-89.6,-82]},"Louisiana":{abbr:"LA",lat:[29.0,33.0],lng:[-94,-89]},"Maine":{abbr:"ME",lat:[43.1,47.5],lng:[-71.1,-66.9]},"Maryland":{abbr:"MD",lat:[38.0,39.7],lng:[-79.5,-75]},"Massachusetts":{abbr:"MA",lat:[41.2,42.9],lng:[-73.5,-69.9]},"Michigan":{abbr:"MI",lat:[41.7,48.3],lng:[-90.4,-82.4]},"Minnesota":{abbr:"MN",lat:[43.5,49.4],lng:[-97.2,-89.5]},"Mississippi":{abbr:"MS",lat:[30.2,35.0],lng:[-91.7,-88.1]},"Missouri":{abbr:"MO",lat:[36.0,40.6],lng:[-95.8,-89.1]},"Montana":{abbr:"MT",lat:[44.4,49.0],lng:[-116,-104]},"Nebraska":{abbr:"NE",lat:[40.0,43.0],lng:[-104.1,-95.3]},"Nevada":{abbr:"NV",lat:[35.0,42.0],lng:[-120,-114]},"New Hampshire":{abbr:"NH",lat:[42.7,45.3],lng:[-72.6,-70.7]},"New Jersey":{abbr:"NJ",lat:[38.9,41.4],lng:[-75.6,-73.9]},"New Mexico":{abbr:"NM",lat:[31.3,37.0],lng:[-109.1,-103]},"New York":{abbr:"NY",lat:[40.5,45.0],lng:[-79.8,-71.9]},"North Carolina":{abbr:"NC",lat:[33.8,36.6],lng:[-84.3,-75.5]},"North Dakota":{abbr:"ND",lat:[45.9,49.0],lng:[-104,-96.6]},"Ohio":{abbr:"OH",lat:[38.4,42.0],lng:[-84.8,-80.5]},"Oklahoma":{abbr:"OK",lat:[33.6,37.0],lng:[-103,-94.4]},"Oregon":{abbr:"OR",lat:[42.0,46.3],lng:[-124.6,-116.5]},"Pennsylvania":{abbr:"PA",lat:[39.7,42.3],lng:[-80.5,-74.7]},"Rhode Island":{abbr:"RI",lat:[41.1,42.0],lng:[-71.9,-71.1]},"South Carolina":{abbr:"SC",lat:[32.0,35.2],lng:[-83.4,-78.5]},"South Dakota":{abbr:"SD",lat:[42.5,45.9],lng:[-104.1,-96.4]},"Tennessee":{abbr:"TN",lat:[35.0,36.7],lng:[-90.3,-81.6]},"Texas":{abbr:"TX",lat:[25.8,36.5],lng:[-106.6,-93.5]},"Utah":{abbr:"UT",lat:[37.0,42.0],lng:[-114.1,-109]},"Vermont":{abbr:"VT",lat:[42.7,45.0],lng:[-73.4,-71.5]},"Virginia":{abbr:"VA",lat:[36.5,39.5],lng:[-83.7,-75.2]},"Washington":{abbr:"WA",lat:[45.5,49.0],lng:[-124.8,-116.9]},"West Virginia":{abbr:"WV",lat:[37.2,40.6],lng:[-82.6,-77.7]},"Wisconsin":{abbr:"WI",lat:[42.5,47.1],lng:[-92.9,-86.8]},"Wyoming":{abbr:"WY",lat:[41.0,45.0],lng:[-111.1,-104.1]},
};

function findState(lat: number, lng: number): { state: string; abbr: string } | null {
  for (const [state, data] of Object.entries(stateData)) {
    if (lat >= data.lat[0] && lat <= data.lat[1] && lng >= data.lng[0] && lng <= data.lng[1]) return { state, abbr: data.abbr };
  }
  return null;
}

async function queryOverpass(bbox: string, label: string): Promise<RawElement[]> {
  try {
    console.log(`  [${label}] Querying dog parks...`);
    const query = `[out:json][timeout:120];(node["leisure"="dog_park"](${bbox});way["leisure"="dog_park"](${bbox});relation["leisure"="dog_park"](${bbox}););out center;`;
    const res = await axios.post(OVERPASS_URL, `data=${encodeURIComponent(query)}`, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      timeout: 180000,
    });
    const count = res.data.elements?.length || 0;
    console.log(`    Got ${count} elements`);
    return res.data.elements || [];
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`    Failed: ${msg}`);
    return [];
  }
}

const regions = [
  { name: "Northeast", bbox: "38.0,-80.0,47.5,-66.9" },
  { name: "Southeast", bbox: "24.0,-90.0,38.0,-75.0" },
  { name: "Midwest", bbox: "36.0,-104.0,49.5,-80.0" },
  { name: "West", bbox: "31.0,-125.0,49.5,-104.0" },
  { name: "South-Central", bbox: "24.0,-106.6,37.0,-89.0" },
  { name: "Hawaii", bbox: "18.0,-161.0,22.5,-154.0" },
];

async function main() {
  console.log("=== BarkSeeker: Fetching US Dog Parks from OSM ===\n");

  const allRaw: RawElement[] = [];

  for (let i = 0; i < regions.length; i++) {
    const region = regions[i];
    console.log(`\n--- Region ${i + 1}/${regions.length}: ${region.name} ---`);
    const results = await queryOverpass(region.bbox, region.name);
    allRaw.push(...results);
    if (i < regions.length - 1) {
      console.log("  Waiting 30 seconds...");
      await sleep(30000);
    }
  }

  console.log(`\nTotal raw results: ${allRaw.length}`);

  const seen = new Map<string, Park>();
  for (const raw of allRaw) {
    const lat = raw.center?.lat || raw.lat;
    const lon = raw.center?.lon || raw.lon;
    if (!lat || !lon) continue;

    const stateInfo = findState(lat, lon);
    if (!stateInfo) continue;

    const name = raw.tags?.name || raw.tags?.["name:en"] || "Dog Park";
    const key = `${Math.round(lat * 200)}:${Math.round(lon * 200)}`;
    if (seen.has(key)) {
      const existing = seen.get(key)!;
      if (name !== "Dog Park" && existing.name === "Dog Park") {
        seen.set(key, { id: raw.id, name, latitude: lat, longitude: lon, state: stateInfo.state, stateAbbr: stateInfo.abbr, tags: raw.tags || {} });
      }
      continue;
    }
    seen.set(key, { id: raw.id, name, latitude: lat, longitude: lon, state: stateInfo.state, stateAbbr: stateInfo.abbr, tags: raw.tags || {} });
  }

  const parks = Array.from(seen.values());
  console.log(`Deduplicated parks: ${parks.length}`);

  const byState: Record<string, Park[]> = {};
  for (const p of parks) {
    const stateSlug = p.state.toLowerCase().replace(/\s+/g, '-');
    if (!byState[stateSlug]) byState[stateSlug] = [];
    byState[stateSlug].push(p);
  }

  const outDir = path.join(__dirname, "data");
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(path.join(outDir, "states"), { recursive: true });
  fs.writeFileSync(path.join(outDir, "all-us-dogparks.json"), JSON.stringify(parks, null, 2));

  console.log("\n=== Per-State Breakdown ===");
  const stateCounts: [string, number][] = [];
  for (const [stateSlug, statePks] of Object.entries(byState)) {
    fs.writeFileSync(path.join(outDir, "states", `${stateSlug}.json`), JSON.stringify(statePks, null, 2));
    stateCounts.push([stateSlug, statePks.length]);
  }
  stateCounts.sort((a, b) => b[1] - a[1]);
  for (const [state, count] of stateCounts) console.log(`  ${state}: ${count}`);

  console.log(`\n========================================`);
  console.log(`  Total dog parks: ${parks.length}`);
  console.log(`  States with data: ${Object.keys(byState).length}`);
  console.log(`========================================`);
}

main().catch((err) => { console.error("Fatal:", err); process.exit(1); });
