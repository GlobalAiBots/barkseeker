const fs = require("fs");
const path = require("path");

const stateData = {
  alabama: { name: "Alabama", highlights: "Birmingham, Huntsville, and Mobile" },
  arizona: { name: "Arizona", highlights: "Phoenix, Tucson, and Scottsdale" },
  arkansas: { name: "Arkansas", highlights: "Little Rock, Fayetteville, and Bentonville" },
  california: { name: "California", highlights: "Los Angeles, San Francisco, and San Diego" },
  colorado: { name: "Colorado", highlights: "Denver, Boulder, and Colorado Springs" },
  connecticut: { name: "Connecticut", highlights: "Hartford, New Haven, and Stamford" },
  delaware: { name: "Delaware", highlights: "Wilmington, Newark, and Dover" },
  florida: { name: "Florida", highlights: "Miami, Tampa, and Orlando" },
  georgia: { name: "Georgia", highlights: "Atlanta, Savannah, and Augusta" },
  hawaii: { name: "Hawaii", highlights: "Honolulu, Maui, and the Big Island" },
  idaho: { name: "Idaho", highlights: "Boise, Coeur d&apos;Alene, and Idaho Falls" },
  illinois: { name: "Illinois", highlights: "Chicago, Springfield, and Naperville" },
  indiana: { name: "Indiana", highlights: "Indianapolis, Fort Wayne, and Bloomington" },
  iowa: { name: "Iowa", highlights: "Des Moines, Cedar Rapids, and Iowa City" },
  kansas: { name: "Kansas", highlights: "Wichita, Overland Park, and Lawrence" },
  kentucky: { name: "Kentucky", highlights: "Louisville, Lexington, and Bowling Green" },
  louisiana: { name: "Louisiana", highlights: "New Orleans, Baton Rouge, and Lafayette" },
  maine: { name: "Maine", highlights: "Portland, Bangor, and Bar Harbor" },
  maryland: { name: "Maryland", highlights: "Baltimore, Annapolis, and Bethesda" },
  massachusetts: { name: "Massachusetts", highlights: "Boston, Cambridge, and Worcester" },
  michigan: { name: "Michigan", highlights: "Detroit, Grand Rapids, and Ann Arbor" },
  minnesota: { name: "Minnesota", highlights: "Minneapolis, Saint Paul, and Duluth" },
  mississippi: { name: "Mississippi", highlights: "Jackson, Gulfport, and Hattiesburg" },
  missouri: { name: "Missouri", highlights: "St. Louis, Kansas City, and Springfield" },
  montana: { name: "Montana", highlights: "Billings, Missoula, and Bozeman" },
  nebraska: { name: "Nebraska", highlights: "Omaha, Lincoln, and Grand Island" },
  nevada: { name: "Nevada", highlights: "Las Vegas, Reno, and Henderson" },
  "new-hampshire": { name: "New Hampshire", highlights: "Manchester, Nashua, and Concord" },
  "new-jersey": { name: "New Jersey", highlights: "Newark, Jersey City, and Princeton" },
  "new-mexico": { name: "New Mexico", highlights: "Albuquerque, Santa Fe, and Las Cruces" },
  "new-york": { name: "New York", highlights: "New York City, Buffalo, and Rochester" },
  "north-carolina": { name: "North Carolina", highlights: "Charlotte, Raleigh, and Asheville" },
  "north-dakota": { name: "North Dakota", highlights: "Fargo, Bismarck, and Grand Forks" },
  ohio: { name: "Ohio", highlights: "Columbus, Cleveland, and Cincinnati" },
  oklahoma: { name: "Oklahoma", highlights: "Oklahoma City, Tulsa, and Norman" },
  oregon: { name: "Oregon", highlights: "Portland, Eugene, and Bend" },
  pennsylvania: { name: "Pennsylvania", highlights: "Philadelphia, Pittsburgh, and Harrisburg" },
  "south-carolina": { name: "South Carolina", highlights: "Charleston, Columbia, and Greenville" },
  "south-dakota": { name: "South Dakota", highlights: "Sioux Falls, Rapid City, and Aberdeen" },
  tennessee: { name: "Tennessee", highlights: "Nashville, Memphis, and Knoxville" },
  texas: { name: "Texas", highlights: "Austin, Houston, Dallas, and San Antonio" },
  utah: { name: "Utah", highlights: "Salt Lake City, Provo, and Park City" },
  virginia: { name: "Virginia", highlights: "Richmond, Virginia Beach, and Arlington" },
  washington: { name: "Washington", highlights: "Seattle, Spokane, and Tacoma" },
  "west-virginia": { name: "West Virginia", highlights: "Charleston, Morgantown, and Huntington" },
  wyoming: { name: "Wyoming", highlights: "Cheyenne, Casper, and Jackson" },
};

const appDir = path.join(__dirname, "..", "src", "app");
let updated = 0, skipped = 0;

for (const [slug, info] of Object.entries(stateData)) {
  const filePath = path.join(appDir, slug, "page.tsx");
  if (!fs.existsSync(filePath)) { skipped++; continue; }
  let content = fs.readFileSync(filePath, "utf8");
  if (content.includes("Tips for Visiting")) { skipped++; continue; }

  // Find hero section end
  const heroEnd = content.indexOf("</section>", content.indexOf("md:text-5xl"));
  if (heroEnd === -1) { skipped++; continue; }
  const insertPoint = heroEnd + "</section>".length;

  const introBlock = `

      {/* State intro + tips */}
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-2">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">Dog Parks in ${info.name}</h2>
          <p className="text-gray-600 leading-relaxed text-sm">${info.name} has {stParks.length.toLocaleString()} dog parks listed on BarkSeeker, with off-leash areas, fenced parks, and dog-friendly trails across the state. Popular areas include ${info.highlights}. Whether your pup needs room to run or a safe space to socialize, you&apos;ll find a park nearby.</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
          <h3 className="font-[Cabin] font-bold text-forest mb-3">Tips for Visiting Dog Parks in ${info.name}</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Always supervise your dog &mdash; don&apos;t leave them unattended at any dog park.</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Make sure your dog is current on all vaccinations before visiting a public park.</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Bring water and waste bags. Most parks provide dispensers, but don&apos;t count on it.</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Keep your dog leashed in parking areas and on trails unless in a designated off-leash zone.</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Read our <a href="/blog/dog-park-etiquette" className="text-forest hover:underline">dog park etiquette guide</a> for a better experience.</li>
          </ul>
        </div>
      </section>`;

  content = content.slice(0, insertPoint) + introBlock + content.slice(insertPoint);

  // Expand visible FAQ from 2 to 5 questions
  const oldFaq = `{ q: "How many dog parks are in ${info.name}?", a: \`BarkSeeker lists \${stParks.length}+ dog parks across ${info.name}.\` },
            { q: "Is BarkSeeker free?", a: "Yes, completely free. No login, no account, no fees." },`;
  const newFaq = `{ q: "How many dog parks are in ${info.name}?", a: \`BarkSeeker lists \${stParks.length}+ dog parks across ${info.name}, including off-leash areas, fenced parks, and dog-friendly trails.\` },
            { q: "Are dog parks in ${info.name} free?", a: "Most dog parks in ${info.name} are free and open to the public. Some may require a city registration tag for your dog." },
            { q: "Do I need to keep my dog on a leash at ${info.name} dog parks?", a: "In designated off-leash dog parks, your dog can play freely within the fenced area. Outside of designated off-leash zones, ${info.name} generally requires dogs to be leashed." },
            { q: "What should I bring to a dog park in ${info.name}?", a: "Bring water, waste bags, a leash (even at off-leash parks), and treats. Leave food and retractable leashes at home." },
            { q: "Is BarkSeeker free?", a: "Yes, completely free. No login, no account, no fees. Just find your park and go." },`;
  content = content.replace(oldFaq, newFaq);

  // Convert city buttons to Links
  if (content.includes('<button key={city}') && !content.includes('href={`/cities/')) {
    content = content.replace(
      /<button key=\{city\}[^>]+>/g,
      '<Link key={city} href={`/cities/${city.toLowerCase().replace(/\\s+/g, "-")}`} className="text-left bg-white border border-gray-200 rounded-lg p-3 hover:border-forest hover:shadow-sm transition">'
    );
    content = content.replace(/<\/button>\s*\)\)}/g, '</Link>))}');
  }

  fs.writeFileSync(filePath, content);
  updated++;
}

console.log(`Updated: ${updated}, Skipped: ${skipped}`);
