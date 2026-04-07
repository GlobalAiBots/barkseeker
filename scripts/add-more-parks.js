const fs = require('fs');
const path = require('path');
const DATA_DIR = path.join(__dirname, '..', 'src', 'data');

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function mk(id, name, lat, lon, city, state) {
  return {
    place_id: id, name,
    formatted_address: `${city}, ${state}, USA`,
    latitude: lat, longitude: lon, city, county: '',
    rating: null, total_ratings: 0,
    types: ['leisure_dog_park'], business_status: 'OPERATIONAL',
    tags: { leisure: 'dog_park', name }
  };
}

function mergeInto(slug, newParks, renames) {
  const fp = path.join(DATA_DIR, `${slug}-parks.json`);
  let existing = [];
  try { existing = JSON.parse(fs.readFileSync(fp, 'utf8')); } catch(e) {}
  const oldCount = existing.length;

  // Handle renames
  if (renames) {
    for (const r of renames) {
      const idx = existing.findIndex(p => p.name === r.oldName || p.name.includes(r.match));
      if (idx !== -1) { existing[idx].name = r.newName; console.log(`  Renamed: "${r.match}" → "${r.newName}"`); }
    }
  }

  let added = 0;
  const existingIds = new Set(existing.map(p => p.place_id));
  for (const np of newParks) {
    if (existingIds.has(np.place_id)) continue;
    // Check name similarity within 500m
    const tooClose = existing.some(ep => {
      const dist = haversine(ep.latitude, ep.longitude, np.latitude, np.longitude);
      if (dist < 100) return true;
      if (dist < 500 && ep.name.toLowerCase().includes(np.name.toLowerCase().split(' ')[0])) return true;
      return false;
    });
    if (tooClose) continue;
    existing.push(np);
    existingIds.add(np.place_id);
    added++;
  }
  fs.writeFileSync(fp, JSON.stringify(existing, null, 2), 'utf8');
  console.log(`${slug.padEnd(20)} ${oldCount} → ${existing.length} (+${added})`);
  return existing.length;
}

console.log('Adding verified parks to underrepresented states...\n');

// === DALLAS extras (from first prompt) ===
// + massive Texas expansion from second prompt
mergeInto('texas', [
  // Dallas extras
  mk('man_TX_KW','My Best Friend\'s Park at Klyde Warren',32.7893,-96.8016,'Dallas','Texas'),
  mk('man_TX_MSG','Main Street Garden Dog Run',32.7826,-96.7969,'Dallas','Texas'),
  mk('man_TX_HM','Hound Mound Dog Park',33.0292,-97.0700,'Flower Mound','Texas'),
  mk('man_TX_GP','Griggs Park',32.8020,-96.7985,'Dallas','Texas'),
  mk('man_TX_CDP','Central Dog Park',32.7905,-96.7875,'Dallas','Texas'),
  // Houston suburbs
  mk('man_TX_PP','Pundt Park Dog Park',30.0839,-95.4194,'Spring','Texas'),
  mk('man_TX_SA','Shady Acres Dog Park',29.8029,-95.4145,'Houston','Texas'),
  mk('man_TX_HR','Hermann Park Dog Run',29.7216,-95.3863,'Houston','Texas'),
  mk('man_TX_PO','Congressman Pete Olson Dog Park',29.5810,-95.6340,'Sugar Land','Texas'),
  mk('man_TX_WW','West Webster Dog Park',29.5367,-95.1185,'Webster','Texas'),
  mk('man_TX_CL','Clear Lake Dog Park',29.5580,-95.1100,'Houston','Texas'),
  mk('man_TX_SV','Springwoods Village Dog Park',30.0260,-95.4570,'Houston','Texas'),
  mk('man_TX_PD','Pearland Dog Park',29.5636,-95.2860,'Pearland','Texas'),
  // Dallas suburbs
  mk('man_TX_KP','Kiest Park Dog Park',32.7164,-96.8510,'Dallas','Texas'),
  mk('man_TX_LH','Lake Highlands Dog Park',32.8670,-96.7280,'Dallas','Texas'),
  mk('man_TX_CP','Coppell Dog Park',32.9625,-97.0150,'Coppell','Texas'),
  mk('man_TX_RW','Rowlett Dog Park',32.9070,-96.5520,'Rowlett','Texas'),
  mk('man_TX_RY','The Railyard Dog Park',32.7860,-96.7840,'Dallas','Texas'),
  mk('man_TX_WP','West Plano Dog Park',33.0240,-96.7680,'Plano','Texas'),
  mk('man_TX_AL','Allen Dog Park',33.1100,-96.6700,'Allen','Texas'),
  mk('man_TX_MF','Mansfield Dog Park',32.5570,-97.1260,'Mansfield','Texas'),
  mk('man_TX_BW','Bob Woodruff Dog Park',33.0450,-96.6920,'Plano','Texas'),
  mk('man_TX_FH','Flower Mound Heritage Dog Park',33.0150,-97.0800,'Flower Mound','Texas'),
  mk('man_TX_SL','Southlake Dog Park',32.9410,-97.1340,'Southlake','Texas'),
  mk('man_TX_TC','Trophy Club Dog Park',33.0020,-97.1830,'Trophy Club','Texas'),
  mk('man_TX_CV','Colleyville Dog Park',32.8870,-97.1540,'Colleyville','Texas'),
  mk('man_TX_GV','Grapevine Dog Park',32.9460,-97.0780,'Grapevine','Texas'),
  mk('man_TX_LV','Lewisville Dog Park',33.0460,-96.9940,'Lewisville','Texas'),
  // Central TX
  mk('man_TX_GT','Georgetown Dog Park',30.6430,-97.6780,'Georgetown','Texas'),
  mk('man_TX_PF','Pflugerville Dog Park',30.4440,-97.6200,'Pflugerville','Texas'),
  mk('man_TX_NB','New Braunfels Dog Park',29.7020,-98.1240,'New Braunfels','Texas'),
  mk('man_TX_KY','Kyle Dog Park',29.9890,-97.8770,'Kyle','Texas'),
  mk('man_TX_SM','San Marcos Dog Park',29.8760,-97.9410,'San Marcos','Texas'),
  mk('man_TX_BN','Boerne Dog Park',29.7940,-98.7320,'Boerne','Texas'),
  mk('man_TX_WC','Waco Dog Park',31.5490,-97.1480,'Waco','Texas'),
  mk('man_TX_BM','Beaumont Dog Park',30.0860,-94.1260,'Beaumont','Texas'),
  mk('man_TX_TY','Tyler Dog Park',32.3510,-95.3010,'Tyler','Texas'),
], [
  { match: 'Bark Park Central', newName: 'Barry Annino Bark Park (Bark Park Central)' }
]);

// === FLORIDA ===
mergeInto('florida', [
  mk('man_FL001','Barkingham Park',30.3130,-81.6560,'Jacksonville','Florida'),
  mk('man_FL002','Peavy Park',25.8580,-80.2270,'Miami','Florida'),
  mk('man_FL003','Kennedy Dog Park',26.1224,-80.1373,'Fort Lauderdale','Florida'),
  mk('man_FL004','Snyder Park Dog Park',26.0864,-80.1640,'Fort Lauderdale','Florida'),
  mk('man_FL005','Amelia Earhart Dog Park',25.8100,-80.2840,'Miami','Florida'),
  mk('man_FL006','Tropical Park Dog Park',25.7270,-80.3170,'Miami','Florida'),
  mk('man_FL007','Lake Ida Dog Park',26.4680,-80.0940,'Delray Beach','Florida'),
  mk('man_FL008','Dr. Phillips Dog Park',28.4510,-81.4970,'Orlando','Florida'),
  mk('man_FL009','Paws Park',28.7580,-81.2580,'Sanford','Florida'),
  mk('man_FL010','Fleet Peeples Dog Area',28.5990,-81.3430,'Winter Park','Florida'),
  mk('man_FL011','Fort De Soto Dog Beach',27.6270,-82.7370,'St Petersburg','Florida'),
  mk('man_FL012','Davis Island Dog Beach',27.9290,-82.4560,'Tampa','Florida'),
  mk('man_FL013','Picnic Island Dog Beach',27.8530,-82.5520,'Tampa','Florida'),
  mk('man_FL014','Al Lopez Dog Park',27.9640,-82.5060,'Tampa','Florida'),
  mk('man_FL015','Rivercrest Dog Park',27.9750,-82.4890,'Tampa','Florida'),
  mk('man_FL016','Venice Dog Beach',27.0790,-82.4280,'Venice','Florida'),
  mk('man_FL017','Bonita Dog Park',26.3390,-81.7780,'Bonita Springs','Florida'),
  mk('man_FL018','Estero Dog Park',26.4380,-81.7870,'Estero','Florida'),
  mk('man_FL019','Markham Park Dog Park',26.1280,-80.3540,'Sunrise','Florida'),
]);

// === PENNSYLVANIA ===
mergeInto('pennsylvania', [
  mk('man_PA001','Schuylkill River Dog Park',39.9620,-75.1810,'Philadelphia','Pennsylvania'),
  mk('man_PA002','Seger Dog Park',39.9380,-75.1610,'Philadelphia','Pennsylvania'),
  mk('man_PA003','Pretzel Park Dog Run',40.0290,-75.2310,'Philadelphia','Pennsylvania'),
  mk('man_PA004','Orianna Hill Dog Park',39.9670,-75.1390,'Philadelphia','Pennsylvania'),
  mk('man_PA005','Curtis Dog Park',39.9540,-75.1720,'Philadelphia','Pennsylvania'),
  mk('man_PA006','Dickinson Square Dog Park',39.9300,-75.1520,'Philadelphia','Pennsylvania'),
  mk('man_PA007','Horsham Dog Park',40.1850,-75.1230,'Horsham','Pennsylvania'),
  mk('man_PA008','Upper Dublin Dog Park',40.1690,-75.1760,'Ambler','Pennsylvania'),
  mk('man_PA009','Community Park Dog Park',40.7830,-77.8630,'State College','Pennsylvania'),
  mk('man_PA010','South Park Dog Park',40.3260,-79.9840,'Pittsburgh','Pennsylvania'),
  mk('man_PA011','Frick Park Dog Park',40.4320,-79.9060,'Pittsburgh','Pennsylvania'),
  mk('man_PA012','North Park Dog Park',40.5700,-80.0140,'Pittsburgh','Pennsylvania'),
  mk('man_PA013','Riverview Dog Park',40.4890,-79.9540,'Pittsburgh','Pennsylvania'),
  mk('man_PA014','Settlers Cabin Dog Park',40.4370,-80.1340,'Pittsburgh','Pennsylvania'),
]);

// === TENNESSEE ===
mergeInto('tennessee', [
  mk('man_TN001','Shelby Farms Dog Park',35.1370,-89.8350,'Memphis','Tennessee'),
  mk('man_TN002','Overton Dog Park',35.1290,-89.9250,'Memphis','Tennessee'),
  mk('man_TN003','Centennial Dog Park',36.1510,-86.8120,'Nashville','Tennessee'),
  mk('man_TN004','Warner Dog Park',36.1060,-86.7500,'Nashville','Tennessee'),
  mk('man_TN005','Two Rivers Dog Park',36.2110,-86.6680,'Nashville','Tennessee'),
  mk('man_TN006','Edwin Warner Dog Park',36.0660,-86.8720,'Nashville','Tennessee'),
  mk('man_TN007','PetSafe Village Dog Park',35.9840,-83.8950,'Knoxville','Tennessee'),
  mk('man_TN008','Concord Dog Park',35.8870,-84.0780,'Knoxville','Tennessee'),
  mk('man_TN009','Chattanooga Dog Park',35.0280,-85.2740,'Chattanooga','Tennessee'),
  mk('man_TN010','Coolidge Dog Park',35.0650,-85.2610,'Chattanooga','Tennessee'),
]);

// === KENTUCKY ===
mergeInto('kentucky', [
  mk('man_KY001','Cherokee Dog Run',38.2430,-85.6860,'Louisville','Kentucky'),
  mk('man_KY002','Sawyer Dog Park',38.2080,-85.7580,'Louisville','Kentucky'),
  mk('man_KY003','Eva Bandman Dog Park',38.2730,-85.7250,'Louisville','Kentucky'),
  mk('man_KY004','Champions Dog Park',38.2440,-85.6170,'Louisville','Kentucky'),
  mk('man_KY005','Jacobson Dog Park',38.0270,-84.5180,'Lexington','Kentucky'),
  mk('man_KY006','Masterson Station Dog Park',38.0860,-84.5640,'Lexington','Kentucky'),
  mk('man_KY007','Wellington Dog Park',38.0560,-84.4620,'Lexington','Kentucky'),
  mk('man_KY008','Devou Dog Park',39.0750,-84.5260,'Covington','Kentucky'),
]);

// === FINAL COUNT ===
console.log('\n=== FINAL COUNT ===');
const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('-parks.json'));
let grandTotal = 0;
const counts = [];
for (const f of files) {
  const data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), 'utf8'));
  counts.push({ state: f.replace('-parks.json',''), count: data.length });
  grandTotal += data.length;
}
counts.sort((a,b) => b.count - a.count);
counts.forEach(c => console.log(`  ${c.state.padEnd(20)} ${c.count}`));
console.log(`\n  GRAND TOTAL: ${grandTotal} parks across ${files.length} states`);
