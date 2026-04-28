"use client";

import { use, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { unified } from "@/data/all-parks";
import cityPages from "@/data/city-pages.json";
import FeaturedArticle from "@/components/FeaturedArticle";

const ParkMap = dynamic(() => import("@/components/ParkMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 350 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });

interface CityPage { state: string; stateName: string; stateSlug: string; city: string; citySlug: string; count: number; lat: number; lng: number; }
const allCityPages = cityPages as CityPage[];

export default function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const cityInfo = allCityPages.find((c) => `${c.stateSlug}-${c.citySlug}` === slug);

  const parks = useMemo(() => {
    if (!cityInfo) return [];
    return unified.filter((p) => p.state === cityInfo.state && p.city?.trim() === cityInfo.city);
  }, [cityInfo]);

  const mapParks = useMemo(() => parks.map(p => ({ id: p.id, name: p.name, latitude: p.latitude, longitude: p.longitude, city: p.city })), [parks]);
  const center = useMemo<[number, number]>(() => parks.length ? [parks.reduce((s, p) => s + p.latitude, 0) / parks.length, parks.reduce((s, p) => s + p.longitude, 0) / parks.length] : [39.8, -98.5], [parks]);

  const [search, setSearch] = useState("");
  const filtered = search.length >= 2
    ? parks.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    : parks;

  // Nearby cities
  const nearbyCities = useMemo(() => {
    if (!cityInfo) return [];
    return allCityPages
      .filter((c) => c !== cityInfo && c.count >= 2)
      .map((c) => ({
        ...c,
        dist: Math.sqrt(Math.pow(c.lat - cityInfo.lat, 2) + Math.pow(c.lng - cityInfo.lng, 2)),
      }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 5);
  }, [cityInfo]);

  if (!cityInfo) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="font-[Cabin] text-3xl font-bold text-charcoal mb-4">City Not Found</h1>
        <Link href="/" className="text-forest hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: `How many dog parks are in ${cityInfo.city}, ${cityInfo.stateName}?`, acceptedAnswer: { "@type": "Answer", text: `There are ${parks.length} dog parks in ${cityInfo.city}, ${cityInfo.stateName} listed on BarkSeeker with maps, amenity details, and directions for each park.` } },
          { "@type": "Question", name: `Are there off-leash dog parks in ${cityInfo.city}?`, acceptedAnswer: { "@type": "Answer", text: `Many dog parks in ${cityInfo.city} include dedicated off-leash zones. Off-leash hours and fencing vary by park — check the individual listing for posted rules and gate setup.` } },
          { "@type": "Question", name: `Which ${cityInfo.city} dog parks are fully fenced or have water features?`, acceptedAnswer: { "@type": "Answer", text: `Fencing, splash zones, and water features vary park-by-park near ${cityInfo.city}. BarkSeeker tags each listing with amenities like fenced perimeter, separate small-dog area, and water access so you can pick the right fit for your dog.` } },
          { "@type": "Question", name: `Are dog parks in ${cityInfo.city} free?`, acceptedAnswer: { "@type": "Answer", text: `Most public dog parks near ${cityInfo.city} are free to use. A few HOA, county, or membership-based parks may require registration or a small annual fee — see each park's detail page for specifics.` } },
          { "@type": "Question", name: `Is BarkSeeker free to use?`, acceptedAnswer: { "@type": "Answer", text: `Yes. BarkSeeker is 100% free for dog owners. Browse all ${parks.length} parks in ${cityInfo.city}, save addresses, and get directions — no account required.` } },
        ],
      }) }} />
      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-forest transition">Home</Link><span>/</span>
        <Link href={`/${cityInfo.stateSlug}`} className="hover:text-forest transition">{cityInfo.stateName}</Link><span>/</span>
        <span className="text-charcoal font-medium">{cityInfo.city}</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-2">Dog Parks in {cityInfo.city}, {cityInfo.stateName}</h1>
      <p className="text-gray-500 mb-6">{parks.length} dog park{parks.length !== 1 ? "s" : ""} in {cityInfo.city}, {cityInfo.stateName}. Off-leash areas, fenced parks, and more.</p>

      {parks.length > 5 && (
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search parks in this city..." className="w-full max-w-md px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-forest transition mb-6" />
      )}

      {parks.length > 0 && <ParkMap parks={mapParks} center={center} zoom={12} height="350px" className="mb-8" />}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
        {filtered.map((p) => (
          <Link key={p.id} href={`/parks/${p.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-forest transition">{p.name}</h3>
            <p className="text-gray-500 text-sm mt-1">{p.city}, {p.state}</p>
            <span className="text-sm font-semibold text-bark mt-2 inline-block">View Details &rarr;</span>
          </Link>
        ))}
      </div>

      {/* Intro */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">Dog Parks in {cityInfo.city}, {cityInfo.stateName}</h2>
        <p className="text-gray-600 leading-relaxed text-sm">
          {cityInfo.city}, {cityInfo.stateName} offers {parks.length} dog park{parks.length !== 1 ? "s" : ""} for local dog owners and visitors traveling with pets. {cityInfo.city} provides off-leash space, fenced areas, and walking trails depending on the park &mdash; from quick after-work runs to weekend meetups with the neighborhood pack. Whether you&apos;re socializing a puppy, looking for a separate small-dog zone, or hunting down a park with a splash pad for hot summer days, the {parks.length} park{parks.length !== 1 ? "s" : ""} below serve {cityInfo.city} and the surrounding area with verified addresses, amenity details, and turn-by-turn directions. Most parks are open year-round during daylight hours, though seasonal closures and posted rules can vary &mdash; always check each park&apos;s detail page before you go.
        </p>
      </div>

      {/* Tips */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
        <h3 className="font-[Cabin] font-bold text-forest mb-3">Tips for Dog Parks in {cityInfo.city}</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Make sure your dog is current on vaccinations and licensed in {cityInfo.stateName} &mdash; <Link href={`/${cityInfo.stateSlug}`} className="text-forest hover:underline">see {cityInfo.stateName} dog park guide</Link>.</li>
          <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Off-leash etiquette matters &mdash; recall your dog if play gets too rough and step in early at signs of stress or guarding.</li>
          <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Bring water and waste bags. Don&apos;t rely on park dispensers being stocked, especially on weekends.</li>
          <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Early morning and after-work hours are usually busiest at {cityInfo.city} parks &mdash; midday tends to be calmer.</li>
          <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Check whether a park is fully fenced before unclipping the leash, especially with a young dog or known runner.</li>
        </ul>
      </div>

      {/* Visible FAQ */}
      <div className="mb-8">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {[
            { q: `How many dog parks are in ${cityInfo.city}, ${cityInfo.stateName}?`, a: `There are ${parks.length} dog parks in ${cityInfo.city}, ${cityInfo.stateName} listed on BarkSeeker with maps, amenity details, and directions for each park.` },
            { q: `Are there off-leash dog parks in ${cityInfo.city}?`, a: `Many dog parks in ${cityInfo.city} include dedicated off-leash zones. Off-leash hours and fencing vary by park — check the individual listing for posted rules and gate setup.` },
            { q: `Which ${cityInfo.city} dog parks are fully fenced or have water features?`, a: `Fencing, splash zones, and water features vary park-by-park near ${cityInfo.city}. BarkSeeker tags each listing with amenities like fenced perimeter, separate small-dog area, and water access so you can pick the right fit for your dog.` },
            { q: `Are dog parks in ${cityInfo.city} free?`, a: `Most public dog parks near ${cityInfo.city} are free to use. A few HOA, county, or membership-based parks may require registration or a small annual fee — see each park's detail page for specifics.` },
            { q: `Is BarkSeeker free to use?`, a: `Yes. BarkSeeker is 100% free for dog owners. Browse all ${parks.length} parks in ${cityInfo.city}, save addresses, and get directions — no account required.` },
          ].map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-forest transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </div>

      <FeaturedArticle listingSlug={`city-${slug}`} />

      {/* Back to state */}
      <div className="text-center py-4">
        <Link href={`/${cityInfo.stateSlug}`} className="text-forest hover:underline font-semibold text-sm">Browse all {cityInfo.stateName} dog parks &rarr;</Link>
      </div>

      {nearbyCities.length > 0 && (
        <section>
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Nearby Cities with Dog Parks</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {nearbyCities.map((c) => (
              <Link key={`${c.stateSlug}-${c.citySlug}`} href={`/cities/${c.stateSlug}-${c.citySlug}`} className="bg-white border border-gray-200 rounded-lg p-3 hover:border-forest transition">
                <p className="font-bold text-charcoal text-sm">{c.city}</p>
                <p className="text-gray-400 text-xs">{c.count} parks &middot; {c.stateName}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
