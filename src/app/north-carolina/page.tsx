"use client";

import Link from "next/link";

import { useState, useMemo } from "react";
import { unified, isGenericName } from "@/data/all-parks";
import CletusAd from "@/components/CletusAd";
import FeaturedArticle from "@/components/FeaturedArticle";
import dynamic from "next/dynamic";
const ParkMap = dynamic(() => import("@/components/ParkMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 350 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });
import ParkList from "@/components/ParkList";

export default function NorthCarolinaPage() {
  const stParks = useMemo(() => unified.filter((r) => r.state === "NC"), []);
  const namedCount = useMemo(() => stParks.filter(p => !isGenericName(p.name)).length, [stParks]);

  const cityMap = useMemo(() => {
    const m: Record<string, number> = {};
    for (const r of stParks) { const c = r.city?.trim(); if (c && c.length > 1) m[c] = (m[c] || 0) + 1; }
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [stParks]);

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const filteredParks = selectedCity ? stParks.filter(p => p.city?.trim() === selectedCity) : stParks;

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "How many dog parks are in North Carolina?", acceptedAnswer: { "@type": "Answer", text: `There are ${stParks.length} dog parks in North Carolina. BarkSeeker has mapped every off-leash area and fenced park across the state.` } },
          { "@type": "Question", name: "Are dog parks in North Carolina free?", acceptedAnswer: { "@type": "Answer", text: "Most dog parks in North Carolina are free and open to the public. Some may require a city or county registration tag for your dog." } },
          { "@type": "Question", name: "Are there fenced dog parks in North Carolina?", acceptedAnswer: { "@type": "Answer", text: "Yes, many dog parks in North Carolina have fully fenced areas. Browse BarkSeeker listings to find fenced off-leash parks near you." } },
          { "@type": "Question", name: "Do dog parks in North Carolina have small dog areas?", acceptedAnswer: { "@type": "Answer", text: "Many larger dog parks in North Carolina have separate areas for small dogs. Check individual park listings on BarkSeeker for amenity details." } },
          { "@type": "Question", name: "How do I find dog parks near me in North Carolina?", acceptedAnswer: { "@type": "Answer", text: `Use BarkSeeker to browse all ${stParks.length} dog parks in North Carolina by city. Each listing includes a map and directions.` } },
        ],
      }) }} />
      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(45,106,79,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">North Carolina Dog Park Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Every Dog Park in North Carolina</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{stParks.length}+ dog parks across North Carolina. Off-leash areas, fenced parks, and more. {namedCount} named parks with details.</p>
      </section>

      {/* Map */}
      {(() => {
        const mapParks = stParks.map(p => ({ id: p.id, name: p.name, latitude: p.latitude, longitude: p.longitude, city: p.city }));
        const center: [number, number] = stParks.length > 0 ? [stParks.reduce((s, p) => s + p.latitude, 0) / stParks.length, stParks.reduce((s, p) => s + p.longitude, 0) / stParks.length] : [39.8, -98.5];
        return <div className="max-w-6xl mx-auto px-4 pt-8"><ParkMap parks={mapParks} center={center} zoom={7} height="350px" className="mb-4" /></div>;
      })()}

      {/* State intro + tips */}
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-2">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">Dog Parks in North Carolina</h2>
          <p className="text-gray-600 leading-relaxed text-sm">North Carolina has {stParks.length.toLocaleString()} dog parks listed on BarkSeeker, with off-leash areas, fenced parks, and dog-friendly trails across the state. Popular areas include Charlotte, Raleigh, and Asheville. Whether your pup needs room to run or a safe space to socialize, you&apos;ll find a park nearby.</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
          <h3 className="font-[Cabin] font-bold text-forest mb-3">Tips for Visiting Dog Parks in North Carolina</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Always supervise your dog &mdash; don&apos;t leave them unattended at any dog park.</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Make sure your dog is current on all vaccinations before visiting a public park.</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Bring water and waste bags. Most parks provide dispensers, but don&apos;t count on it.</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Keep your dog leashed in parking areas and on trails unless in a designated off-leash zone.</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Read our <a href="/blog/dog-park-etiquette" className="text-forest hover:underline">dog park etiquette guide</a> for a better experience.</li>
          </ul>
        </div>
      </section>

      {cityMap.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pt-8 pb-8">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Browse by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {cityMap.slice(0, 16).map(([city, count]) => (
              <Link key={city} href={`/cities/${city.toLowerCase().replace(/\s+/g, "-")}`} className="text-left bg-white border border-gray-200 rounded-lg p-3 hover:border-forest hover:shadow-sm transition">
                <p className="font-bold text-charcoal text-sm">{city}</p>
                <p className="text-gray-400 text-xs">{count} park{count !== 1 ? "s" : ""}</p>
              </Link>))}
          </div>
        </section>
      )}

      <div id="park-list">{selectedCity && <div className="max-w-6xl mx-auto px-4 pb-4"><button onClick={() => setSelectedCity(null)} className="text-sm text-forest hover:underline">&larr; Show all {stParks.length} parks</button></div>}</div><ParkList parks={filteredParks} stateName="North Carolina" />

      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">North Carolina Dog Park FAQ</h2>
        <div className="space-y-2">
          {[
            { q: "How many dog parks are in North Carolina?", a: `BarkSeeker lists ${stParks.length}+ dog parks across North Carolina, including off-leash areas, fenced parks, and dog-friendly trails.` },
            { q: "Are dog parks in North Carolina free?", a: "Most dog parks in North Carolina are free and open to the public. Some may require a city registration tag for your dog." },
            { q: "Do I need to keep my dog on a leash at North Carolina dog parks?", a: "In designated off-leash dog parks, your dog can play freely within the fenced area. Outside of designated off-leash zones, North Carolina generally requires dogs to be leashed." },
            { q: "What should I bring to a dog park in North Carolina?", a: "Bring water, waste bags, a leash (even at off-leash parks), and treats. Leave food and retractable leashes at home." },
            { q: "Is BarkSeeker free?", a: "Yes, completely free. No login, no account, no fees. Just find your park and go." },
          ].map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-forest transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-4"><FeaturedArticle listingSlug={"state-north-carolina"} />
      <CletusAd /></div>
    </div>
  );
}
