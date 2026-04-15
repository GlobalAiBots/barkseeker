import Link from "next/link";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { unified, getUnifiedParkById, amenityLabels } from "@/data/all-parks";
import CletusAd from "@/components/CletusAd";
import FeaturedArticle from "@/components/FeaturedArticle";
import cityPagesData from "@/data/city-pages.json";
import type { Metadata } from "next";

const allCities = (cityPagesData as { state: string; stateSlug: string; city: string; citySlug: string; count: number }[]);

const ParkMap = dynamic(() => import("@/components/ParkMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 400 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });

export const dynamicParams = true;
export function generateStaticParams() { return []; }

const stateNames: Record<string, string> = {AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",CT:"Connecticut",DE:"Delaware",FL:"Florida",GA:"Georgia",HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming"};
const stateSlugs: Record<string, string> = {AL:"alabama",AK:"alaska",AZ:"arizona",AR:"arkansas",CA:"california",CO:"colorado",CT:"connecticut",DE:"delaware",FL:"florida",GA:"georgia",HI:"hawaii",ID:"idaho",IL:"illinois",IN:"indiana",IA:"iowa",KS:"kansas",KY:"kentucky",LA:"louisiana",ME:"maine",MD:"maryland",MA:"massachusetts",MI:"michigan",MN:"minnesota",MS:"mississippi",MO:"missouri",MT:"montana",NE:"nebraska",NV:"nevada",NH:"new-hampshire",NJ:"new-jersey",NM:"new-mexico",NY:"new-york",NC:"north-carolina",ND:"north-dakota",OH:"ohio",OK:"oklahoma",OR:"oregon",PA:"pennsylvania",RI:"rhode-island",SC:"south-carolina",SD:"south-dakota",TN:"tennessee",TX:"texas",UT:"utah",VT:"vermont",VA:"virginia",WA:"washington",WV:"west-virginia",WI:"wisconsin",WY:"wyoming"};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const park = getUnifiedParkById(id);
  if (!park) return { title: "Park Not Found" };
  const isGeneric = /^(dog\s*park|off.?leash|bark\s*park)$/i.test(park.name.trim());
  const loc = park.city ? `${park.city}, ${stateNames[park.state] || park.state}` : (stateNames[park.state] || park.state);
  const displayTitle = isGeneric ? `Dog Park in ${loc}` : park.name;
  return {
    title: `${displayTitle} — Off-Leash Dog Park | BarkSeeker`,
    description: `${displayTitle} dog park${park.city ? ` in ${park.city}` : ""}, ${stateNames[park.state] || park.state}. GPS coordinates, amenities, off-leash info, and directions.`,
    openGraph: { title: `${displayTitle} — BarkSeeker`, url: `https://barkseeker.com/parks/${park.id}` },
    alternates: { canonical: `https://barkseeker.com/parks/${park.id}` },
  };
}

export default async function ParkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const park = getUnifiedParkById(id);
  if (!park) notFound();
  const stSlug = stateSlugs[park.state] || park.state.toLowerCase();
  const stName = stateNames[park.state] || park.state;
  // Precomputed nearby parks
  const nearbyData = (() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const data = require("@/data/nearby.json");
      return (data[park.id] || []).slice(0, 5);
    } catch { return []; }
  })();
  const nearby = nearbyData.length > 0
    ? nearbyData.map((n: { id: string; name: string; distance: number; city: string; state: string }) => {
        const found = unified.find((p) => p.id === n.id);
        return found ? { ...found, distanceMiles: n.distance } : null;
      }).filter(Boolean)
    : unified.filter((p) => p.id !== park.id && p.state === park.state).slice(0, 5);
  const mapParks = [{ id: park.id, name: park.name, latitude: park.latitude, longitude: park.longitude, city: park.city }];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Place", name: park.name, geo: { "@type": "GeoCoordinates", latitude: park.latitude, longitude: park.longitude }, address: { "@type": "PostalAddress", addressRegion: stName } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://barkseeker.com" }, { "@type": "ListItem", position: 2, name: stName, item: `https://barkseeker.com/${stSlug}` }, { "@type": "ListItem", position: 3, name: park.name, item: `https://barkseeker.com/parks/${park.id}` }] }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-forest transition">Home</Link><span>/</span>
        <Link href={`/${stSlug}`} className="hover:text-forest transition">{stName}</Link><span>/</span>
        <span className="text-charcoal font-medium">{park.name}</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-2">{park.name}</h1>
      <p className="text-gray-500 mb-6">{park.city ? `${park.city}, ` : ""}{stName} &middot; GPS: {park.latitude.toFixed(4)}, {park.longitude.toFixed(4)}</p>

      <ParkMap parks={mapParks} center={[park.latitude, park.longitude]} zoom={15} height="400px" className="mb-8" />

      <div className="flex flex-wrap gap-3 mb-8">
        <a href={`https://www.google.com/maps/dir/?api=1&destination=${park.latitude},${park.longitude}`} target="_blank" rel="noopener noreferrer" className="bg-bark hover:bg-bark-dark text-white font-bold px-6 py-3 rounded-lg transition shadow-sm text-sm">Get Directions</a>
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

      {park.description && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
          <p className="text-gray-600 leading-relaxed">{park.description}</p>
        </div>
      )}

      {/* About This Park — unique content */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">About {park.name}</h2>
        <p className="text-gray-600 leading-relaxed text-sm">
          {park.name} is a dog park located in {park.city ? `${park.city}, ` : ""}{stName}. {park.amenities && park.amenities.length > 0 ? `This park offers ${park.amenities.length} amenities including ${park.amenities.slice(0, 3).map(a => (amenityLabels[a]?.label || a).toLowerCase()).join(", ")}.` : "Visit this park for off-leash play and socialization."} GPS coordinates: {park.latitude.toFixed(4)}, {park.longitude.toFixed(4)}.
        </p>
      </div>

      {/* What to Know */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
        <h3 className="font-[Cabin] font-bold text-forest mb-3">What to Know Before You Visit</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Always supervise your dog at the park &mdash; watch for signs of stress or aggression.</li>
          <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Bring water and waste bags. Most parks have dispensers, but don&apos;t count on it.</li>
          <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Make sure your dog is up to date on vaccinations before visiting any public dog park.</li>
          <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Read our <Link href="/blog/dog-park-etiquette" className="text-forest hover:underline">dog park etiquette guide</Link> for a better experience.</li>
        </ul>
      </div>

      {/* Dog Parks in State */}
      {(() => {
        const stateCount = unified.filter(p => p.state === park.state).length;
        return (
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
            <h3 className="font-[Cabin] font-bold text-charcoal mb-3">Dog Parks in {stName}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {stName} is home to {stateCount.toLocaleString()} dog parks listed on BarkSeeker. Whether you&apos;re looking for off-leash areas, fenced parks, or dog-friendly trails, {stName} has options for every pup. <Link href={`/${stSlug}`} className="text-forest hover:underline">Browse all {stateCount.toLocaleString()} dog parks in {stName}</Link>.
            </p>
          </div>
        );
      })()}

      {/* FAQ - visible */}
      <div className="mb-6">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
          { "@type": "Question", name: `Where is ${park.name} located?`, acceptedAnswer: { "@type": "Answer", text: `${park.name} is located in ${park.city ? park.city + ", " : ""}${stName}. GPS: ${park.latitude.toFixed(4)}, ${park.longitude.toFixed(4)}.` } },
          { "@type": "Question", name: `Is ${park.name} free?`, acceptedAnswer: { "@type": "Answer", text: "Most public dog parks are free to use. Some may have membership or seasonal fees." } },
          { "@type": "Question", name: `Does ${park.name} have off-leash areas?`, acceptedAnswer: { "@type": "Answer", text: "Check the amenities section above. Many dog parks on BarkSeeker include fenced off-leash areas." } },
        ] }) }} />
        <h3 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Frequently Asked Questions</h3>
        <div className="space-y-2">
          {[
            { q: `Where is ${park.name} located?`, a: `${park.name} is located in ${park.city ? park.city + ", " : ""}${stName}. GPS: ${park.latitude.toFixed(4)}, ${park.longitude.toFixed(4)}.` },
            { q: `Is ${park.name} free?`, a: "Most public dog parks are free to use. Some may have membership or seasonal fees." },
            { q: `Does ${park.name} have off-leash areas?`, a: "Check the amenities section above. Many dog parks on BarkSeeker include fenced off-leash areas." },
          ].map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-forest transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </div>

      {/* Related Guides */}
      <div className="mb-6">
        <h3 className="font-[Cabin] font-bold text-charcoal mb-3">Related Guides</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { href: "/blog/dog-park-etiquette", title: "Dog Park Etiquette", desc: "10 rules every dog owner should follow" },
            { href: "/blog/dog-park-safety", title: "Dog Park Safety", desc: "Keep your pup safe and happy" },
            { href: "/blog/what-to-bring-to-a-dog-park", title: "What to Bring", desc: "Essential checklist for dog park visits" },
          ].map((g) => (
            <Link key={g.href} href={g.href} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
              <p className="font-bold text-charcoal group-hover:text-forest transition text-sm">{g.title}</p>
              <p className="text-gray-400 text-xs mt-1">{g.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      <FeaturedArticle listingSlug={park.id} />

      {/* BabyMyDog Promo */}
      <div className="my-8 rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #C4704B 0%, #D4885B 60%, #5B7B5E 100%)" }}>
        <div className="px-6 py-8 md:py-10">
          <h3 className="font-[Cabin] text-xl md:text-2xl font-bold text-white mb-2">Gear Up for the Park &#128054;</h3>
          <p className="text-white/80 text-sm mb-6 max-w-md">Leashes, water bottles, treat pouches, and more &mdash; everything your pup needs for a great day out.</p>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { href: "https://babymydog.com/best/dog-leashes", label: "Leashes & Harnesses", icon: "\uD83E\uDDBA" },
              { href: "https://babymydog.com/best/dog-treats", label: "Treats & Snacks", icon: "\uD83C\uDF56" },
              { href: "https://babymydog.com/best/dog-toys", label: "Toys & Fetch Gear", icon: "\uD83E\uDD8E" },
            ].map((p) => (
              <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer" className="bg-white/15 hover:bg-white/25 rounded-xl p-3 text-center transition">
                <span className="text-2xl block mb-1">{p.icon}</span>
                <span className="text-white text-xs font-semibold">{p.label}</span>
              </a>
            ))}
          </div>
          <a href="https://babymydog.com" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-[#C4704B] font-bold text-sm px-6 py-2.5 rounded-lg hover:shadow-lg transition">
            Shop All Dog Products at BabyMyDog &rarr;
          </a>
        </div>
      </div>

      <CletusAd />

      {nearby.length > 0 && (
        <>
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4 mt-8">Nearby Dog Parks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {nearby.map((p: { id: string; name: string; city: string; state: string; distanceMiles?: number }) => (
              <Link key={p.id} href={`/parks/${p.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-forest">
                <p className="font-bold text-charcoal group-hover:text-forest transition text-sm">{p.name}</p>
                <p className="text-gray-500 text-xs">{p.city || stName}{p.distanceMiles ? ` \u00b7 ${p.distanceMiles} mi` : ""}</p>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* Nearby Cities */}
      {park.city && (() => {
        const nearbyCities = allCities.filter(c => c.state === park.state && c.city !== park.city).slice(0, 6);
        if (nearbyCities.length === 0) return null;
        return (
          <div className="mt-8">
            <h3 className="font-[Cabin] font-bold text-charcoal mb-3">Nearby Cities with Dog Parks</h3>
            <div className="flex flex-wrap gap-2">
              {nearbyCities.map(c => (
                <Link key={c.citySlug} href={`/cities/${c.stateSlug}-${c.citySlug}`} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-forest hover:border-forest transition">
                  {c.city}, {park.state}
                </Link>
              ))}
            </div>
          </div>
        );
      })()}

      {/* People Also Search For */}
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-5">
        <h3 className="font-[Cabin] font-bold text-charcoal mb-3 text-sm">People Also Search For</h3>
        <div className="flex flex-wrap gap-2">
          {(() => {
            const cityPage = allCities.find(c => c.state === park.state && c.city === park.city);
            if (!cityPage) return null;
            return <>
              <Link href={`/cities/${cityPage.stateSlug}-${cityPage.citySlug}`} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-forest hover:border-forest transition">Dog parks near {park.city}</Link>
              <Link href={`/cities/${cityPage.stateSlug}-${cityPage.citySlug}`} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-forest hover:border-forest transition">Off-leash dog parks in {park.city}</Link>
            </>;
          })()}
          <Link href={`/${stSlug}`} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-forest hover:border-forest transition">Dog parks in {stName}</Link>
          <Link href="/blog/dog-park-etiquette" className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-forest hover:border-forest transition">Dog park etiquette tips</Link>
        </div>
      </div>
    </div>
  );
}
