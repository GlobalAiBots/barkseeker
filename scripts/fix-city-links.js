const fs = require("fs");
const path = require("path");
const dir = "src/app";

const stateDirs = fs.readdirSync(dir).filter(d => {
  const f = path.join(dir, d, "page.tsx");
  if (!fs.existsSync(f)) return false;
  const c = fs.readFileSync(f, "utf8");
  return c.includes("Park") && c.includes("cityMap");
});

let fixed = 0;
for (const slug of stateDirs) {
  const f = path.join(dir, slug, "page.tsx");
  let c = fs.readFileSync(f, "utf8");
  const before = c;

  // Fix: add state slug prefix if missing
  if (c.includes("/cities/${city.toLowerCase") && !c.includes("/cities/" + slug + "-${")) {
    c = c.replace(
      /\/cities\/\$\{city\.toLowerCase\(\)/g,
      "/cities/" + slug + "-${city.toLowerCase()"
    );
  }

  // Fix slugify
  c = c.replace(
    /\.replace\(\/\\s\+\/g, "-"\)/g,
    '.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")'
  );

  if (c !== before) {
    fs.writeFileSync(f, c);
    fixed++;
    console.log("Fixed:", slug);
  }
}
console.log("\nTotal fixed:", fixed, "of", stateDirs.length);
