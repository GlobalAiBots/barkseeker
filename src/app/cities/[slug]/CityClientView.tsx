"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const ParkMap = dynamic(() => import("@/components/ParkMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 350 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });

interface ClientPark { id: string; name: string; latitude: number; longitude: number; city: string; state: string; }

export default function CityClientView({ parks, center }: { parks: ClientPark[]; center: [number, number] }) {
  const [search, setSearch] = useState("");
  const filtered = search.length >= 2
    ? parks.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    : parks;

  const mapParks = parks.map(p => ({ id: p.id, name: p.name, latitude: p.latitude, longitude: p.longitude, city: p.city }));

  return (
    <>
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
    </>
  );
}
