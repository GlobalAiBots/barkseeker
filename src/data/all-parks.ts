// BarkSeeker - Unified Dog Park Data Pipeline
export interface UnifiedPark {
  id: string; name: string; description: string; latitude: number; longitude: number;
  address: string; city: string; county: string; state: string;
  rating: number; totalRatings: number; featured: boolean;
  amenities?: string[]; fee?: string; enriched?: boolean;
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").substring(0, 60);
}

export function isGenericName(name: string): boolean {
  const n = (name || "").trim().toLowerCase();
  if (!n || n.length < 3) return true;
  if (n === "dog park" || n === "dog run" || n === "bark park" || n === "off-leash area" || n === "off leash area") return true;
  if (/^dog\s+(park|run)\s+(at|near|on|off)\s+/i.test(n)) return true;
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
  "fenced": { icon: "\ud83c\udfd7\ufe0f", label: "Fenced" },
  "off-leash": { icon: "\ud83d\udc15", label: "Off-Leash" },
  "water": { icon: "\ud83d\udca7", label: "Water Fountain" },
  "small-dog": { icon: "\ud83d\udc36", label: "Small Dog Area" },
  "shade": { icon: "\ud83c\udf33", label: "Shade" },
  "benches": { icon: "\ud83e\ude91", label: "Benches" },
  "agility": { icon: "\ud83c\udfcb\ufe0f", label: "Agility Equipment" },
  "parking": { icon: "\ud83c\udd7f\ufe0f", label: "Parking" },
  "restrooms": { icon: "\ud83d\udebb", label: "Restrooms" },
  "lighted": { icon: "\ud83d\udca1", label: "Lighted" },
};

const stateMap: Record<string, { code: string; prefix: string }> = {
  "florida": { code: "FL", prefix: "fl" },
  "maryland": { code: "MD", prefix: "md" },
  "new-york": { code: "NY", prefix: "ny" },
  "new-jersey": { code: "NJ", prefix: "nj" },
  "north-carolina": { code: "NC", prefix: "nc" },
  "michigan": { code: "MI", prefix: "mi" },
  "illinois": { code: "IL", prefix: "il" },
  "georgia": { code: "GA", prefix: "ga" },
  "ohio": { code: "OH", prefix: "oh" },
  "minnesota": { code: "MN", prefix: "mn" },
  "massachusetts": { code: "MA", prefix: "ma" },
  "indiana": { code: "IN", prefix: "in" },
  "tennessee": { code: "TN", prefix: "tn" },
  "alabama": { code: "AL", prefix: "al" },
  "pennsylvania": { code: "PA", prefix: "pa" },
  "kansas": { code: "KS", prefix: "ks" },
  "virginia": { code: "VA", prefix: "va" },
  "iowa": { code: "IA", prefix: "ia" },
  "kentucky": { code: "KY", prefix: "ky" },
  "connecticut": { code: "CT", prefix: "ct" },
  "missouri": { code: "MO", prefix: "mo" },
  "south-carolina": { code: "SC", prefix: "sc" },
  "arkansas": { code: "AR", prefix: "ar" },
  "maine": { code: "ME", prefix: "me" },
  "nebraska": { code: "NE", prefix: "ne" },
  "south-dakota": { code: "SD", prefix: "sd" },
  "delaware": { code: "DE", prefix: "de" },
  "oklahoma": { code: "OK", prefix: "ok" },
  "new-hampshire": { code: "NH", prefix: "nh" },
  "north-dakota": { code: "ND", prefix: "nd" },
  "hawaii": { code: "HI", prefix: "hi" },
  "mississippi": { code: "MS", prefix: "ms" },
  "louisiana": { code: "LA", prefix: "la" },
  "colorado": { code: "CO", prefix: "co" },
  "west-virginia": { code: "WV", prefix: "wv" }
};

// eslint-disable-next-line @typescript-eslint/no-require-imports
function loadState(slug: string) { try { return require(`./${slug}-parks.json`); } catch { return []; } }

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
    const cleanName = (raw.name || "Dog Park").replace(/[^\w\s'-]/g, "").trim();
    let slug = `${info.prefix}-${slugify(cleanName) || "park"}`;
    if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(0, 8).toLowerCase()}`;
    if (seenSlugs.has(slug)) slug = `${slug}-${raw.place_id.substring(8, 16).toLowerCase()}`;
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
      description: `${cleanName} is a dog park located near ${raw.city || "the area"}. GPS: ${raw.latitude.toFixed(4)}, ${raw.longitude.toFixed(4)}.`,
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
