"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { allVets, stateNames, stateSlugs } from "@/data/all-vets";
import AdSlot from "@/components/AdSlot";
import CletusAd from "@/components/CletusAd";

const stateList: { name: string; slug: string; code: string }[] = Object.entries(stateNames)
  .map(([code, name]) => ({ code, name, slug: stateSlugs[code] || code.toLowerCase() }))
  .sort((a, b) => a.name.localeCompare(b.name));

function countByState(abbr: string): number {
  return allVets.filter((v) => v.stateAbbr === abbr).length;
}

export default function VetsDirectoryPage() {
  const totalCount = allVets.length;
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (search.length < 2) return stateList;
    const q = search.toLowerCase();
    return stateList.filter((s) => s.name.toLowerCase().includes(q));
  }, [search]);

  const faqItems = [
    { q: "How do I find the best veterinarian near me?", a: "Use BarkSeeker's vet directory to browse veterinarians by state and city. Check ratings, read reviews, and compare clinics to find the best fit for your pet." },
    { q: "How much does a vet visit cost?", a: "A routine vet visit typically costs $50-$250 depending on your location and the services needed. Annual wellness exams, vaccinations, and preventive care are generally the most affordable visits." },
    { q: "What should I bring to my first vet visit?", a: "Bring your pet's medical records, vaccination history, a list of current medications, and any questions you have. It's also helpful to bring a stool sample for parasite testing." },
    { q: "How often should I take my dog to the vet?", a: "Adult dogs should visit the vet at least once a year for a wellness exam. Puppies need visits every 3-4 weeks until about 16 weeks old. Senior dogs (7+) should go every 6 months." },
    { q: "What's the difference between a veterinarian and an emergency vet?", a: "A regular veterinarian handles routine care, wellness exams, and scheduled procedures. Emergency vets are open 24/7 and handle urgent, life-threatening situations outside normal business hours." },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqItems.map((f) => ({
          "@type": "Question", name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }) }} />

      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="font-[Cabin] text-3xl md:text-5xl font-bold text-[#2B2B2B] mb-3">Find Veterinarians Near You</h1>
        <p className="text-gray-500 text-lg">Browse {totalCount.toLocaleString()} veterinarians across all 50 states on BarkSeeker.</p>
      </div>

      <AdSlot position="vets-top" />

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by state name..."
        className="w-full max-w-md mx-auto block px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#2D6A4F] transition mb-8"
      />

      {/* State Grid */}
      <h2 className="font-[Cabin] text-2xl font-bold text-[#2B2B2B] mb-4">Browse Veterinarians by State</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-12">
        {filtered.map((s) => {
          const count = countByState(s.code);
          return (
            <Link
              key={s.code}
              href={`/vets/${s.slug}`}
              className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <h3 className="font-[Cabin] font-bold text-[#2B2B2B] group-hover:text-[#2D6A4F] transition">{s.name}</h3>
              <p className="text-gray-400 text-sm mt-1">{count.toLocaleString()} vet{count !== 1 ? "s" : ""}</p>
            </Link>
          );
        })}
      </div>

      {/* Pet Insurance CTA */}
      <div className="bg-[#2D6A4F] rounded-2xl p-6 md:p-8 mb-10 text-white">
        <h2 className="font-[Cabin] text-2xl font-bold mb-2">Save on Vet Bills with Pet Insurance</h2>
        <p className="text-white/80 text-sm mb-4 max-w-lg">Pet insurance can cover up to 90% of unexpected vet bills. Compare plans and find the right coverage for your furry family member.</p>
        <Link href="/pet-insurance" className="inline-block bg-[#E8913A] hover:bg-[#d07e2e] text-white font-bold text-sm px-6 py-3 rounded-lg transition shadow-sm">
          Compare Pet Insurance Plans &rarr;
        </Link>
      </div>

      {/* Cross-links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <Link href="/groomers" className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
          <h3 className="font-[Cabin] font-bold text-[#2B2B2B] group-hover:text-[#2D6A4F] transition mb-1">Find Dog Groomers</h3>
          <p className="text-gray-500 text-sm">Browse groomers near you with ratings and reviews.</p>
        </Link>
        <Link href="/" className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
          <h3 className="font-[Cabin] font-bold text-[#2B2B2B] group-hover:text-[#2D6A4F] transition mb-1">Find Dog Parks</h3>
          <p className="text-gray-500 text-sm">Discover off-leash dog parks with maps and directions.</p>
        </Link>
      </div>

      <AdSlot position="vets-mid" />

      {/* FAQ */}
      <div className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-[#2B2B2B] mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {faqItems.map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-[#2B2B2B] text-sm hover:text-[#2D6A4F] transition list-none flex items-center justify-between">
                {f.q}
                <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </div>

      <CletusAd />

      {/* About */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
        <h2 className="font-[Cabin] text-xl font-bold text-[#2B2B2B] mb-3">About BarkSeeker&apos;s Vet Directory</h2>
        <p className="text-gray-600 leading-relaxed text-sm">
          BarkSeeker helps pet owners find trusted veterinarians across the United States. Our directory includes {totalCount.toLocaleString()} veterinary clinics with ratings, contact information, and locations. Whether you need a routine checkup, emergency care, or specialist, BarkSeeker makes it easy to find the right vet for your pet.
        </p>
      </div>
    </div>
  );
}
