"use client";

import { useState, useMemo } from "react";
import { unified, isGenericName } from "@/data/all-parks";
import CletusAd from "@/components/CletusAd";
import ParkList from "@/components/ParkList";

export default function AlabamaPage() {
  const stParks = useMemo(() => unified.filter((r) => r.state === "AL"), []);
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
      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(45,106,79,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Alabama Dog Park Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Every Dog Park in Alabama</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{stParks.length}+ dog parks across Alabama. Off-leash areas, fenced parks, and more. {namedCount} named parks with details.</p>
      </section>

      {cityMap.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pt-8 pb-8">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Browse by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {cityMap.slice(0, 16).map(([city, count]) => (
              <button key={city} onClick={() => { setSelectedCity(city === selectedCity ? null : city); document.getElementById("park-list")?.scrollIntoView({ behavior: "smooth" }); }} className={"text-left bg-white border rounded-lg p-3 hover:border-bark hover:bg-[#E8F0E5] transition cursor-pointer " + (selectedCity === city ? "border-bark bg-[#E8F0E5] ring-2 ring-bark" : "border-gray-200")}>
                <p className="font-bold text-charcoal text-sm">{city}</p>
                <p className="text-gray-400 text-xs">{count} park{count !== 1 ? "s" : ""}</p>
              </button>
            ))}
          </div>
        </section>
      )}

      <div id="park-list">{selectedCity && <div className="max-w-6xl mx-auto px-4 pb-4"><button onClick={() => setSelectedCity(null)} className="text-sm text-forest hover:underline">&larr; Show all {stParks.length} parks</button></div>}</div><ParkList parks={filteredParks} stateName="Alabama" />

      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Alabama Dog Park FAQ</h2>
        <div className="space-y-2">
          {[
            { q: "How many dog parks are in Alabama?", a: `BarkSeeker lists ${stParks.length}+ dog parks across Alabama.` },
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
