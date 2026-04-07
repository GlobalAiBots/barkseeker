"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { unified } from "@/data/all-parks";

const ParkMap = dynamic(() => import("@/components/ParkMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 500 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });

const stateList: { name: string; slug: string; code: string }[] = [
  { name: "Alabama", slug: "alabama", code: "AL" },
  { name: "Arizona", slug: "arizona", code: "AZ" },
  { name: "Arkansas", slug: "arkansas", code: "AR" },
  { name: "California", slug: "california", code: "CA" },
  { name: "Colorado", slug: "colorado", code: "CO" },
  { name: "Connecticut", slug: "connecticut", code: "CT" },
  { name: "Delaware", slug: "delaware", code: "DE" },
  { name: "Florida", slug: "florida", code: "FL" },
  { name: "Georgia", slug: "georgia", code: "GA" },
  { name: "Hawaii", slug: "hawaii", code: "HI" },
  { name: "Idaho", slug: "idaho", code: "ID" },
  { name: "Illinois", slug: "illinois", code: "IL" },
  { name: "Indiana", slug: "indiana", code: "IN" },
  { name: "Iowa", slug: "iowa", code: "IA" },
  { name: "Kansas", slug: "kansas", code: "KS" },
  { name: "Kentucky", slug: "kentucky", code: "KY" },
  { name: "Louisiana", slug: "louisiana", code: "LA" },
  { name: "Maine", slug: "maine", code: "ME" },
  { name: "Maryland", slug: "maryland", code: "MD" },
  { name: "Massachusetts", slug: "massachusetts", code: "MA" },
  { name: "Michigan", slug: "michigan", code: "MI" },
  { name: "Minnesota", slug: "minnesota", code: "MN" },
  { name: "Mississippi", slug: "mississippi", code: "MS" },
  { name: "Missouri", slug: "missouri", code: "MO" },
  { name: "Montana", slug: "montana", code: "MT" },
  { name: "Nebraska", slug: "nebraska", code: "NE" },
  { name: "Nevada", slug: "nevada", code: "NV" },
  { name: "New Hampshire", slug: "new-hampshire", code: "NH" },
  { name: "New Jersey", slug: "new-jersey", code: "NJ" },
  { name: "New Mexico", slug: "new-mexico", code: "NM" },
  { name: "New York", slug: "new-york", code: "NY" },
  { name: "North Carolina", slug: "north-carolina", code: "NC" },
  { name: "North Dakota", slug: "north-dakota", code: "ND" },
  { name: "Ohio", slug: "ohio", code: "OH" },
  { name: "Oklahoma", slug: "oklahoma", code: "OK" },
  { name: "Oregon", slug: "oregon", code: "OR" },
  { name: "Pennsylvania", slug: "pennsylvania", code: "PA" },
  { name: "South Carolina", slug: "south-carolina", code: "SC" },
  { name: "South Dakota", slug: "south-dakota", code: "SD" },
  { name: "Tennessee", slug: "tennessee", code: "TN" },
  { name: "Texas", slug: "texas", code: "TX" },
  { name: "Utah", slug: "utah", code: "UT" },
  { name: "Virginia", slug: "virginia", code: "VA" },
  { name: "Washington", slug: "washington", code: "WA" },
  { name: "West Virginia", slug: "west-virginia", code: "WV" },
  { name: "Wyoming", slug: "wyoming", code: "WY" },
];

// Lightweight park data for the map (only fields the map needs)
const mapParks = unified.map(p => ({ id: p.id, name: p.name, latitude: p.latitude, longitude: p.longitude, city: p.city }));

export default function MapPage() {
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState<"parks" | "name">("parks");

  const stateCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const r of unified) map[r.state] = (map[r.state] || 0) + 1;
    return map;
  }, []);

  const statesWithCounts = useMemo(() =>
    stateList.map(s => ({ ...s, count: stateCounts[s.code] || 0 })),
  [stateCounts]);

  const displayed = useMemo(() => {
    let list = statesWithCounts;
    if (filter) list = list.filter(s => s.name.toLowerCase().includes(filter.toLowerCase()));
    return sortBy === "parks" ? [...list].sort((a, b) => b.count - a.count) : [...list].sort((a, b) => a.name.localeCompare(b.name));
  }, [statesWithCounts, filter, sortBy]);

  const filteredParks = useMemo(() => {
    if (!filter) return mapParks;
    const q = filter.toLowerCase();
    const matchingCodes = stateList.filter(s => s.name.toLowerCase().includes(q)).map(s => s.code);
    if (matchingCodes.length > 0) return mapParks.filter(p => {
      const park = unified.find(u => u.id === p.id);
      return park && matchingCodes.includes(park.state);
    });
    return mapParks.filter(p => p.name.toLowerCase().includes(q) || (p.city && p.city.toLowerCase().includes(q)));
  }, [filter]);

  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-1">US Dog Park Map</h1>
        <p className="text-gray-500 mb-4">{unified.length.toLocaleString()}+ dog parks across {stateList.length} states. Click a marker to explore.</p>

        {/* Search/filter */}
        <div className="mb-4">
          <input type="text" value={filter} onChange={e => setFilter(e.target.value)} placeholder="Filter by state or city..." className="w-full max-w-md px-4 py-3 rounded-xl bg-white border border-gray-200 text-charcoal outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 transition text-sm" />
          {filter && <p className="text-xs text-gray-400 mt-2">Showing {filteredParks.length.toLocaleString()} of {mapParks.length.toLocaleString()} parks</p>}
        </div>

        {/* Map */}
        <ParkMap parks={filteredParks} height="500px" />

        {/* Sort toggle */}
        <div className="flex items-center justify-between mb-4 mt-8">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal">All {stateList.length} States</h2>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
            <button onClick={() => setSortBy("parks")} className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${sortBy === "parks" ? "bg-white text-charcoal shadow-sm" : "text-gray-500"}`}>Most Parks</button>
            <button onClick={() => setSortBy("name")} className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${sortBy === "name" ? "bg-white text-charcoal shadow-sm" : "text-gray-500"}`}>A-Z</button>
          </div>
        </div>

        {/* State grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {displayed.map((s) => (
            <Link key={s.code} href={`/${s.slug}`} className="group bg-white border border-gray-200 rounded-lg p-3 hover:bg-[#E8F0E5] hover:border-forest hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-forest">
              <div className="flex items-start justify-between">
                <p className="font-bold text-charcoal text-sm group-hover:text-forest transition">{s.name}</p>
                <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{s.code}</span>
              </div>
              <span className="inline-block mt-1 text-xs font-semibold bg-forest/10 text-forest px-2 py-0.5 rounded">{s.count.toLocaleString()} parks</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
