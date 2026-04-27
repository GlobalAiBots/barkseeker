/**
 * Regenerate public/sitemap-groomers.xml from current groomers.json.
 *
 * Records already carry a `slug` field that matches the /groomers/[slug]
 * runtime route, so this is a straight iteration. Re-run after
 * groomers.json changes.
 *
 * Usage: node scripts/generate-sitemap-groomers.js
 */
const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "..", "src", "data", "groomers.json");
const OUT_PATH = path.join(__dirname, "..", "public", "sitemap-groomers.xml");
const BASE_URL = "https://www.barkseeker.com";

const records = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
if (!Array.isArray(records)) {
  throw new Error("groomers.json is not an array");
}

const today = new Date().toISOString().slice(0, 10);

// Top-of-sitemap entries: hub + state pages (preserved from prior structure)
const stateNames = [
  "alabama","alaska","arizona","arkansas","california","colorado","connecticut",
  "delaware","florida","georgia","hawaii","idaho","illinois","indiana","iowa",
  "kansas","kentucky","louisiana","maine","maryland","massachusetts","michigan",
  "minnesota","mississippi","missouri","montana","nebraska","nevada","new-hampshire",
  "new-jersey","new-mexico","new-york","north-carolina","north-dakota","ohio",
  "oklahoma","oregon","pennsylvania","rhode-island","south-carolina","south-dakota",
  "tennessee","texas","utah","vermont","virginia","washington","west-virginia",
  "wisconsin","wyoming",
];

const lines = [];
lines.push(`  <url><loc>${BASE_URL}/groomers</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`);
for (const s of stateNames) {
  lines.push(`  <url><loc>${BASE_URL}/groomers/${s}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`);
}

let withSlug = 0;
let skipped = 0;
const seen = new Set();
for (const rec of records) {
  const slug = rec && typeof rec.slug === "string" ? rec.slug.trim() : "";
  if (!slug) { skipped++; continue; }
  if (seen.has(slug)) { skipped++; continue; }
  seen.add(slug);
  lines.push(`  <url><loc>${BASE_URL}/groomers/${slug}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`);
  withSlug++;
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${lines.join("\n")}
</urlset>
`;

fs.writeFileSync(OUT_PATH, xml);
console.log(`Wrote ${OUT_PATH}`);
console.log(`Total records in groomers.json: ${records.length}`);
console.log(`Individual groomer URLs written: ${withSlug}`);
console.log(`Skipped (no slug or duplicate): ${skipped}`);
console.log(`Plus 1 hub + ${stateNames.length} state pages = ${1 + stateNames.length} top-of-sitemap entries`);
console.log(`Total URLs in sitemap: ${lines.length}`);
