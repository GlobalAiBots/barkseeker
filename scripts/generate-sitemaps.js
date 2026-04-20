const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "..", "public");
const dataDir = path.join(__dirname, "..", "src", "data");

const groomers = JSON.parse(fs.readFileSync(path.join(dataDir, "groomers.json"), "utf8"));
const vets = JSON.parse(fs.readFileSync(path.join(dataDir, "vets.json"), "utf8"));

const STATE_SLUGS = {AL:"alabama",AK:"alaska",AZ:"arizona",AR:"arkansas",CA:"california",CO:"colorado",CT:"connecticut",DE:"delaware",DC:"washington-dc",FL:"florida",GA:"georgia",HI:"hawaii",ID:"idaho",IL:"illinois",IN:"indiana",IA:"iowa",KS:"kansas",KY:"kentucky",LA:"louisiana",ME:"maine",MD:"maryland",MA:"massachusetts",MI:"michigan",MN:"minnesota",MS:"mississippi",MO:"missouri",MT:"montana",NE:"nebraska",NV:"nevada",NH:"new-hampshire",NJ:"new-jersey",NM:"new-mexico",NY:"new-york",NC:"north-carolina",ND:"north-dakota",OH:"ohio",OK:"oklahoma",OR:"oregon",PA:"pennsylvania",RI:"rhode-island",SC:"south-carolina",SD:"south-dakota",TN:"tennessee",TX:"texas",UT:"utah",VT:"vermont",VA:"virginia",WA:"washington",WV:"west-virginia",WI:"wisconsin",WY:"wyoming"};

function writeSitemap(filename, urls) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
  fs.writeFileSync(path.join(publicDir, filename), xml);
  console.log(`${filename}: ${urls.length} URLs`);
}

// Groomer sitemaps
const groomerStates = [...new Set(groomers.map(g => g.stateAbbr))];
const groomerStateUrls = groomerStates.map(s => `  <url><loc>https://www.barkseeker.com/groomers/${STATE_SLUGS[s] || s.toLowerCase()}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`);
const groomerUrls = groomers.filter(g => g.slug).map(g => `  <url><loc>https://www.barkseeker.com/groomers/${g.slug}</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>`);

// Split if > 45K (leave room)
if (groomerUrls.length > 45000) {
  const half = Math.ceil(groomerUrls.length / 2);
  writeSitemap("sitemap-groomers-1.xml", groomerUrls.slice(0, half));
  writeSitemap("sitemap-groomers-2.xml", groomerUrls.slice(half));
} else {
  writeSitemap("sitemap-groomers.xml", [
    `  <url><loc>https://www.barkseeker.com/groomers</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    ...groomerStateUrls,
    ...groomerUrls,
  ]);
}

// Vet sitemaps
const vetStates = [...new Set(vets.map(v => v.stateAbbr))];
const vetStateUrls = vetStates.map(s => `  <url><loc>https://www.barkseeker.com/vets/${STATE_SLUGS[s] || s.toLowerCase()}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`);
const vetUrls = vets.filter(v => v.slug).map(v => `  <url><loc>https://www.barkseeker.com/vets/${v.slug}</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>`);

if (vetUrls.length > 45000) {
  const half = Math.ceil(vetUrls.length / 2);
  writeSitemap("sitemap-vets-1.xml", vetUrls.slice(0, half));
  writeSitemap("sitemap-vets-2.xml", vetUrls.slice(half));
} else {
  writeSitemap("sitemap-vets.xml", [
    `  <url><loc>https://www.barkseeker.com/vets</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    ...vetStateUrls,
    ...vetUrls,
  ]);
}

// Pet insurance + blog sitemaps entries for main sitemap
writeSitemap("sitemap-pet-insurance.xml", [
  `  <url><loc>https://www.barkseeker.com/pet-insurance</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`,
]);

// Update sitemap index
const existing = fs.readFileSync(path.join(publicDir, "sitemap.xml"), "utf8");
const newSitemaps = [
  "sitemap-groomers.xml", "sitemap-vets.xml",
  "sitemap-groomer-cities.xml", "sitemap-vet-cities.xml",
  "sitemap-pet-insurance.xml",
];

let updated = existing;
for (const sm of newSitemaps) {
  const entry = `  <sitemap><loc>https://www.barkseeker.com/${sm}</loc></sitemap>`;
  if (!updated.includes(sm)) {
    updated = updated.replace("</sitemapindex>", `${entry}\n</sitemapindex>`);
  }
}
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), updated);
console.log("Updated sitemap.xml index");
