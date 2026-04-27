/**
 * Regenerate public/sitemap-parks.xml from current runtime park data.
 *
 * Mirrors the slug logic in src/data/all-parks.ts so URLs match what the
 * /parks/[id] route resolves at request time. Re-run after data or slug
 * logic changes.
 *
 * Usage: node scripts/generate-sitemap-parks.js
 */
const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "src", "data");
const OUT_PATH = path.join(__dirname, "..", "public", "sitemap-parks.xml");
const BASE_URL = "https://www.barkseeker.com";

// Mirrors stateMap from src/data/all-parks.ts (keep in sync)
const stateMap = {
  california: "ca", florida: "fl", maryland: "md", "new-york": "ny", "new-jersey": "nj",
  "north-carolina": "nc", michigan: "mi", illinois: "il", colorado: "co", georgia: "ga",
  washington: "wa", oregon: "or", ohio: "oh", arizona: "az", minnesota: "mn",
  massachusetts: "ma", indiana: "in", tennessee: "tn", alabama: "al", pennsylvania: "pa",
  utah: "ut", kansas: "ks", idaho: "id", virginia: "va", iowa: "ia",
  "new-mexico": "nm", kentucky: "ky", connecticut: "ct", missouri: "mo", "south-carolina": "sc",
  arkansas: "ar", maine: "me", nebraska: "ne", "south-dakota": "sd", oklahoma: "ok",
  delaware: "de", "new-hampshire": "nh", montana: "mt", wyoming: "wy", "north-dakota": "nd",
  hawaii: "hi", mississippi: "ms", louisiana: "la", texas: "tx", "west-virginia": "wv",
  nevada: "nv",
};

function slugify(name) {
  return String(name || "").toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 60);
}

const seenSlugs = new Set();
const ids = [];
let totalRaw = 0;
let dropped = 0;

for (const [stateSlug, prefix] of Object.entries(stateMap)) {
  const file = path.join(DATA_DIR, `${stateSlug}-parks.json`);
  if (!fs.existsSync(file)) continue;
  let rows;
  try {
    rows = JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch (e) {
    console.warn(`skip ${stateSlug}: ${e.message}`);
    continue;
  }
  if (!Array.isArray(rows) || rows.length === 0) continue;

  for (const raw of rows) {
    totalRaw++;
    const cleanName = String(raw.name || "Dog Park").replace(/[^\w\s'-]/g, "").trim();
    let slug = `${prefix}-${slugify(cleanName) || "park"}`;
    if (seenSlugs.has(slug)) {
      slug = `${slug}-${String(raw.place_id || "").substring(0, 8).toLowerCase()}`;
    }
    if (seenSlugs.has(slug)) {
      slug = `${slug}-${String(raw.place_id || "").substring(8, 16).toLowerCase()}`;
    }
    if (seenSlugs.has(slug)) {
      dropped++;
      continue;
    }
    seenSlugs.add(slug);
    ids.push(slug);
  }
}

const today = new Date().toISOString().slice(0, 10);
const urls = ids
  .map(
    (id) =>
      `  <url><loc>${BASE_URL}/parks/${id}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

fs.writeFileSync(OUT_PATH, xml);
console.log(`Wrote ${OUT_PATH}`);
console.log(`Total raw parks across all state JSONs: ${totalRaw}`);
console.log(`URLs written: ${ids.length}`);
console.log(`Dropped (slug collisions exhausted): ${dropped}`);
