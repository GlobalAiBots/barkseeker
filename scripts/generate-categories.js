const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "..", "src", "data");
const files = fs.readdirSync(dataDir).filter(f => f.endsWith("-parks.json"));

const STATE_SLUGS = {AL:"alabama",AK:"alaska",AZ:"arizona",AR:"arkansas",CA:"california",CO:"colorado",CT:"connecticut",DE:"delaware",FL:"florida",GA:"georgia",HI:"hawaii",ID:"idaho",IL:"illinois",IN:"indiana",IA:"iowa",KS:"kansas",KY:"kentucky",LA:"louisiana",ME:"maine",MD:"maryland",MA:"massachusetts",MI:"michigan",MN:"minnesota",MS:"mississippi",MO:"missouri",MT:"montana",NE:"nebraska",NV:"nevada",NH:"new-hampshire",NJ:"new-jersey",NM:"new-mexico",NY:"new-york",NC:"north-carolina",ND:"north-dakota",OH:"ohio",OK:"oklahoma",OR:"oregon",PA:"pennsylvania",RI:"rhode-island",SC:"south-carolina",SD:"south-dakota",TN:"tennessee",TX:"texas",UT:"utah",VT:"vermont",VA:"virginia",WA:"washington",WV:"west-virginia",WI:"wisconsin",WY:"wyoming"};
const STATE_NAMES = {};
Object.entries(STATE_SLUGS).forEach(([c, s]) => { STATE_NAMES[c] = s.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" "); });

// Load all parks
const allParks = [];
files.forEach(f => {
  const stateName = f.replace("-parks.json", "");
  const stateCode = Object.entries(STATE_SLUGS).find(([, s]) => s === stateName)?.[0] || "";
  JSON.parse(fs.readFileSync(path.join(dataDir, f), "utf8")).forEach(p => {
    allParks.push({ ...p, stateCode, stateSlug: stateName });
  });
});

// Define categories
const categories = [
  {
    slug: "fenced",
    title: "Fenced Dog Parks",
    description: "Fully fenced dog parks where your dog can play safely off-leash without risk of escaping.",
    match: (p) => {
      const t = p.tags || {};
      return t.barrier === "fence" || t.barrier === "yes" || t.fence === "yes";
    },
  },
  {
    slug: "off-leash",
    title: "Off-Leash Dog Parks",
    description: "Dog parks with designated off-leash areas where dogs can run free and socialize.",
    match: (p) => {
      const n = (p.name || "").toLowerCase();
      const t = p.tags || {};
      return n.includes("off-leash") || n.includes("off leash") || n.includes("unleash") || t.dog === "unleashed" || t.dog === "yes";
    },
  },
  {
    slug: "small-dog-area",
    title: "Dog Parks with Small Dog Areas",
    description: "Dog parks featuring separate areas for small dogs, so your little pup can play safely with similar-sized friends.",
    match: (p) => {
      const n = (p.name || "").toLowerCase();
      return n.includes("small dog") || n.includes("small breed") || n.includes("little dog");
    },
  },
  {
    slug: "water-access",
    title: "Dog Parks with Water Access",
    description: "Dog parks near lakes, beaches, creeks, or splash pads where your dog can swim and cool off.",
    match: (p) => {
      const n = (p.name || "").toLowerCase();
      return n.includes("beach") || n.includes("lake") || n.includes("creek") || n.includes("water") || n.includes("splash") || n.includes("pond") || n.includes("swim");
    },
  },
  {
    slug: "public-parks",
    title: "Public Dog Parks",
    description: "Free public dog parks open to all dogs and their owners, maintained by city or county governments.",
    match: (p) => {
      const t = p.tags || {};
      return t.access === "yes" || t.access === "public" || (t.operator_type || t["operator:type"] || "").includes("public");
    },
  },
];

const results = [];

for (const cat of categories) {
  const matching = allParks.filter(cat.match);
  if (matching.length < 10) {
    console.log(`SKIP ${cat.slug}: only ${matching.length} matches`);
    continue;
  }

  // Group by state
  const byState = {};
  matching.forEach(p => {
    const st = p.stateCode || "Unknown";
    if (!byState[st]) byState[st] = { code: st, name: STATE_NAMES[st] || st, slug: STATE_SLUGS[st] || "", count: 0, parkIds: [] };
    byState[st].count++;
    byState[st].parkIds.push(p.place_id);
  });

  results.push({
    slug: cat.slug,
    title: cat.title,
    description: cat.description,
    totalCount: matching.length,
    states: Object.values(byState).sort((a, b) => b.count - a.count),
  });

  console.log(`${cat.slug}: ${matching.length} parks across ${Object.keys(byState).length} states`);
}

fs.writeFileSync(path.join(dataDir, "categories.json"), JSON.stringify(results, null, 2));

// Sitemap
const sitemapLines = results.map(c => `  <url><loc>https://www.barkseeker.com/category/${c.slug}</loc><lastmod>2026-04-10</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`);
fs.writeFileSync(path.join(__dirname, "..", "public", "sitemap-categories.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapLines.join("\n")}\n</urlset>`);

console.log(`\nTotal categories: ${results.length}`);
console.log("Saved to src/data/categories.json and public/sitemap-categories.xml");
