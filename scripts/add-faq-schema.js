const fs = require("fs");
const path = require("path");

const stateMap = {
  alabama:"Alabama",alaska:"Alaska",arizona:"Arizona",arkansas:"Arkansas",california:"California",colorado:"Colorado",connecticut:"Connecticut",delaware:"Delaware",florida:"Florida",georgia:"Georgia",hawaii:"Hawaii",idaho:"Idaho",illinois:"Illinois",indiana:"Indiana",iowa:"Iowa",kansas:"Kansas",kentucky:"Kentucky",louisiana:"Louisiana",maine:"Maine",maryland:"Maryland",massachusetts:"Massachusetts",michigan:"Michigan",minnesota:"Minnesota",mississippi:"Mississippi",missouri:"Missouri",montana:"Montana",nebraska:"Nebraska",nevada:"Nevada","new-hampshire":"New Hampshire","new-jersey":"New Jersey","new-mexico":"New Mexico","new-york":"New York","north-carolina":"North Carolina","north-dakota":"North Dakota",ohio:"Ohio",oklahoma:"Oklahoma",oregon:"Oregon",pennsylvania:"Pennsylvania","rhode-island":"Rhode Island","south-carolina":"South Carolina","south-dakota":"South Dakota",tennessee:"Tennessee",texas:"Texas",utah:"Utah",vermont:"Vermont",virginia:"Virginia",washington:"Washington","west-virginia":"West Virginia",wisconsin:"Wisconsin",wyoming:"Wyoming"
};

let updated = 0;

for (const [slug, name] of Object.entries(stateMap)) {
  const file = path.join("src/app", slug, "page.tsx");
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, "utf8");
  if (content.includes("FAQPage")) continue;

  const faqBlock = `
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "How many dog parks are in ${name}?", acceptedAnswer: { "@type": "Answer", text: \`There are \${stParks.length} dog parks in ${name}. BarkSeeker has mapped every off-leash area and fenced park across the state.\` } },
          { "@type": "Question", name: "Are dog parks in ${name} free?", acceptedAnswer: { "@type": "Answer", text: "Most dog parks in ${name} are free and open to the public. Some may require a city or county registration tag for your dog." } },
          { "@type": "Question", name: "Are there fenced dog parks in ${name}?", acceptedAnswer: { "@type": "Answer", text: "Yes, many dog parks in ${name} have fully fenced areas. Browse BarkSeeker listings to find fenced off-leash parks near you." } },
          { "@type": "Question", name: "Do dog parks in ${name} have small dog areas?", acceptedAnswer: { "@type": "Answer", text: "Many larger dog parks in ${name} have separate areas for small dogs. Check individual park listings on BarkSeeker for amenity details." } },
          { "@type": "Question", name: "How do I find dog parks near me in ${name}?", acceptedAnswer: { "@type": "Answer", text: \`Use BarkSeeker to browse all \${stParks.length} dog parks in ${name} by city. Each listing includes a map and directions.\` } },
        ],
      }) }} />`;

  const returnMatch = content.match(/return\s*\(\s*\n\s*<div>/);
  if (!returnMatch) continue;
  const insertPos = content.indexOf(returnMatch[0]) + returnMatch[0].length;
  content = content.slice(0, insertPos) + faqBlock + content.slice(insertPos);
  fs.writeFileSync(file, content, "utf8");
  updated++;
}

console.log(`Updated ${updated} state pages with FAQPage schema`);
