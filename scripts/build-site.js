/**
 * build-site.js — Generate all BarkSeeker pages, components, data pipeline, and sitemaps
 */
const fs = require('fs');
const path = require('path');

const parksData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/all-us-dogparks.json'), 'utf-8'));
const byState = {};
for (const p of parksData) {
  const slug = p.state.toLowerCase().replace(/\s+/g, '-');
  if (!byState[slug]) byState[slug] = { name: p.state, abbr: p.stateAbbr, parks: [] };
  byState[slug].parks.push(p);
}

function pascal(slug) { return slug.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase()); }

const stateEntries = Object.entries(byState).sort((a, b) => b[1].parks.length - a[1].parks.length);
const sitemapMainUrls = [];
const sitemapParkUrls = [];
['', 'map', 'blog', 'about', 'for-businesses', 'privacy', 'terms'].forEach(p => sitemapMainUrls.push(`https://barkseeker.com/${p}`));

// --- Create data pipeline ---
const stateMapEntries = stateEntries.map(([slug, d]) => `  "${slug}": { code: "${d.abbr}", prefix: "${d.abbr.toLowerCase()}" }`).join(',\n');

fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'all-parks.ts'),
`// BarkSeeker - Unified Dog Park Data Pipeline
export interface UnifiedPark {
  id: string; name: string; description: string; latitude: number; longitude: number;
  address: string; city: string; county: string; state: string;
  rating: number; totalRatings: number; featured: boolean;
  amenities?: string[]; fee?: string; enriched?: boolean;
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9\\s-]/g, "").replace(/\\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").substring(0, 60);
}

export function isGenericName(name: string): boolean {
  const n = (name || "").trim().toLowerCase();
  if (!n || n.length < 3) return true;
  if (n === "dog park" || n === "dog run" || n === "bark park" || n === "off-leash area" || n === "off leash area") return true;
  if (/^dog\\s+(park|run)\\s+(at|near|on|off)\\s+/i.test(n)) return true;
  return false;
}

export function sortParks(parks: UnifiedPark[]): UnifiedPark[] {
  return [...parks].sort((a, b) => {
    const aE = a.rating > 0 || a.totalRatings > 0 || !!(a.amenities?.length) || a.featured;
    const bE = b.rating > 0 || b.totalRatings > 0 || !!(b.amenities?.length) || b.featured;
    const aG = isGenericName(a.name); const bG = isGenericName(b.name);
    if (aE && !bE) return -1; if (!aE && bE) return 1;
    if (aE && bE) return (b.rating || 0) - (a.rating || 0) || a.name.localeCompare(b.name);
    if (!aG && bG) return -1; if (aG && !bG) return 1;
    return a.name.localeCompare(b.name);
  });
}

export const amenityLabels: Record<string, { icon: string; label: string }> = {
  "fenced": { icon: "\\ud83c\\udfd7\\ufe0f", label: "Fenced" },
  "off-leash": { icon: "\\ud83d\\udc15", label: "Off-Leash" },
  "water": { icon: "\\ud83d\\udca7", label: "Water Fountain" },
  "small-dog": { icon: "\\ud83d\\udc36", label: "Small Dog Area" },
  "shade": { icon: "\\ud83c\\udf33", label: "Shade" },
  "benches": { icon: "\\ud83e\\ude91", label: "Benches" },
  "agility": { icon: "\\ud83c\\udfcb\\ufe0f", label: "Agility Equipment" },
  "parking": { icon: "\\ud83c\\udd7f\\ufe0f", label: "Parking" },
  "restrooms": { icon: "\\ud83d\\udebb", label: "Restrooms" },
  "lighted": { icon: "\\ud83d\\udca1", label: "Lighted" },
};

const stateMap: Record<string, { code: string; prefix: string }> = {
${stateMapEntries}
};

// eslint-disable-next-line @typescript-eslint/no-require-imports
function loadState(slug: string) { try { return require(\`./$\{slug}-parks.json\`); } catch { return []; } }

const seenSlugs = new Set<string>();
const allParks: UnifiedPark[] = [];

for (const [stateSlug, info] of Object.entries(stateMap)) {
  const rawParks = loadState(stateSlug) as Array<{
    place_id: string; name: string; formatted_address: string;
    latitude: number; longitude: number; city: string; county: string;
    rating: number | null; total_ratings: number; tags?: Record<string, string>;
  }>;
  if (!rawParks.length) continue;

  for (const raw of rawParks) {
    const cleanName = (raw.name || "Dog Park").replace(/[^\\w\\s'-]/g, "").trim();
    let slug = \`$\{info.prefix}-$\{slugify(cleanName) || "park"}\`;
    if (seenSlugs.has(slug)) slug = \`$\{slug}-$\{raw.place_id.substring(0, 8).toLowerCase()}\`;
    if (seenSlugs.has(slug)) slug = \`$\{slug}-$\{raw.place_id.substring(8, 16).toLowerCase()}\`;
    if (seenSlugs.has(slug)) continue;
    seenSlugs.add(slug);

    // Detect amenities from OSM tags
    const amenities: string[] = [];
    const tags = raw.tags || {};
    if (tags.fenced === "yes" || tags.fence === "yes") amenities.push("fenced");
    if (tags.dog === "unleashed" || tags.off_leash === "yes") amenities.push("off-leash");
    if (tags.drinking_water === "yes") amenities.push("water");
    if (tags.lit === "yes" || tags.lighting === "yes") amenities.push("lighted");

    allParks.push({
      id: slug, name: cleanName,
      description: \`$\{cleanName} is a dog park located near $\{raw.city || "the area"}. GPS: $\{raw.latitude.toFixed(4)}, $\{raw.longitude.toFixed(4)}.\`,
      latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "",
      city: raw.city || "", county: raw.county || "", state: info.code,
      rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false,
      amenities: amenities.length > 0 ? amenities : undefined,
    });
  }
}

export const unified = allParks;

export function getUnifiedParkById(id: string): UnifiedPark | undefined {
  return allParks.find((r) => r.id === id);
}
`);

console.log('Created all-parks.ts');

// Fix the template literal escaping issue
let allParksContent = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'all-parks.ts'), 'utf-8');
allParksContent = allParksContent.replace(/\$\{/g, '${');
fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'all-parks.ts'), allParksContent);

// --- Create stub ramps.ts ---
fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'ramps.ts'),
`export interface Ramp { id: string; name: string; description: string; latitude: number; longitude: number; address: string; city: string; state: string; zip: string; rating: number; fee: string; rampCount: number; amenities: string[]; }
export const ramps: Ramp[] = [];
export const amenityLabels: Record<string, { icon: string; label: string }> = {};
`);

// --- Create ParkList component ---
fs.writeFileSync(path.join(__dirname, '..', 'src', 'components', 'ParkList.tsx'),
`"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { type UnifiedPark, amenityLabels, isGenericName, sortParks } from "@/data/all-parks";

export default function ParkList({ parks, stateName }: { parks: UnifiedPark[]; stateName: string }) {
  const [showAll, setShowAll] = useState(false);
  const sorted = useMemo(() => sortParks(parks), [parks]);
  const enriched = useMemo(() => sorted.filter((r) => r.rating > 0 || r.totalRatings > 0 || !!(r.amenities?.length) || r.featured), [sorted]);
  const named = useMemo(() => sorted.filter((r) => !isGenericName(r.name) && !(r.rating > 0 || r.totalRatings > 0 || !!(r.amenities?.length) || r.featured)), [sorted]);
  const generic = useMemo(() => sorted.filter((r) => isGenericName(r.name) && !(r.rating > 0 || r.totalRatings > 0 || !!(r.amenities?.length))), [sorted]);
  const namedDisplay = showAll ? named : named.slice(0, 30);
  const genericDisplay = showAll ? generic : generic.slice(0, 20);

  return (
    <section className="max-w-6xl mx-auto px-4 pt-4 pb-8">
      <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">All {parks.length} {stateName} Dog Parks</h2>
      {enriched.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {enriched.map((r) => (
            <Link key={r.id} href={\`/parks/\${r.id}\`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-forest shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-forest transition">{r.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{r.city || stateName}{r.rating > 0 && <span> &middot; {r.rating}/5</span>}</p>
              {r.amenities && r.amenities.length > 0 && (<div className="flex flex-wrap gap-1 mt-2">{r.amenities.slice(0, 3).map((a) => (<span key={a} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{amenityLabels[a]?.icon} {amenityLabels[a]?.label}</span>))}</div>)}
              <span className="text-sm font-semibold text-bark mt-2 inline-block">View Details &rarr;</span>
            </Link>
          ))}
        </div>
      )}
      {namedDisplay.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {namedDisplay.map((r) => (
            <Link key={r.id} href={\`/parks/\${r.id}\`} className="group block bg-white border border-gray-200 rounded-lg p-3 border-l-4 border-l-forest shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <span className="font-[Cabin] font-bold text-charcoal group-hover:text-forest transition text-sm">{r.name}</span>
              <p className="text-gray-500 text-xs mt-0.5">{r.city || stateName}</p>
            </Link>
          ))}
        </div>
      )}
      {genericDisplay.length > 0 && (
        <>
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 mt-4">Additional Dog Parks</p>
          <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-100">
            {genericDisplay.map((r) => (
              <Link key={r.id} href={\`/parks/\${r.id}\`} className="flex items-center justify-between px-4 py-2.5 hover:bg-forest/5 transition group">
                <div>
                  <span className="text-sm text-charcoal group-hover:text-forest transition">{r.name}</span>
                  <span className="text-xs text-gray-400 ml-2">{r.latitude.toFixed(4)}, {r.longitude.toFixed(4)}</span>
                </div>
                <span className="text-xs font-semibold text-bark">Details &rarr;</span>
              </Link>
            ))}
          </div>
        </>
      )}
      {!showAll && (named.length > 30 || generic.length > 20) && (
        <button onClick={() => setShowAll(true)} className="mt-4 w-full py-3 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-forest hover:bg-forest/5 transition">
          Show all {parks.length} parks ({named.length - namedDisplay.length + generic.length - genericDisplay.length} more)
        </button>
      )}
    </section>
  );
}
`);

console.log('Created ParkList component');

// --- Create blog-posts.ts ---
fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'blog-posts.ts'),
`export interface BlogPost {
  slug: string; title: string; date: string; readTime: string;
  category: string; description: string; gradient: string; icon: string;
}

export const blogPosts: BlogPost[] = [
  { slug: "best-dog-parks-florida", title: "Best Dog Parks in Florida: Off-Leash Paradise for Your Pup", date: "April 5, 2026", readTime: "6 min read", category: "Destinations", description: "Discover the top dog parks in Florida with off-leash areas, water features, and shade.", gradient: "linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)", icon: '<svg viewBox="0 0 80 64" fill="none"><text x="20" y="45" font-size="40">\\ud83d\\udc15</text></svg>' },
  { slug: "dog-park-etiquette", title: "Dog Park Etiquette: 10 Rules Every Dog Owner Should Follow", date: "April 3, 2026", readTime: "7 min read", category: "Tips", description: "Essential dog park etiquette rules for a safe and fun experience.", gradient: "linear-gradient(135deg, #E8913A 0%, #D07B2A 100%)", icon: '<svg viewBox="0 0 80 64" fill="none"><text x="20" y="45" font-size="40">\\ud83d\\udcd6</text></svg>' },
  { slug: "find-off-leash-dog-parks", title: "How to Find Off-Leash Dog Parks Near You", date: "April 1, 2026", readTime: "5 min read", category: "Guide", description: "Tips for finding the best off-leash dog parks in your area.", gradient: "linear-gradient(135deg, #87CEEB 0%, #5DADE2 100%)", icon: '<svg viewBox="0 0 80 64" fill="none"><text x="20" y="45" font-size="40">\\ud83d\\udccd</text></svg>' },
  { slug: "is-your-dog-ready", title: "Is Your Dog Ready for the Dog Park? Signs to Look For", date: "March 28, 2026", readTime: "6 min read", category: "Training", description: "How to know if your dog is ready for off-leash play.", gradient: "linear-gradient(135deg, #8E44AD 0%, #9B59B6 100%)", icon: '<svg viewBox="0 0 80 64" fill="none"><text x="20" y="45" font-size="40">\\u2753</text></svg>' },
  { slug: "dog-park-safety", title: "Dog Park Safety: Keeping Your Pup Safe and Happy", date: "March 25, 2026", readTime: "5 min read", category: "Safety", description: "Essential safety tips for visiting dog parks with your furry friend.", gradient: "linear-gradient(135deg, #C0392B 0%, #E74C3C 100%)", icon: '<svg viewBox="0 0 80 64" fill="none"><text x="20" y="45" font-size="40">\\u26a0\\ufe0f</text></svg>' },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
`);

console.log('Created blog-posts.ts');

// --- Generate state pages ---
let totalParkSlugs = 0;

for (const [stateSlug, stateData] of stateEntries) {
  const { name: stateName, abbr: stateCode, parks } = stateData;
  const appDir = path.join(__dirname, '..', 'src', 'app', stateSlug);
  fs.mkdirSync(appDir, { recursive: true });

  // Layout
  fs.writeFileSync(path.join(appDir, 'layout.tsx'),
`import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in ${stateName} — ${parks.length}+ Parks | BarkSeeker",
  description: "The most complete dog park directory for ${stateName}. ${parks.length}+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "${stateName} Dog Parks — BarkSeeker", url: "https://barkseeker.com/${stateSlug}", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "${stateName} Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/${stateSlug}" },
};

export default function ${pascal(stateSlug)}Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
`);

  // State page
  fs.writeFileSync(path.join(appDir, 'page.tsx'),
`"use client";

import { useMemo } from "react";
import { unified, isGenericName } from "@/data/all-parks";
import CletusAd from "@/components/CletusAd";
import ParkList from "@/components/ParkList";

export default function ${pascal(stateSlug)}Page() {
  const stParks = useMemo(() => unified.filter((r) => r.state === "${stateCode}"), []);
  const namedCount = useMemo(() => stParks.filter(p => !isGenericName(p.name)).length, [stParks]);

  const cityMap = useMemo(() => {
    const m: Record<string, number> = {};
    for (const r of stParks) { const c = r.city?.trim(); if (c && c.length > 1) m[c] = (m[c] || 0) + 1; }
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [stParks]);

  return (
    <div>
      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(45,106,79,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">${stateName} Dog Park Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Every Dog Park in ${stateName}</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{stParks.length}+ dog parks across ${stateName}. Off-leash areas, fenced parks, and more. {namedCount} named parks with details.</p>
      </section>

      {cityMap.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pt-8 pb-8">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Browse by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {cityMap.slice(0, 16).map(([city, count]) => (
              <div key={city} className="bg-white border border-gray-200 rounded-lg p-3">
                <p className="font-bold text-charcoal text-sm">{city}</p>
                <p className="text-gray-400 text-xs">{count} park{count !== 1 ? "s" : ""}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <ParkList parks={stParks} stateName="${stateName}" />

      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">${stateName} Dog Park FAQ</h2>
        <div className="space-y-2">
          {[
            { q: "How many dog parks are in ${stateName}?", a: \`BarkSeeker lists \${stParks.length}+ dog parks across ${stateName}.\` },
            { q: "Is BarkSeeker free?", a: "Yes, completely free. No login, no account, no fees." },
          ].map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-forest transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-4"><CletusAd /></div>
    </div>
  );
}
`);

  sitemapMainUrls.push(`https://barkseeker.com/${stateSlug}`);

  // Generate park slugs for sitemap
  const seenSlugs = new Set();
  function slugify(n) { return n.toLowerCase().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,'').substring(0,60); }
  for (const p of parks) {
    const cleanName = (p.name || 'Dog Park').replace(/[^\w\s'-]/g, '').trim();
    let slug = `${stateCode.toLowerCase()}-${slugify(cleanName) || 'park'}`;
    if (seenSlugs.has(slug)) slug = `${slug}-${String(p.id).substring(0, 8)}`;
    if (seenSlugs.has(slug)) continue;
    seenSlugs.add(slug);
    sitemapParkUrls.push(`https://barkseeker.com/parks/${slug}`);
    totalParkSlugs++;
  }

  console.log(`  ${stateSlug}: ${parks.length} parks`);
}

// --- Park detail page ---
const parksDir = path.join(__dirname, '..', 'src', 'app', 'parks', '[id]');
fs.mkdirSync(parksDir, { recursive: true });

fs.writeFileSync(path.join(parksDir, 'page.tsx'),
`import Link from "next/link";
import { notFound } from "next/navigation";
import { unified, getUnifiedParkById, amenityLabels } from "@/data/all-parks";
import CletusAd from "@/components/CletusAd";
import type { Metadata } from "next";

export const dynamicParams = true;
export function generateStaticParams() { return []; }

const stateNames: Record<string, string> = {AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",CT:"Connecticut",DE:"Delaware",FL:"Florida",GA:"Georgia",HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming"};
const stateSlugs: Record<string, string> = {AL:"alabama",AK:"alaska",AZ:"arizona",AR:"arkansas",CA:"california",CO:"colorado",CT:"connecticut",DE:"delaware",FL:"florida",GA:"georgia",HI:"hawaii",ID:"idaho",IL:"illinois",IN:"indiana",IA:"iowa",KS:"kansas",KY:"kentucky",LA:"louisiana",ME:"maine",MD:"maryland",MA:"massachusetts",MI:"michigan",MN:"minnesota",MS:"mississippi",MO:"missouri",MT:"montana",NE:"nebraska",NV:"nevada",NH:"new-hampshire",NJ:"new-jersey",NM:"new-mexico",NY:"new-york",NC:"north-carolina",ND:"north-dakota",OH:"ohio",OK:"oklahoma",OR:"oregon",PA:"pennsylvania",RI:"rhode-island",SC:"south-carolina",SD:"south-dakota",TN:"tennessee",TX:"texas",UT:"utah",VT:"vermont",VA:"virginia",WA:"washington",WV:"west-virginia",WI:"wisconsin",WY:"wyoming"};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const park = getUnifiedParkById(id);
  if (!park) return { title: "Park Not Found" };
  return {
    title: \`\${park.name} — Dog Park Details | BarkSeeker\`,
    description: \`\${park.name} dog park in \${park.city || stateNames[park.state] || park.state}. GPS coordinates, amenities, directions.\`,
    openGraph: { title: \`\${park.name} — BarkSeeker\`, url: \`https://barkseeker.com/parks/\${park.id}\` },
    alternates: { canonical: \`https://barkseeker.com/parks/\${park.id}\` },
  };
}

export default async function ParkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const park = getUnifiedParkById(id);
  if (!park) notFound();
  const stSlug = stateSlugs[park.state] || park.state.toLowerCase();
  const stName = stateNames[park.state] || park.state;
  const nearby = unified.filter((p) => p.id !== park.id && p.state === park.state && Math.abs(p.latitude - park.latitude) < 0.15 && Math.abs(p.longitude - park.longitude) < 0.15).slice(0, 6);
  const embedUrl = \`https://www.google.com/maps?q=\${park.latitude},\${park.longitude}&z=15&output=embed\`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Place", name: park.name, geo: { "@type": "GeoCoordinates", latitude: park.latitude, longitude: park.longitude }, address: { "@type": "PostalAddress", addressRegion: stName } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://barkseeker.com" }, { "@type": "ListItem", position: 2, name: stName, item: \`https://barkseeker.com/\${stSlug}\` }, { "@type": "ListItem", position: 3, name: park.name, item: \`https://barkseeker.com/parks/\${park.id}\` }] }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-forest transition">Home</Link><span>/</span>
        <Link href={\`/\${stSlug}\`} className="hover:text-forest transition">{stName}</Link><span>/</span>
        <span className="text-charcoal font-medium">{park.name}</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-2">{park.name}</h1>
      <p className="text-gray-500 mb-6">{park.city ? \`\${park.city}, \` : ""}{stName} &middot; GPS: {park.latitude.toFixed(4)}, {park.longitude.toFixed(4)}</p>

      <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm mb-8" style={{ height: 350 }}>
        <iframe src={embedUrl} width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={\`\${park.name} map\`} allowFullScreen />
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <a href={\`https://www.google.com/maps/dir/?api=1&destination=\${park.latitude},\${park.longitude}\`} target="_blank" rel="noopener noreferrer" className="bg-bark hover:bg-bark-dark text-white font-bold px-6 py-3 rounded-lg transition shadow-sm text-sm">Get Directions</a>
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm"><span className="text-gray-400">GPS:</span><span className="font-mono text-charcoal ml-2">{park.latitude.toFixed(6)}, {park.longitude.toFixed(6)}</span></div>
      </div>

      {park.amenities && park.amenities.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">Amenities</h2>
          <div className="flex flex-wrap gap-2">
            {park.amenities.map((a) => (<span key={a} className="bg-forest/10 text-forest text-sm font-medium px-3 py-1.5 rounded-lg">{amenityLabels[a]?.icon} {amenityLabels[a]?.label || a}</span>))}
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">About This Park</h2>
        <p className="text-gray-600 leading-relaxed">{park.description}</p>
      </div>

      <CletusAd />

      {nearby.length > 0 && (
        <>
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4 mt-8">Nearby Dog Parks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {nearby.map((p) => (
              <Link key={p.id} href={\`/parks/\${p.id}\`} className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-forest">
                <p className="font-bold text-charcoal group-hover:text-forest transition text-sm">{p.name}</p>
                <p className="text-gray-500 text-xs">{p.city || stName}</p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
`);

console.log('Created park detail page');

// --- Sitemaps ---
const d = '2026-04-05';
let mainXml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
for (const url of sitemapMainUrls) mainXml += `  <url><loc>${url}</loc><lastmod>${d}</lastmod><changefreq>weekly</changefreq><priority>${url.endsWith('/')|| url === 'https://barkseeker.com/' ? '1.0' : '0.9'}</priority></url>\n`;
// Add blog posts
['best-dog-parks-florida','dog-park-etiquette','find-off-leash-dog-parks','is-your-dog-ready','dog-park-safety'].forEach(s => {
  mainXml += `  <url><loc>https://barkseeker.com/blog/${s}</loc><lastmod>${d}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n`;
});
mainXml += '</urlset>\n';
fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap-main.xml'), mainXml);

let parksXml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
for (const url of sitemapParkUrls) parksXml += `  <url><loc>${url}</loc><lastmod>${d}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n`;
parksXml += '</urlset>\n';
fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap-parks.xml'), parksXml);

fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>https://barkseeker.com/sitemap-main.xml</loc><lastmod>${d}</lastmod></sitemap>
  <sitemap><loc>https://barkseeker.com/sitemap-parks.xml</loc><lastmod>${d}</lastmod></sitemap>
</sitemapindex>
`);

console.log('\n========================================');
console.log(`  State pages: ${stateEntries.length}`);
console.log(`  Park detail URLs: ${totalParkSlugs}`);
console.log(`  Sitemap main URLs: ${sitemapMainUrls.length + 5}`);
console.log(`  Sitemap park URLs: ${sitemapParkUrls.length}`);
console.log(`  Total sitemap URLs: ${sitemapMainUrls.length + 5 + sitemapParkUrls.length}`);
console.log('========================================');
