const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "..", "src", "data");
const groomers = JSON.parse(fs.readFileSync(path.join(dataDir, "groomers.json"), "utf8"));

const STATE_SLUGS = {AL:"alabama",AK:"alaska",AZ:"arizona",AR:"arkansas",CA:"california",CO:"colorado",CT:"connecticut",DE:"delaware",DC:"washington-dc",FL:"florida",GA:"georgia",HI:"hawaii",ID:"idaho",IL:"illinois",IN:"indiana",IA:"iowa",KS:"kansas",KY:"kentucky",LA:"louisiana",ME:"maine",MD:"maryland",MA:"massachusetts",MI:"michigan",MN:"minnesota",MS:"mississippi",MO:"missouri",MT:"montana",NE:"nebraska",NV:"nevada",NH:"new-hampshire",NJ:"new-jersey",NM:"new-mexico",NY:"new-york",NC:"north-carolina",ND:"north-dakota",OH:"ohio",OK:"oklahoma",OR:"oregon",PA:"pennsylvania",RI:"rhode-island",SC:"south-carolina",SD:"south-dakota",TN:"tennessee",TX:"texas",UT:"utah",VT:"vermont",VA:"virginia",WA:"washington",WV:"west-virginia",WI:"wisconsin",WY:"wyoming"};
const STATE_NAMES = {AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",CT:"Connecticut",DE:"Delaware",FL:"Florida",GA:"Georgia",HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming"};

function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }

const cityMap = {};
for (const g of groomers) {
  const city = (g.city || "").trim();
  if (!city || city.length < 2) continue;
  const key = `${g.stateAbbr}|${city}`;
  if (!cityMap[key]) cityMap[key] = { state: g.stateAbbr, city, lats: [], lngs: [], count: 0 };
  cityMap[key].count++;
  if (g.latitude) cityMap[key].lats.push(g.latitude);
  if (g.longitude) cityMap[key].lngs.push(g.longitude);
}

const cities = Object.values(cityMap)
  .filter(c => c.count >= 2)
  .map(c => ({
    state: c.state,
    stateName: STATE_NAMES[c.state] || c.state,
    stateSlug: STATE_SLUGS[c.state] || slugify(c.state),
    city: c.city,
    citySlug: slugify(c.city),
    count: c.count,
    lat: c.lats.reduce((s, v) => s + v, 0) / c.lats.length,
    lng: c.lngs.reduce((s, v) => s + v, 0) / c.lngs.length,
  }))
  .sort((a, b) => b.count - a.count);

fs.writeFileSync(path.join(dataDir, "groomer-city-pages.json"), JSON.stringify(cities, null, 2));
console.log(`Groomer city pages: ${cities.length} cities (min 2 groomers)`);
console.log(`Top: ${cities.slice(0, 10).map(c => `${c.city},${c.state}(${c.count})`).join(" ")}`);

// Sitemap
const urls = cities.map(c => `  <url><loc>https://barkseeker.com/groomers/cities/${c.stateSlug}-${c.citySlug}</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>`);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
fs.writeFileSync(path.join(__dirname, "..", "public", "sitemap-groomer-cities.xml"), sitemap);
console.log(`Wrote sitemap-groomer-cities.xml (${urls.length} URLs)`);
