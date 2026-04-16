"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const states = [
  { name: "Alabama", slug: "alabama" }, { name: "Arizona", slug: "arizona" },
  { name: "Arkansas", slug: "arkansas" }, { name: "California", slug: "california" },
  { name: "Colorado", slug: "colorado" }, { name: "Connecticut", slug: "connecticut" },
  { name: "Delaware", slug: "delaware" }, { name: "Florida", slug: "florida" },
  { name: "Georgia", slug: "georgia" }, { name: "Hawaii", slug: "hawaii" },
  { name: "Idaho", slug: "idaho" }, { name: "Illinois", slug: "illinois" },
  { name: "Indiana", slug: "indiana" }, { name: "Iowa", slug: "iowa" },
  { name: "Kansas", slug: "kansas" }, { name: "Kentucky", slug: "kentucky" },
  { name: "Louisiana", slug: "louisiana" }, { name: "Maine", slug: "maine" },
  { name: "Maryland", slug: "maryland" }, { name: "Massachusetts", slug: "massachusetts" },
  { name: "Michigan", slug: "michigan" }, { name: "Minnesota", slug: "minnesota" },
  { name: "Mississippi", slug: "mississippi" }, { name: "Missouri", slug: "missouri" },
  { name: "Montana", slug: "montana" }, { name: "Nebraska", slug: "nebraska" },
  { name: "Nevada", slug: "nevada" }, { name: "New Hampshire", slug: "new-hampshire" },
  { name: "New Jersey", slug: "new-jersey" }, { name: "New Mexico", slug: "new-mexico" },
  { name: "New York", slug: "new-york" }, { name: "North Carolina", slug: "north-carolina" },
  { name: "North Dakota", slug: "north-dakota" }, { name: "Ohio", slug: "ohio" },
  { name: "Oklahoma", slug: "oklahoma" }, { name: "Oregon", slug: "oregon" },
  { name: "Pennsylvania", slug: "pennsylvania" }, { name: "South Carolina", slug: "south-carolina" },
  { name: "South Dakota", slug: "south-dakota" }, { name: "Tennessee", slug: "tennessee" },
  { name: "Texas", slug: "texas" }, { name: "Utah", slug: "utah" },
  { name: "Virginia", slug: "virginia" }, { name: "Washington", slug: "washington" },
  { name: "West Virginia", slug: "west-virginia" }, { name: "Wyoming", slug: "wyoming" },
];

function getContext(pathname: string): { prefix: string; label: string } {
  if (pathname.startsWith("/groomers")) return { prefix: "/groomers", label: "States" };
  if (pathname.startsWith("/vets")) return { prefix: "/vets", label: "States" };
  return { prefix: "", label: "States" };
}

export default function StatesDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const ctx = getContext(pathname);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="flex items-center gap-4">
      <Link href="/groomers" className={`text-sm font-medium transition ${pathname.startsWith("/groomers") ? "text-forest" : "text-gray-500 hover:text-forest"}`}>Groomers</Link>
      <Link href="/vets" className={`text-sm font-medium transition ${pathname.startsWith("/vets") ? "text-forest" : "text-gray-500 hover:text-forest"}`}>Vets</Link>
      <div ref={ref} className="relative">
        <button onClick={() => setOpen(!open)} className="text-gray-500 hover:text-forest transition flex items-center gap-1 text-sm font-medium">
          {ctx.label}
          <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </button>
        {open && (
          <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1 w-36 max-h-80 overflow-y-auto">
            {states.map((s) => (
              <Link key={s.slug} href={`${ctx.prefix}/${s.slug}`} onClick={() => setOpen(false)} className="block px-4 py-2 text-sm text-gray-600 hover:bg-forest/5 hover:text-forest transition">
                {s.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
