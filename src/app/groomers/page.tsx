"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { allGroomers, stateNames, stateSlugs } from "@/data/all-groomers";
import AdSlot from "@/components/AdSlot";

const stateList = Object.entries(stateSlugs)
  .map(([abbr, slug]) => ({ abbr, slug, name: stateNames[abbr] || abbr }))
  .sort((a, b) => a.name.localeCompare(b.name));

export default function GroomersDirectory() {
  const [search, setSearch] = useState("");

  const stateCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const g of allGroomers) map[g.stateAbbr] = (map[g.stateAbbr] || 0) + 1;
    return map;
  }, []);

  const filtered = search.length >= 2
    ? stateList.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    : stateList;

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "How do I find a good dog groomer near me?", acceptedAnswer: { "@type": "Answer", text: `BarkSeeker lists ${allGroomers.length.toLocaleString()} dog groomers across all 50 states. Browse by state or city to find top-rated groomers with reviews, phone numbers, and directions.` } },
          { "@type": "Question", name: "How much does dog grooming cost?", acceptedAnswer: { "@type": "Answer", text: "Dog grooming typically costs $30-$90 depending on your dog's size, breed, coat type, and the services requested. Full grooming packages with bath, haircut, nail trim, and ear cleaning tend to be on the higher end." } },
          { "@type": "Question", name: "How often should I get my dog groomed?", acceptedAnswer: { "@type": "Answer", text: "Most dogs should be professionally groomed every 4-8 weeks. Dogs with longer or thicker coats may need grooming every 4-6 weeks, while short-haired breeds can go 8-12 weeks between sessions." } },
          { "@type": "Question", name: "What should I look for in a dog groomer?", acceptedAnswer: { "@type": "Answer", text: "Look for groomers with positive reviews, proper certifications, a clean facility, and experience with your dog's breed. Ask about their handling techniques and whether they use cage-free drying." } },
          { "@type": "Question", name: "Do dog groomers need to be licensed?", acceptedAnswer: { "@type": "Answer", text: "Licensing requirements vary by state. While not all states require groomer licenses, many professional groomers hold certifications from organizations like the National Dog Groomers Association of America (NDGAA)." } },
        ],
      }) }} />

      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(45,106,79,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Dog Groomer Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Find Dog Groomers Near You</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{allGroomers.length.toLocaleString()} dog groomers across the United States. Find top-rated groomers with reviews, contact info, and directions.</p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-6">Browse Groomers by State</h2>
        {stateList.length > 10 && (
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search states..." className="w-full max-w-md px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-forest transition mb-6" />
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-12">
          {filtered.map((s) => (
            <Link key={s.abbr} href={`/groomers/${s.slug}`} className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <p className="font-bold text-charcoal group-hover:text-forest transition text-sm">{s.name}</p>
              <p className="text-gray-400 text-xs mt-1">{(stateCounts[s.abbr] || 0).toLocaleString()} groomers</p>
            </Link>
          ))}
        </div>

        <AdSlot position="groomers-mid" />

        {/* BabyMyDog Grooming Products */}
        <div className="my-8 rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #C4704B 0%, #D4885B 60%, #5B7B5E 100%)" }}>
          <div className="px-6 py-8 md:py-10">
            <h3 className="font-[Cabin] text-xl md:text-2xl font-bold text-white mb-2">Groom Your Dog at Home with BabyMyDog</h3>
            <p className="text-white/80 text-sm mb-6 max-w-md">Premium dog grooming products &mdash; shampoos, brushes, nail clippers, and more to keep your pup looking great between professional grooming sessions.</p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { href: "https://babymydog.com/best/dog-shampoo", label: "Shampoos", icon: "\uD83E\uDDF4" },
                { href: "https://babymydog.com/best/dog-brushes", label: "Brushes & Combs", icon: "\uD83E\uDEA5" },
                { href: "https://babymydog.com/best/dog-nail-clippers", label: "Nail Clippers", icon: "\u2702\uFE0F" },
              ].map((p) => (
                <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer" className="bg-white/15 hover:bg-white/25 rounded-xl p-3 text-center transition">
                  <span className="text-2xl block mb-1">{p.icon}</span>
                  <span className="text-white text-xs font-semibold">{p.label}</span>
                </a>
              ))}
            </div>
            <a href="https://babymydog.com" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-[#C4704B] font-bold text-sm px-6 py-2.5 rounded-lg hover:shadow-lg transition">
              Shop Grooming Products at BabyMyDog &rarr;
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {[
              { q: "How do I find a good dog groomer near me?", a: `BarkSeeker lists ${allGroomers.length.toLocaleString()} dog groomers across all 50 states. Browse by state or city to find top-rated groomers with reviews, phone numbers, and directions.` },
              { q: "How much does dog grooming cost?", a: "Dog grooming typically costs $30-$90 depending on your dog's size, breed, coat type, and the services requested. Full grooming packages with bath, haircut, nail trim, and ear cleaning tend to be on the higher end." },
              { q: "How often should I get my dog groomed?", a: "Most dogs should be professionally groomed every 4-8 weeks. Dogs with longer or thicker coats may need grooming every 4-6 weeks, while short-haired breeds can go 8-12 weeks between sessions." },
              { q: "What should I look for in a dog groomer?", a: "Look for groomers with positive reviews, proper certifications, a clean facility, and experience with your dog's breed. Ask about their handling techniques and whether they use cage-free drying." },
              { q: "Do dog groomers need to be licensed?", a: "Licensing requirements vary by state. While not all states require groomer licenses, many professional groomers hold certifications from organizations like the National Dog Groomers Association of America (NDGAA)." },
            ].map((f, i) => (
              <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
                <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-forest transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
                <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </div>

        {/* Cross-links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <Link href="/vets" className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-forest transition mb-1">Find a Vet Near You</h3>
            <p className="text-gray-400 text-sm">Browse veterinarians across all 50 states.</p>
          </Link>
          <Link href="/" className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-forest transition mb-1">Find Dog Parks Near You</h3>
            <p className="text-gray-400 text-sm">Explore off-leash dog parks across the country.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
