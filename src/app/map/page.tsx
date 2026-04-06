"use client";

import { useState } from "react";
import Link from "next/link";

// Hardcoded state data with dog park counts
const states: { name: string; code: string; slug: string; lat: number; lng: number; parks: number }[] = [
  { name: "Alabama", code: "AL", slug: "alabama", lat: 32.8, lng: -86.8, parks: 122 },
  { name: "Arkansas", code: "AR", slug: "arkansas", lat: 35.2, lng: -92.2, parks: 38 },
  { name: "Colorado", code: "CO", slug: "colorado", lat: 39.1, lng: -105.4, parks: 4 },
  { name: "Connecticut", code: "CT", slug: "connecticut", lat: 41.6, lng: -72.7, parks: 65 },
  { name: "Delaware", code: "DE", slug: "delaware", lat: 39.0, lng: -75.5, parks: 24 },
  { name: "Florida", code: "FL", slug: "florida", lat: 27.8, lng: -81.8, parks: 506 },
  { name: "Georgia", code: "GA", slug: "georgia", lat: 32.9, lng: -83.6, parks: 249 },
  { name: "Hawaii", code: "HI", slug: "hawaii", lat: 19.9, lng: -155.6, parks: 14 },
  { name: "Illinois", code: "IL", slug: "illinois", lat: 40.3, lng: -89.0, parks: 309 },
  { name: "Indiana", code: "IN", slug: "indiana", lat: 40.3, lng: -86.1, parks: 157 },
  { name: "Iowa", code: "IA", slug: "iowa", lat: 42.0, lng: -93.2, parks: 83 },
  { name: "Kansas", code: "KS", slug: "kansas", lat: 38.5, lng: -98.8, parks: 93 },
  { name: "Kentucky", code: "KY", slug: "kentucky", lat: 37.8, lng: -84.3, parks: 69 },
  { name: "Louisiana", code: "LA", slug: "louisiana", lat: 31.2, lng: -92.1, parks: 10 },
  { name: "Maine", code: "ME", slug: "maine", lat: 45.3, lng: -69.4, parks: 34 },
  { name: "Maryland", code: "MD", slug: "maryland", lat: 39.0, lng: -76.6, parks: 374 },
  { name: "Massachusetts", code: "MA", slug: "massachusetts", lat: 42.4, lng: -71.4, parks: 181 },
  { name: "Michigan", code: "MI", slug: "michigan", lat: 44.3, lng: -85.6, parks: 316 },
  { name: "Minnesota", code: "MN", slug: "minnesota", lat: 46.7, lng: -94.7, parks: 187 },
  { name: "Mississippi", code: "MS", slug: "mississippi", lat: 32.7, lng: -89.7, parks: 11 },
  { name: "Missouri", code: "MO", slug: "missouri", lat: 38.5, lng: -92.3, parks: 63 },
  { name: "Nebraska", code: "NE", slug: "nebraska", lat: 41.1, lng: -98.3, parks: 30 },
  { name: "New Hampshire", code: "NH", slug: "new-hampshire", lat: 43.5, lng: -71.5, parks: 23 },
  { name: "New Jersey", code: "NJ", slug: "new-jersey", lat: 40.1, lng: -74.4, parks: 359 },
  { name: "New York", code: "NY", slug: "new-york", lat: 43.0, lng: -75.5, parks: 365 },
  { name: "North Carolina", code: "NC", slug: "north-carolina", lat: 35.6, lng: -79.8, parks: 345 },
  { name: "North Dakota", code: "ND", slug: "north-dakota", lat: 47.5, lng: -100.5, parks: 14 },
  { name: "Ohio", code: "OH", slug: "ohio", lat: 40.4, lng: -82.7, parks: 223 },
  { name: "Oklahoma", code: "OK", slug: "oklahoma", lat: 35.5, lng: -97.5, parks: 24 },
  { name: "Pennsylvania", code: "PA", slug: "pennsylvania", lat: 41.2, lng: -77.2, parks: 115 },
  { name: "South Carolina", code: "SC", slug: "south-carolina", lat: 33.8, lng: -81.2, parks: 61 },
  { name: "South Dakota", code: "SD", slug: "south-dakota", lat: 43.9, lng: -99.9, parks: 26 },
  { name: "Tennessee", code: "TN", slug: "tennessee", lat: 35.5, lng: -86.6, parks: 130 },
  { name: "Virginia", code: "VA", slug: "virginia", lat: 37.4, lng: -78.7, parks: 84 },
  { name: "West Virginia", code: "WV", slug: "west-virginia", lat: 38.6, lng: -80.6, parks: 1 },
];

const totalParks = states.reduce((sum, s) => sum + s.parks, 0);
const sortedByParks = [...states].sort((a, b) => b.parks - a.parks);
const sortedByName = [...states].sort((a, b) => a.name.localeCompare(b.name));

export default function MapPage() {
  const [sortBy, setSortBy] = useState<"parks" | "name">("parks");
  const displayed = sortBy === "parks" ? sortedByParks : sortedByName;

  // Google Maps embed with the US centered
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12500000!2d-98.5!3d39.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus";

  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-1">US Dog Park Map</h1>
        <p className="text-gray-500 mb-6">{totalParks.toLocaleString()}+ dog parks across {states.length} states. Click a state to explore.</p>

        {/* Map */}
        <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm mb-8" style={{ height: 480 }}>
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="US dog park map"
            allowFullScreen
          />
        </div>

        {/* Sort toggle */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal">All {states.length} States</h2>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
            <button onClick={() => setSortBy("parks")} className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${sortBy === "parks" ? "bg-white text-charcoal shadow-sm" : "text-gray-500"}`}>Most Parks</button>
            <button onClick={() => setSortBy("name")} className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${sortBy === "name" ? "bg-white text-charcoal shadow-sm" : "text-gray-500"}`}>A-Z</button>
          </div>
        </div>

        {/* State grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {displayed.map((s) => (
            <Link key={s.code} href={`/${s.slug}`} className="group bg-white border border-gray-200 rounded-lg p-3 hover:border-forest hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="flex items-start justify-between">
                <p className="font-bold text-charcoal text-sm group-hover:text-forest transition">{s.name}</p>
                <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{s.code}</span>
              </div>
              <p className="text-forest text-xs font-semibold mt-1">{s.parks.toLocaleString()} parks</p>
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-8 bg-cream rounded-xl p-6 text-center">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div>
              <p className="font-[Cabin] text-2xl font-bold text-charcoal">{totalParks.toLocaleString()}</p>
              <p className="text-gray-400 text-xs">Total Dog Parks</p>
            </div>
            <div>
              <p className="font-[Cabin] text-2xl font-bold text-charcoal">{states.length}</p>
              <p className="text-gray-400 text-xs">States Covered</p>
            </div>
            <div>
              <p className="font-[Cabin] text-2xl font-bold text-charcoal">Free</p>
              <p className="text-gray-400 text-xs">GPS Verified</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
