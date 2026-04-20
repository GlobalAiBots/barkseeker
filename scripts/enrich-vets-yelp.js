// Enrich vets.json with Yelp ratings.
// Only touches records where rating is null or 0. Keeps existing data on no-match.
//
// Run: node --env-file=.env.local scripts/enrich-vets-yelp.js
// Optional: MAX_RECORDS=500 node --env-file=.env.local scripts/enrich-vets-yelp.js

import path from "node:path";
import { dice, milesBetween, searchYelp, sleep, readJson, writeJson } from "./_yelp-common.js";

const DATA_PATH = path.resolve("src/data/vets.json");
const CATEGORY = "vet";
const SLEEP_MS = 200;
const SAVE_EVERY = 50;
const NAME_THRESHOLD = 0.8;
const MAX_MILES = 15;
const MAX_RECORDS = parseInt(process.env.MAX_RECORDS || "999999", 10);

async function main() {
  console.log(`Loading ${DATA_PATH}...`);
  const data = readJson(DATA_PATH);
  const needs = data
    .map((r, i) => ({ r, i }))
    .filter(({ r }) => (r.rating == null || r.rating === 0) && r.city && r.name && r.stateAbbr);
  console.log(`Total vets: ${data.length}`);
  console.log(`Need enrichment: ${needs.length}`);
  console.log(`Max this run: ${Math.min(MAX_RECORDS, needs.length)}`);
  console.log("");

  let enriched = 0, noMatch = 0, errors = 0, processed = 0;
  const startedAt = Date.now();
  const toProcess = needs.slice(0, MAX_RECORDS);

  for (let n = 0; n < toProcess.length; n++) {
    const { r, i } = toProcess[n];
    processed = n + 1;

    try {
      const json = await searchYelp({ term: r.name, city: r.city, stateAbbr: r.stateAbbr, category: CATEGORY });
      const candidates = json.businesses || [];

      let best = null, bestScore = 0;
      for (const c of candidates) {
        const score = dice(r.name, c.name);
        const miles = milesBetween(r.latitude, r.longitude, c.coordinates?.latitude, c.coordinates?.longitude);
        if (score > bestScore && miles <= MAX_MILES) {
          best = c; bestScore = score;
        }
      }

      if (best && bestScore >= NAME_THRESHOLD) {
        data[i].rating = best.rating ?? 0;
        data[i].reviewCount = best.review_count ?? 0;
        if (!data[i].phone && best.display_phone) data[i].phone = best.display_phone;
        if (!data[i].phone && best.phone) data[i].phone = best.phone;
        if (!data[i].website && best.url) data[i].website = best.url.split("?")[0];
        data[i].yelpMatched = true;
        data[i].yelpMatchScore = Number(bestScore.toFixed(2));
        enriched++;
      } else {
        noMatch++;
      }
    } catch (e) {
      if (e.message === "RATE_LIMIT") {
        console.log(`\nYelp rate limit hit after ${processed} processed. Saving progress and stopping.`);
        break;
      }
      errors++;
      if (errors <= 3) console.log(`  error on "${r.name}" (${r.city}, ${r.stateAbbr}): ${e.message}`);
    }

    if (processed % SAVE_EVERY === 0) {
      writeJson(DATA_PATH, data);
      const elapsed = ((Date.now() - startedAt) / 1000).toFixed(0);
      console.log(`[${processed}/${toProcess.length}] enriched=${enriched} noMatch=${noMatch} errors=${errors} (${elapsed}s)`);
    }

    await sleep(SLEEP_MS);
  }

  writeJson(DATA_PATH, data);
  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(0);
  console.log(`\n=== VETS ENRICHMENT DONE ===`);
  console.log(`Processed: ${processed}`);
  console.log(`Enriched: ${enriched}`);
  console.log(`No match: ${noMatch}`);
  console.log(`Errors: ${errors}`);
  console.log(`Elapsed: ${elapsed}s`);
  console.log(`Remaining unenriched in file: ${needs.length - enriched}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
