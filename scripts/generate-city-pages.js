const fs = require("fs");
const path = require("path");

function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

const STATE_SLUGS = {AL:"alabama",AK:"alaska",AZ:"arizona",AR:"arkansas",CA:"california",CO:"colorado",CT:"connecticut",DE:"delaware",FL:"florida",GA:"georgia",HI:"hawaii",ID:"idaho",IL:"illinois",IN:"indiana",IA:"iowa",KS:"kansas",KY:"kentucky",LA:"louisiana",ME:"maine",MD:"maryland",MA:"massachusetts",MI:"michigan",MN:"minnesota",MS:"mississippi",MO:"missouri",MT:"montana",NE:"nebraska",NV:"nevada",NH:"new-hampshire",NJ:"new-jersey",NM:"new-mexico",NY:"new-york",NC:"north-carolina",ND:"north-dakota",OH:"ohio",OK:"oklahoma",OR:"oregon",PA:"pennsylvania",RI:"rhode-island",SC:"south-carolina",SD:"south-dakota",TN:"tennessee",TX:"texas",UT:"utah",VT:"vermont",VA:"virginia",WA:"washington",WV:"west-virginia",WI:"wisconsin",WY:"wyoming"};
const STATE_NAMES = {};
Object.entries(STATE_SLUGS).forEach(([c, s]) => { STATE_NAMES[c] = s.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" "); });

const dataDir = path.join(__dirname, "..", "src", "data");
const files = fs.readdirSync(dataDir).filter(f => f.endsWith("-parks.json"));

const allParks = [];
files.forEach(f => {
  const parks = JSON.parse(fs.readFileSync(path.join(dataDir, f), "utf8"));
  const stateName = f.replace("-parks.json", "");
  const stateCode = Object.entries(STATE_SLUGS).find(([, slug]) => slug === stateName)?.[0] || "";
  parks.forEach(p => {
    if (p.name && p.latitude && p.longitude && p.city && p.city.trim()) {
      allParks.push({ id: p.place_id, name: p.name, lat: p.latitude, lng: p.longitude, city: p.city.trim(), state: stateCode, stateSlug: stateName });
    }
  });
});

const cityGroups = {};
allParks.forEach(p => {
  const key = `${p.state}|${p.city}`;
  if (!cityGroups[key]) cityGroups[key] = { state: p.state, stateSlug: p.stateSlug, city: p.city, lats: [], lngs: [], count: 0 };
  cityGroups[key].count++;
  cityGroups[key].lats.push(p.lat);
  cityGroups[key].lngs.push(p.lng);
});

const cities = Object.values(cityGroups).filter(c => c.count >= 2).map(c => ({
  state: c.state, stateName: STATE_NAMES[c.state] || c.state, stateSlug: c.stateSlug,
  city: c.city, citySlug: slugify(c.city), count: c.count,
  lat: c.lats.reduce((a, b) => a + b, 0) / c.lats.length,
  lng: c.lngs.reduce((a, b) => a + b, 0) / c.lngs.length,
})).sort((a, b) => b.count - a.count);

fs.writeFileSync(path.join(dataDir, "city-pages.json"), JSON.stringify(cities, null, 2));

const sitemapLines = cities.map(c => `  <url><loc>https://barkseeker.com/cities/${c.stateSlug}-${c.citySlug}</loc><lastmod>2026-04-10</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`);
fs.writeFileSync(path.join(__dirname, "..", "public", "sitemap-cities.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapLines.join("\n")}\n</urlset>`);

console.log(`Total city pages: ${cities.length}`);
console.log("\nTop 20:");
cities.slice(0, 20).forEach(c => console.log(`  ${c.city}, ${c.state}: ${c.count} parks`));
