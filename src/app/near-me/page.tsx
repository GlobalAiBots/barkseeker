"use client";
import { use, useMemo } from "react";
import Link from "next/link";
import { unified } from "@/data/all-parks";

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959; const dLat = (lat2 - lat1) * Math.PI / 180; const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function NearMePage({ searchParams }: { searchParams: Promise<{ lat?: string; lng?: string }> }) {
  const params = use(searchParams);
  const lat = parseFloat(params.lat || "0"), lng = parseFloat(params.lng || "0");
  const nearby = useMemo(() => {
    if (!lat || !lng) return [];
    return unified.map(p => ({ ...p, distance: haversine(lat, lng, p.latitude, p.longitude) })).filter(p => p.distance <= 50).sort((a, b) => a.distance - b.distance).slice(0, 20);
  }, [lat, lng]);

  if (!lat || !lng) return (<div className="max-w-2xl mx-auto px-4 py-20 text-center"><h1 className="font-[Cabin] text-3xl font-bold text-charcoal mb-4">Location Required</h1><p className="text-gray-500 mb-8">Use the &quot;Find Near Me&quot; button on the homepage.</p><Link href="/" className="bg-bark text-white font-bold px-6 py-3 rounded-lg transition inline-block">Go Home</Link></div>);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="font-[Cabin] text-3xl font-bold text-charcoal mb-2">Dog Parks Near You</h1>
      <p className="text-gray-500 mb-8">{nearby.length} dog parks within 50 miles</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {nearby.map(p => (<Link key={p.id} href={`/parks/${p.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all border-l-4 border-l-forest"><h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-forest transition">{p.name}</h3><p className="text-gray-500 text-sm mt-1">{p.city}, {p.state}</p><p className="text-bark text-sm font-semibold mt-2">{p.distance.toFixed(1)} miles</p></Link>))}
      </div>
    </div>
  );
}
