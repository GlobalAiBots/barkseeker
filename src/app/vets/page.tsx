"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { allVets, stateNames, stateSlugs } from "@/data/all-vets";
import AdSlot from "@/components/AdSlot";
import CletusAd from "@/components/CletusAd";

const ParkMap = dynamic(() => import("@/components/ParkMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 400 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });

const stateList = Object.entries(stateSlugs)
  .map(([abbr, slug]) => ({ abbr, slug, name: stateNames[abbr] || abbr }))
  .sort((a, b) => a.name.localeCompare(b.name));

export default function VetsDirectoryPage() {
  const [search, setSearch] = useState("");

  const stateCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const v of allVets) map[v.stateAbbr] = (map[v.stateAbbr] || 0) + 1;
    return map;
  }, []);

  const statesWithData = useMemo(() => stateList.filter((s) => (stateCounts[s.abbr] || 0) > 0), [stateCounts]);

  const filtered = search.length >= 2
    ? statesWithData.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    : statesWithData;

  const mapParks = useMemo(() => {
    const sampled = allVets.filter((_, i) => i % 3 === 0);
    return sampled.filter(v => v.latitude && v.longitude).map(v => ({ id: v.slug, name: v.name, latitude: v.latitude, longitude: v.longitude, city: v.city }));
  }, []);

  const faqItems = [
    { q: "How do I find the best veterinarian near me?", a: "Use BarkSeeker's vet directory to browse veterinarians by state and city. Check ratings, read reviews, and compare clinics to find the best fit for your pet." },
    { q: "How much does a vet visit cost?", a: "A routine vet visit typically costs $50-$250. Emergency visits can range from $500-$5,000+ depending on the treatment needed." },
    { q: "What should I bring to my first vet visit?", a: "Bring your pet's medical records, vaccination history, a list of current medications, and any questions you have. A stool sample for parasite testing is also helpful." },
    { q: "How often should I take my dog to the vet?", a: "Adult dogs should visit the vet at least once a year. Puppies need visits every 3-4 weeks until 16 weeks. Senior dogs (7+) should go every 6 months." },
    { q: "What's the difference between a regular vet and an emergency vet?", a: "A regular veterinarian handles routine care and scheduled procedures. Emergency vets are open 24/7 and handle urgent, life-threatening situations." },
  ];

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqItems.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(45,106,79,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Veterinarian Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Find Veterinarians Near You</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{allVets.length.toLocaleString()} veterinarians across the United States. Ratings, reviews, and contact info.</p>
      </section>

      {/* Intro + Tips */}
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-2">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">Find the Right Veterinarian</h2>
          <p className="text-gray-600 leading-relaxed text-sm">Finding the right veterinarian is one of the most important decisions for pet owners. A good vet becomes your partner in keeping your dog healthy through routine checkups, vaccinations, emergency care, and everything in between. BarkSeeker&apos;s directory includes {allVets.length.toLocaleString()} veterinarians across {statesWithData.length} states with ratings, reviews, phone numbers, and directions.</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
          <h3 className="font-[Cabin] font-bold text-forest mb-3">5 Tips for Choosing a Veterinarian</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> <strong>Look for AAHA accreditation</strong> &mdash; the gold standard for veterinary practices, with rigorous quality standards.</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> <strong>Schedule a meet-and-greet</strong> &mdash; visit the clinic before committing to see how staff interact with animals.</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> <strong>Ask about emergency protocols</strong> &mdash; does the clinic handle after-hours emergencies or refer to an ER?</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> <strong>Check insurance acceptance</strong> &mdash; confirm they accept your pet insurance or offer payment plans.</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> <strong>Read our complete guide</strong> &mdash; <Link href="/blog/how-to-find-good-veterinarian" className="text-forest hover:underline">How to Find a Good Veterinarian</Link> covers questions, red flags, and AAHA accreditation.</li>
          </ul>
        </div>
      </section>

      {/* Pet Insurance CTA */}
      <section className="max-w-5xl mx-auto px-4 py-4">
        <div className="bg-forest rounded-2xl p-6 md:p-8 text-white">
          <h2 className="font-[Cabin] text-2xl font-bold mb-2">Save on Vet Bills with Pet Insurance</h2>
          <p className="text-white/80 text-sm mb-4 max-w-lg">Pet insurance can cover up to 90% of unexpected vet bills. A single emergency surgery can cost $3,000-$10,000+. Compare plans and find the right coverage for your dog.</p>
          <Link href="/pet-insurance" className="inline-block bg-bark hover:bg-bark-dark text-white font-bold text-sm px-6 py-3 rounded-lg transition shadow-sm">Compare Pet Insurance Plans &rarr;</Link>
        </div>
      </section>

      {/* Map */}
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-4">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Veterinarians Across the US</h2>
        <ParkMap parks={mapParks} center={[39.8, -98.5]} zoom={4} height="400px" className="mb-4" />
      </div>

      <section className="max-w-5xl mx-auto px-4 py-6">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-6">Browse Veterinarians by State</h2>
        {statesWithData.length > 10 && (
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search states..." className="w-full max-w-md px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-forest transition mb-6" />
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-12">
          {filtered.map((s) => (
            <Link key={s.abbr} href={`/vets/${s.slug}`} className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <p className="font-bold text-charcoal group-hover:text-forest transition text-sm">{s.name}</p>
              <p className="text-gray-400 text-xs mt-1">{(stateCounts[s.abbr] || 0).toLocaleString()} vets</p>
            </Link>
          ))}
        </div>

        <AdSlot position="vets-mid" />

        {/* Featured Articles */}
        <div className="mb-10">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Vet Care Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/blog/how-much-does-vet-visit-cost" className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <p className="font-bold text-charcoal group-hover:text-forest transition text-sm mb-1">How Much Does a Vet Visit Cost?</p>
              <p className="text-gray-400 text-xs">Complete cost breakdown &mdash; routine $50-250, emergency $500-5000+.</p>
            </Link>
            <Link href="/blog/is-pet-insurance-worth-it" className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <p className="font-bold text-charcoal group-hover:text-forest transition text-sm mb-1">Is Pet Insurance Worth It?</p>
              <p className="text-gray-400 text-xs">Comprehensive analysis of costs vs. coverage for dog owners.</p>
            </Link>
            <Link href="/blog/when-to-take-dog-to-vet" className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <p className="font-bold text-charcoal group-hover:text-forest transition text-sm mb-1">When to Take Your Dog to the Vet</p>
              <p className="text-gray-400 text-xs">Warning signs you shouldn&apos;t ignore &mdash; emergency vs. routine.</p>
            </Link>
            <Link href="/blog/what-vaccines-does-my-dog-need" className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <p className="font-bold text-charcoal group-hover:text-forest transition text-sm mb-1">What Vaccines Does My Dog Need?</p>
              <p className="text-gray-400 text-xs">Core vs. non-core vaccines, schedules, and costs.</p>
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqItems.map((f, i) => (
              <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
                <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-forest transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
                <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </div>

        {/* Cross-links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <Link href="/groomers" className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-forest transition mb-1">Find Dog Groomers</h3>
            <p className="text-gray-400 text-sm">Browse groomers near you with ratings and reviews.</p>
          </Link>
          <Link href="/" className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-forest transition mb-1">Find Dog Parks</h3>
            <p className="text-gray-400 text-sm">Explore off-leash dog parks across the country.</p>
          </Link>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4"><CletusAd /></div>
    </div>
  );
}
