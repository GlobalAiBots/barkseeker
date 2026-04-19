type Product = { name: string; desc: string; q: string };
type Season = { label: string; emoji: string; headline: string; items: Product[] };

const AFFILIATE_TAG = "babymydog03-20";
const amazonSearch = (q: string) => `https://www.amazon.com/s?k=${encodeURIComponent(q)}&tag=${AFFILIATE_TAG}`;

const SEASONS: Record<"spring" | "summer" | "fall" | "winter", Season> = {
  spring: {
    label: "Spring",
    emoji: "\u{1F33F}",
    headline: "Shedding season + tick and allergy prep",
    items: [
      { name: "Undercoat Deshedding Tool", desc: "Double-coated breeds blow their coat in spring. A Furminator-style tool removes loose undercoat in minutes.", q: "furminator deshedding tool dog" },
      { name: "Tick Prevention (Topical)", desc: "Tick season starts earlier every year. Monthly topical protection before the first warm weekend.", q: "frontline plus dog flea tick" },
      { name: "Paw Wipes", desc: "Allergies kick in with the pollen. Wipe paws after every walk to cut itching and hotspots.", q: "dog paw wipes natural" },
    ],
  },
  summer: {
    label: "Summer",
    emoji: "\u{2600}",
    headline: "Heat safety gear for dog park season",
    items: [
      { name: "Cooling Vest", desc: "Soak, wring, wear. Keeps your dog cool for hours at the park on 90-degree days.", q: "dog cooling vest" },
      { name: "Collapsible Water Bowl", desc: "Clips to the leash, holds 3 cups. The most useful $8 you'll spend this summer.", q: "collapsible dog water bowl" },
      { name: "Dog Pool (Hard-Sided)", desc: "Bite and claw-proof PVC pool. Water fetchers and heat-sensitive breeds love it.", q: "hard sided dog pool" },
    ],
  },
  fall: {
    label: "Fall",
    emoji: "\u{1F342}",
    headline: "Joint support and senior-dog comfort",
    items: [
      { name: "Joint Supplement (Glucosamine)", desc: "Cool, damp weather stiffens older joints. Start glucosamine in fall for a full ramp-up by winter.", q: "dog joint supplement glucosamine" },
      { name: "Orthopedic Dog Bed", desc: "Memory foam supports hips and elbows. Makes a night-and-day difference for seniors.", q: "orthopedic dog bed memory foam large" },
      { name: "Reflective Leash / LED Collar", desc: "Shorter days mean more walks in low light. Reflective gear makes you visible to drivers.", q: "led dog collar rechargeable" },
    ],
  },
  winter: {
    label: "Winter",
    emoji: "\u{2744}",
    headline: "Winter paw protection and warmth",
    items: [
      { name: "Paw Balm", desc: "Protects paw pads from road salt, ice, and cold concrete. Apply before every walk.", q: "musher's secret paw wax" },
      { name: "Dog Booties (Set of 4)", desc: "For small breeds and sensitive paws on sub-freezing walks. Anti-slip sole.", q: "dog boots booties winter" },
      { name: "Insulated Dog Coat", desc: "Short-haired breeds like pit bulls, boxers, and whippets need a real coat in winter, not a fashion one.", q: "insulated dog winter coat waterproof" },
    ],
  },
};

function getSeason(): keyof typeof SEASONS {
  const m = new Date().getMonth();
  if (m >= 2 && m <= 4) return "spring";
  if (m >= 5 && m <= 7) return "summer";
  if (m >= 8 && m <= 10) return "fall";
  return "winter";
}

export default function SeasonalPicks() {
  const season = SEASONS[getSeason()];

  return (
    <div className="my-10">
      <div className="flex items-baseline gap-3 mb-1">
        <h3 className="font-[Cabin] text-lg font-bold text-charcoal">This {season.label}&apos;s Picks</h3>
        <span className="text-[11px] font-bold tracking-widest uppercase text-forest">{season.emoji} Limited-Time Featured</span>
      </div>
      <p className="text-gray-500 text-sm mb-4">{season.headline}</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {season.items.map((item) => (
          <div key={item.name} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col">
            <p className="font-bold text-charcoal text-sm">{item.name}</p>
            <p className="text-gray-500 text-xs mt-1 leading-relaxed flex-1">{item.desc}</p>
            <a
              href={amazonSearch(item.q)}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="inline-block mt-3 text-xs font-semibold text-forest hover:text-forest-dark transition"
            >
              &#9733; Our Pick &mdash; View on Amazon
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
