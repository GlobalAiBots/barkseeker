"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { unified } from "@/data/all-parks";
import { allGroomers, stateNames as groomerStateNames, stateSlugs as groomerStateSlugs } from "@/data/all-groomers";
import { allVets } from "@/data/all-vets";

const stateList = Object.entries(groomerStateSlugs).map(([abbr, slug]) => ({ abbr, slug, name: groomerStateNames[abbr] || abbr }));

function normalize(s: string) { return s.toLowerCase().replace(/[^a-z0-9 ]/g, ""); }

function SearchResults() {
  const params = useSearchParams();
  const initialQ = params.get("q") || "";
  const [query, setQuery] = useState(initialQ);

  const results = useMemo(() => {
    const q = normalize(query);
    if (q.length < 2) return { parks: [], groomers: [], vets: [], states: [] };

    const parks = unified.filter(p => normalize(p.name).includes(q) || normalize(p.city).includes(q)).slice(0, 20);
    const groomers = allGroomers.filter(g => normalize(g.name).includes(q) || normalize(g.city).includes(q)).slice(0, 20);
    const vets = allVets.filter(v => normalize(v.name).includes(q) || normalize(v.city).includes(q)).slice(0, 20);
    const states = stateList.filter(s => normalize(s.name).includes(q));

    return { parks, groomers, vets, states };
  }, [query]);

  const total = results.parks.length + results.groomers.length + results.vets.length + results.states.length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-[Cabin] text-3xl font-bold text-charcoal mb-6">Search BarkSeeker</h1>

      <div className="relative mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search parks, groomers, vets, cities, or states..."
          className="w-full px-5 py-4 rounded-xl bg-white border-2 border-gray-200 focus:border-forest text-charcoal outline-none transition text-sm"
          autoFocus
        />
        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
      </div>

      {query.length >= 2 && (
        <p className="text-muted text-sm mb-6">{total} result{total !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;</p>
      )}

      {results.states.length > 0 && (
        <section className="mb-8">
          <h2 className="font-[Cabin] font-bold text-charcoal text-lg mb-3">States</h2>
          <div className="flex flex-wrap gap-2">
            {results.states.map(s => (
              <div key={s.abbr} className="flex gap-2">
                <Link href={`/${s.slug}`} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm hover:border-forest transition"><span className="font-bold text-charcoal">Parks in {s.name}</span></Link>
                <Link href={`/groomers/${s.slug}`} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm hover:border-bark transition"><span className="font-bold text-charcoal">Groomers in {s.name}</span></Link>
                <Link href={`/vets/${s.slug}`} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm hover:border-forest transition"><span className="font-bold text-charcoal">Vets in {s.name}</span></Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {results.parks.length > 0 && (
        <section className="mb-8">
          <h2 className="font-[Cabin] font-bold text-charcoal text-lg mb-3">Dog Parks ({results.parks.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {results.parks.map(p => (
              <Link key={p.id} href={`/parks/${p.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-forest hover:shadow-sm transition">
                <p className="font-bold text-charcoal group-hover:text-forest transition text-sm truncate">{p.name}</p>
                <p className="text-gray-400 text-xs">{p.city}{p.city ? ", " : ""}{p.state}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {results.groomers.length > 0 && (
        <section className="mb-8">
          <h2 className="font-[Cabin] font-bold text-charcoal text-lg mb-3">Dog Groomers ({results.groomers.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {results.groomers.map(g => (
              <Link key={g.slug} href={`/groomers/${g.slug}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-bark hover:shadow-sm transition">
                <p className="font-bold text-charcoal group-hover:text-bark transition text-sm truncate">{g.name}</p>
                <p className="text-gray-400 text-xs">{g.city}, {g.stateAbbr}{g.rating > 0 ? ` · ${g.rating.toFixed(1)}★` : ""}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {results.vets.length > 0 && (
        <section className="mb-8">
          <h2 className="font-[Cabin] font-bold text-charcoal text-lg mb-3">Veterinarians ({results.vets.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {results.vets.map(v => (
              <Link key={v.slug} href={`/vets/${v.slug}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-forest hover:shadow-sm transition">
                <p className="font-bold text-charcoal group-hover:text-forest transition text-sm truncate">{v.name}</p>
                <p className="text-gray-400 text-xs">{v.city}, {v.stateAbbr}{v.rating > 0 ? ` · ${v.rating.toFixed(1)}★` : ""}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {query.length >= 2 && total === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg mb-4">No results found for &ldquo;{query}&rdquo;</p>
          <p className="text-muted text-sm">Try searching by city name, state, or business name.</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto px-4 py-12 text-center text-gray-400">Loading search...</div>}>
      <SearchResults />
    </Suspense>
  );
}
