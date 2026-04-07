const fs = require('fs');
const path = require('path');

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

function nameWords(name) {
  return name.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(w => w.length > 2);
}

function matchingWords(n1, n2) {
  const w1 = nameWords(n1);
  const w2 = new Set(nameWords(n2));
  return w1.filter(w => w2.has(w)).length;
}

const texasPath = path.join(__dirname, '..', 'src', 'data', 'texas-parks.json');
const dataDir = path.join(__dirname, '..', 'src', 'data');

const existing = JSON.parse(fs.readFileSync(texasPath, 'utf-8'));
const oldCount = existing.length;

const newParks = [
  // HOUSTON AREA
  ["Deputy Goforth Dog Park", 29.6200, -95.2100, "Houston"],
  ["Trail of the Lakes MUD Dog Park", 30.0100, -95.2700, "Humble"],
  ["Atascocita Park Dog Park", 29.9600, -95.1800, "Atascocita"],
  ["Lents Dog Park", 29.9200, -95.6200, "Houston"],
  ["McWilliams Dog Park", 29.7000, -95.3300, "Houston"],
  ["Dog Park at Deussen Park", 29.9700, -95.1700, "Houston"],
  ["Westwillow Dog Park", 29.8400, -95.5500, "Houston"],
  ["Gene Green Dog Park", 29.8900, -95.2200, "Houston"],
  ["Tom Bass Dog Park", 29.6300, -95.3900, "Houston"],
  ["Charterwood Dog Park", 29.8600, -95.5500, "Houston"],
  ["Borroughs Dog Park", 30.0900, -95.6200, "Tomball"],
  ["Danny Jackson Family Bark Park", 29.7300, -95.4400, "Houston"],
  ["Sneed Dog Park", 29.7200, -95.5100, "Houston"],
  ["Robindell Dog Park", 29.7000, -95.5000, "Houston"],
  ["Discovery Green Dog Run", 29.7520, -95.3560, "Houston"],
  ["Trebly Park Dog Park", 29.7500, -95.3700, "Houston"],
  ["Market Square Dog Run", 29.7600, -95.3600, "Houston"],
  ["Park For Humans And Dogs", 29.7600, -95.3700, "Houston"],
  ["Bagby Park Dog Park", 29.7570, -95.3800, "Houston"],
  ["Fonde Park Dog Park", 29.7200, -95.3500, "Houston"],
  ["Highland Meadow Dog Park", 29.5800, -95.1800, "Houston"],
  ["Maxey Park Dog Park", 29.6600, -95.4100, "Houston"],
  ["EaDog Park", 29.7530, -95.3560, "Houston"],
  ["Stella Dog Park", 29.7400, -95.3900, "Houston"],
  // HOUSTON SUBURBS
  ["Pawm Springs Dog Park", 29.6200, -95.6400, "Sugar Land"],
  ["City of Katy Off-Leash Dog Park", 29.7900, -95.8300, "Katy"],
  ["Elyson Dog Park", 29.8100, -95.8700, "Katy"],
  ["Tamarron Dog Park", 29.7600, -95.7600, "Katy"],
  ["Beverly Kaufman Dog Park Large", 29.8200, -95.8400, "Katy"],
  ["Cross Creek Ranch Canine Commons", 29.6300, -95.7400, "Katy"],
  ["FB MUD 35 Dog Park", 29.7300, -95.7800, "Katy"],
  ["League City Dog Park", 29.5100, -95.1000, "League City"],
  ["Bark Park at Countryside", 29.5100, -95.1200, "League City"],
  ["Bay Area Park Dog Park", 29.6200, -95.1300, "Pasadena"],
  ["Partnership Park Dog Park", 29.6600, -95.1600, "Pasadena"],
  ["Southdown Dog Park", 29.5600, -95.2900, "Pearland"],
  ["Independence Dog Park", 29.5650, -95.2850, "Pearland"],
  ["Highland Dog Park", 29.5800, -95.2850, "Pearland"],
  ["Texas Direct Auto Dog Park", 29.7000, -95.5800, "Meadows Place"],
  ["Old Friendswood City Park", 29.5300, -95.2000, "Friendswood"],
  ["Lake Nassau Park Dog Park", 29.5300, -95.1000, "Nassau Bay"],
  ["Texas City Dog Park", 29.3900, -94.9200, "Texas City"],
  ["Lucky Leash Dog Park", 29.5400, -95.1200, "Webster"],
  ["Jersey Village Dog Park", 29.8900, -95.5600, "Jersey Village"],
  ["Ella Friends Dog Park", 29.7100, -95.1200, "Deer Park"],
  ["La Porte Dog Park", 29.6700, -95.0200, "La Porte"],
  ["Riverstone Dog Park", 29.5700, -95.5800, "Sugar Land"],
  ["Sienna Dog Park", 29.5750, -95.5750, "Missouri City"],
  ["Kitty Hollow Park Dog Park", 29.5800, -95.5600, "Missouri City"],
  ["Baytown Bark Park", 29.7500, -94.9700, "Baytown"],
  ["Hackberry Dog Park", 29.8500, -94.8800, "Mont Belvieu"],
  // WOODLANDS/SPRING/CONROE
  ["Cattail Park Dog Park", 30.1700, -95.5100, "The Woodlands"],
  ["Gleannloch Farms Bark Park", 30.0700, -95.5700, "Spring"],
  ["Rob Fleming Dog Park", 30.1400, -95.5100, "Spring"],
  ["Meyer Dog Park", 30.0700, -95.5000, "Spring"],
  ["Bibi Mini-Me Bush Dog Park", 30.0500, -95.4200, "Spring"],
  ["Bear Branch Dog Park", 30.1800, -95.5000, "The Woodlands"],
  ["Woodsons Reserve Dog Park", 30.1200, -95.4300, "Spring"],
  ["Burroughs Off Leash Trail", 30.1700, -95.4600, "The Woodlands"],
  ["Tamarac Park Dog Park", 30.1400, -95.4800, "The Woodlands"],
  ["Wiggins Village Park Dog Park", 30.3200, -95.4800, "Conroe"],
  ["Conroe Dog Park", 30.3250, -95.4750, "Conroe"],
  ["Walden Dog Park", 30.3800, -95.7000, "Montgomery"],
  ["Admiral Bark Park", 30.3900, -95.7050, "Montgomery"],
  ["HCMUD Dog Park", 30.0100, -95.2700, "Humble"],
  // DFW METROPLEX
  ["Bark Park at Bear Creek", 32.8800, -97.0800, "Grapevine"],
  ["Dog Park at Windhaven Meadows", 33.0500, -96.7600, "Plano"],
  ["Ruff Range Dog Park", 33.1500, -96.8200, "Frisco"],
  ["The Shacks Dining Dog Park", 33.0900, -96.8900, "The Colony"],
  ["Pawsome Playground Dog Park", 33.0900, -96.8700, "The Colony"],
  ["North Lakes Dog Park", 33.1500, -97.1000, "Denton"],
  ["Euless Dog Park", 32.8500, -97.0800, "Euless"],
  ["City of Hurst Dog Park", 32.8300, -97.1700, "Hurst"],
  ["Barney Wood Bark Park", 32.9300, -96.8800, "Farmers Branch"],
  ["K9 Pointe Dog Park", 32.9300, -97.2500, "Keller"],
  ["Bedford Bark Park", 32.8400, -97.1400, "Bedford"],
  ["NRH Tipps Canine Hollow", 32.8600, -97.2200, "North Richland Hills"],
  ["MUTTS Canine Cantina Dallas", 32.8100, -96.8000, "Dallas"],
  ["Paws Colinas Dog Park", 32.8700, -96.9400, "Dallas"],
  ["Redding Trail Dog Park", 32.9300, -96.8400, "Dallas"],
  ["Swiss Liberty Dog Park", 32.7800, -96.7700, "Dallas"],
  ["Elmwoof Dog Park", 32.7800, -96.8000, "Dallas"],
  ["Rosemeade Dog Park", 32.9800, -96.9100, "Carrollton"],
  ["McInnish Dog Park", 32.9700, -96.9100, "Carrollton"],
  ["Bush Central Barkway", 32.9600, -96.7300, "Richardson"],
  ["CityLine Dog Park", 32.9600, -96.7100, "Richardson"],
  ["Bark Yard Allen", 33.1100, -96.6700, "Allen"],
  ["Mutts Canine Cantina Allen", 33.1100, -96.6800, "Allen"],
  ["Bonnie Wenk Park Dog Park", 33.2000, -96.6800, "McKinney"],
  ["K9 Corral Craig Ranch", 33.2000, -96.6400, "McKinney"],
  ["Wood Family Dog Park", 33.1500, -96.8300, "Frisco"],
  ["Frisco Hills Dog Park", 33.0400, -96.9400, "Little Elm"],
  ["Dog Park Toyota Lewisville", 33.0400, -96.9900, "Lewisville"],
  ["Boo Boos Buddies Dog Park", 32.9400, -97.1300, "Southlake"],
  ["Lakeside Dog Park", 33.0300, -97.0800, "Flower Mound"],
  ["Union Park Bark Park", 33.2500, -96.9500, "Aubrey"],
  ["Canyon Falls Dog Park", 33.1200, -97.1200, "Northlake"],
  ["Corinth Bark Park", 33.1500, -97.0700, "Corinth"],
  ["Spruill Dog Park", 32.9600, -96.8400, "Addison"],
  ["Harry Myers Dog Park", 32.9300, -96.4600, "Rockwall"],
  ["Herfurth Park Dog Park", 32.9100, -96.5500, "Rowlett"],
  ["Prairie Tails Dog Park", 32.9500, -96.5400, "Wylie"],
  ["City of Mesquite Dog Park", 32.7700, -96.6000, "Mesquite"],
  ["Copeland Dog Park", 32.7500, -96.5900, "Mesquite"],
  ["Lancaster Dog Park", 32.5900, -96.7600, "Lancaster"],
  ["Mans Best Field Dog Park", 32.5600, -97.1300, "Mansfield"],
  ["Wags-A-Hachie Dog Park", 32.3900, -96.8400, "Waxahachie"],
  ["Midlothian Dog Park", 32.4800, -96.9900, "Midlothian"],
  ["Central Bark Dog Park Grand Prairie", 32.7200, -97.0200, "Grand Prairie"],
  ["Freedom Dog Park Roanoke", 33.0100, -97.2300, "Roanoke"],
  ["Willow Creek Paw Park", 32.8600, -97.3800, "Saginaw"],
  ["Paces Crossing Dog Park", 33.2000, -97.1300, "Denton"],
  // FORT WORTH AREA
  ["Z Boaz Dog Park", 32.7200, -97.4300, "Fort Worth"],
  ["MUTTS Canine Cantina Fort Worth", 32.7300, -97.3500, "Fort Worth"],
  ["Calhound Dog Park", 32.7500, -97.3300, "Fort Worth"],
  ["Bark Park at First Flight", 32.7550, -97.3350, "Fort Worth"],
  ["Golden Triangle Dog Park", 32.7900, -97.3300, "Fort Worth"],
  ["Basswood Dog Park", 32.7250, -97.4250, "Fort Worth"],
  ["Lake Worth Dog Park", 32.7600, -97.4500, "Lake Worth"],
  ["Cherry Lane Dog Park", 32.7600, -97.4100, "White Settlement"],
  ["Remi Dog Park", 32.7650, -97.4350, "White Settlement"],
  ["Burleson Bark Park", 32.5400, -97.3200, "Burleson"],
  ["Patsy Hooks Dog Park", 32.7600, -97.7900, "Weatherford"],
  // ARLINGTON
  ["Rush Creek Dog Park", 32.7100, -97.0500, "Arlington"],
  ["Tails N Trails Dog Park", 32.7100, -97.1000, "Arlington"],
  // AUSTIN AREA
  ["Mary Moore Searight Off Leash Trail", 30.1800, -97.7900, "Austin"],
  ["Willow Bend Dog Park", 30.2400, -97.7600, "Austin"],
  ["The Watering Bowl", 30.1700, -97.8200, "Austin"],
  ["Hancock Dog Park", 30.3100, -97.7200, "Austin"],
  ["Onion Creek Off-Leash Trail", 30.1850, -97.7650, "Austin"],
  ["Domain Central Dog Park", 30.4000, -97.7200, "Austin"],
  ["Great Northern Dog Park", 30.4400, -97.7400, "Austin"],
  ["Pickles Place Dog Park", 30.2100, -97.8200, "Austin"],
  ["Northtown Dog Park", 30.4400, -97.6200, "Pflugerville"],
  ["Falcon Pointe Dog Park", 30.4500, -97.5800, "Pflugerville"],
  ["Stone Hill Dog Park", 30.4400, -97.6500, "Pflugerville"],
  ["Cedar Bark Park", 30.5200, -97.8200, "Cedar Park"],
  ["London Lane Dog Park", 30.5250, -97.8250, "Cedar Park"],
  ["Dog House Drinkery Dog Park", 30.5800, -97.8600, "Leander"],
  ["Garey Park Dog Ranch", 30.5700, -97.8500, "Leander"],
  ["Georgetown Bark Park", 30.6300, -97.6800, "Georgetown"],
  ["Brushy Creek Dog Park", 30.5800, -97.5500, "Hutto"],
  ["Buda Sportplex Dog Park", 30.0800, -97.8400, "Buda"],
  ["250 Charles Austin Dr Dog Park", 29.8800, -97.9400, "San Marcos"],
  ["Headwaters Dog Park", 30.1900, -98.0900, "Dripping Springs"],
  ["Santa Rita Bark Park", 30.6600, -97.9700, "Liberty Hill"],
  ["New Braunfels Puppy Playland", 29.7000, -98.1200, "New Braunfels"],
  // SOUTH TEXAS/VALLEY
  ["Bill Witt City Park Dog Park", 27.7500, -97.3900, "Corpus Christi"],
  ["Kaiah Dog Park", 27.8800, -97.3300, "Portland"],
  ["Rockport Dog Park", 28.0200, -97.0500, "Rockport"],
  ["Aransas Pass Dog Park", 27.9100, -97.1500, "Aransas Pass"],
  ["Port Aransas Dog Park", 27.8300, -97.0600, "Port Aransas"],
  ["Harlingen Rotary Bark Park", 26.1900, -97.7000, "Harlingen"],
  ["Bentsen Palm Community Dog Park", 26.2000, -98.3200, "Mission"],
  ["Edinburg Bicentennial Dog Park", 26.3000, -98.1600, "Edinburg"],
  ["McAllen Dog Park", 26.2200, -98.2400, "McAllen"],
  ["Weslaco Dog Park", 26.1600, -97.9900, "Weslaco"],
  ["Catherine Stillman Dog Park", 25.9700, -97.3900, "Olmito"],
  ["Redmore Dog Park", 25.9300, -97.4800, "Brownsville"],
  ["Morningside Park", 25.9350, -97.4750, "Brownsville"],
  ["Dick Kleberg Dog Park", 27.5200, -97.8800, "Kingsville"],
  // CENTRAL TEXAS
  ["Heritage Park Dog Run", 31.0600, -97.4600, "Belton"],
  ["Central Texas Bark Park", 31.0800, -97.3700, "Temple"],
  ["Purser Family Dog Park", 31.0800, -97.6800, "Harker Heights"],
  ["Mickeys Dog Park", 31.1000, -97.7300, "Killeen"],
  ["Yowell Ranch Dog Park", 31.1200, -97.7500, "Killeen"],
  ["Schertz Dog Park", 29.5700, -98.2700, "Schertz"],
  ["Takas Windcrest City Park", 29.5200, -98.3800, "Windcrest"],
  ["La Vernia City Dog Park", 29.3600, -98.1100, "La Vernia"],
  ["Barky Park Seguin", 29.5700, -97.9600, "Seguin"],
  // EAST TEXAS
  ["Stragent Dog Park", 32.5100, -94.7400, "Longview"],
  ["Bossart Bark Park", 32.3500, -95.3000, "Tyler"],
  ["Bath Miller Park Dog Park", 32.5400, -94.3500, "Marshall"],
  ["City of Lindale Dog Park", 32.5200, -95.4100, "Lindale"],
  ["Graham Park Dog Park", 33.1000, -96.1100, "Greenville"],
  ["Commerce Dog Park", 33.2500, -95.9000, "Commerce"],
  ["Gun Barrel City Dog Park", 32.3300, -96.1500, "Gun Barrel City"],
  ["Ida Reed Dog Park", 30.0800, -94.1000, "Beaumont"],
  ["Lumberton Dog Park", 30.2600, -94.2000, "Lumberton"],
  ["Banita Creek Park Dog Park", 31.6100, -94.6600, "Nacogdoches"],
  ["Lufkin Dog Park", 31.3400, -94.8500, "Lufkin"],
  ["Pawhurst Dog Park", 30.0900, -93.7400, "Orange"],
  ["Canfield Park Dog Park", 30.0600, -94.7800, "Liberty"],
  ["Fairview Park Dog Park", 33.6400, -96.6200, "Sherman"],
  ["Waterloo Lake Dog Park", 33.7600, -96.5900, "Denison"],
  ["Dog Depot Heritage Park", 33.6300, -97.1300, "Gainesville"],
  ["Bridgewater Community Dog Park", 33.1600, -96.5000, "Princeton"],
  ["Natural Springs Dog Park", 33.3500, -96.5500, "Anna"],
  ["Spring Lake Park Dog Park", 33.4500, -94.0500, "Texarkana"],
  // WEST TEXAS
  ["Tierra Buena Dog Park", 31.7600, -106.3600, "El Paso"],
  ["Argal Dog Park", 31.8000, -106.4100, "El Paso"],
  ["Joey Barraza Vino Memorial Dog Park", 31.9200, -106.4200, "El Paso"],
  ["Pavo Real Splash Park", 31.7700, -106.4500, "El Paso"],
  ["Eastwood Dog Park", 31.7700, -106.4200, "El Paso"],
  ["Hogans Run Dog Park", 32.0400, -102.1300, "Midland"],
  ["Waggin Trail Beal Dog Park", 31.9700, -102.1000, "Midland"],
  ["San Angelo Dog Park", 31.4500, -100.4200, "San Angelo"],
  ["Del Rio Community Dog Park", 29.3600, -100.8900, "Del Rio"],
  ["Dukos Dog Park", 27.5100, -99.5100, "Laredo"],
  ["Independence Hills Dog Park", 27.5100, -99.4800, "Laredo"],
  ["K9 Kimmies Corner Dog Park", 27.5200, -99.4800, "Laredo"],
  ["Maxey Bark Park", 31.4200, -103.4900, "Pecos"],
  ["Silliman Dog Park", 30.8900, -103.5000, "Fort Stockton"],
  ["Alpine Dog Park", 30.3600, -103.6600, "Alpine"],
  // PANHANDLE/NORTH
  ["Thompson Dog Park", 35.1700, -101.8900, "Amarillo"],
  ["Critter Camps Bark Park", 35.1700, -101.9200, "Amarillo"],
  ["Wichita Falls Dog Park", 33.8900, -98.5100, "Wichita Falls"],
  ["Hobart Street Dog Park", 35.4400, -100.9700, "Pampa"],
  ["Borger Dog Park", 35.6700, -101.4000, "Borger"],
  ["Colorado City Allsups Dog Park", 32.3900, -100.8600, "Colorado City"],
  // LUBBOCK
  ["McAlister Dog Park Lubbock", 33.5700, -101.8500, "Lubbock"],
  ["Hub City Unleashed", 33.5700, -101.8600, "Lubbock"],
  // OTHER
  ["Steeplechase Park Dog Park", 30.6200, -96.3300, "College Station"],
  ["University Park Dog Park", 30.6100, -96.3100, "College Station"],
  ["Huntsville Dog Park", 30.7200, -95.5500, "Huntsville"],
  ["Pineview Park Dog Park", 30.7300, -95.5600, "Huntsville"],
  ["Bay City Dog Park", 28.9800, -95.9700, "Bay City"],
  ["BASF Dog Park", 29.0500, -95.4300, "Lake Jackson"],
  ["Officer Cash Memorial Dog Park", 29.1600, -95.4300, "Angleton"],
  ["Cuero Municipal Dog Park", 29.0900, -97.2900, "Cuero"],
  ["Riverside Dog Park", 28.8000, -96.9800, "Victoria"],
  ["Flat Rock Park Dog Run", 30.0500, -99.1400, "Kerrville"],
  ["Ruff Park", 30.5800, -98.2800, "Marble Falls"],
  ["Granbury Bark Park", 32.4400, -97.7900, "Granbury"],
  ["Woof Way Dog Park", 31.5500, -97.1700, "Woodway"],
  ["Holly Dog Park", 31.5500, -97.1500, "Waco"],
  ["Camp Barkeley Dog Park", 32.4500, -99.7200, "Abilene"],
  ["Newman Dog Park", 32.4700, -100.4100, "Sweetwater"],
  ["Southeast Park Dog Park", 34.9800, -101.9200, "Canyon"],
];

// Build entries
function buildEntry(name, lat, lon, city) {
  return {
    place_id: `manual_tx_${slugify(name)}`,
    name,
    formatted_address: `${city}, Texas, USA`,
    latitude: lat,
    longitude: lon,
    city,
    county: "",
    rating: null,
    total_ratings: 0,
    types: ["leisure_dog_park"],
    business_status: "OPERATIONAL",
    tags: { leisure: "dog_park", name }
  };
}

// Step 1: Add new parks with dedup against existing
let added = 0;
let skipped = 0;
const combined = [...existing];

for (const [name, lat, lon, city] of newParks) {
  let dominated = false;
  for (const ex of combined) {
    const dist = haversine(lat, lon, ex.latitude, ex.longitude);
    if (dist < 200) {
      dominated = true;
      break;
    }
    if (dist < 500 && matchingWords(name, ex.name) >= 2) {
      dominated = true;
      break;
    }
  }
  if (dominated) {
    skipped++;
  } else {
    combined.push(buildEntry(name, lat, lon, city));
    added++;
  }
}

console.log(`Old count: ${oldCount}`);
console.log(`Added: ${added}`);
console.log(`Skipped (dedup on insert): ${skipped}`);

// Step 2: Final dedup pass - remove entries within 200m of each other (keep longer name)
let deduped = 0;
const toRemove = new Set();

for (let i = 0; i < combined.length; i++) {
  if (toRemove.has(i)) continue;
  for (let j = i + 1; j < combined.length; j++) {
    if (toRemove.has(j)) continue;
    const dist = haversine(combined[i].latitude, combined[i].longitude, combined[j].latitude, combined[j].longitude);
    if (dist < 200) {
      // Keep the one with the longer name
      const removeIdx = combined[i].name.length >= combined[j].name.length ? j : i;
      toRemove.add(removeIdx);
      deduped++;
      if (removeIdx === i) break; // i was removed, stop comparing
    }
  }
}

const final = combined.filter((_, idx) => !toRemove.has(idx));

console.log(`Deduped (final pass): ${deduped}`);
console.log(`New count: ${final.length}`);

// Save
fs.writeFileSync(texasPath, JSON.stringify(final, null, 2) + '\n');
console.log(`Saved to ${texasPath}`);

// Grand total across all *-parks.json files
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('-parks.json'));
let grandTotal = 0;
for (const f of files) {
  const data = JSON.parse(fs.readFileSync(path.join(dataDir, f), 'utf-8'));
  grandTotal += data.length;
}
console.log(`\nGrand total across ${files.length} state files: ${grandTotal}`);
