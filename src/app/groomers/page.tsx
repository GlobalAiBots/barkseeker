"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { allGroomers, stateNames, stateSlugs } from "@/data/all-groomers";
import AdSlot from "@/components/AdSlot";
import CletusAd from "@/components/CletusAd";

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

  const statesWithData = useMemo(() => stateList.filter((s) => (stateCounts[s.abbr] || 0) > 0), [stateCounts]);

  const filtered = search.length >= 2
    ? statesWithData.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    : statesWithData;

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

      <section className="relative min-h-[45vh] md:min-h-[55vh] flex flex-col items-center justify-center overflow-hidden">
        <img src="/images/poodle-professional-grooming-salon.jpg" alt="Professional dog groomer styling a poodle in a grooming salon" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,58,42,0.88) 0%, rgba(26,58,42,0.45) 50%, rgba(26,58,42,0.15) 100%)' }} />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto py-16">
          <p className="text-white/70 text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Dog Groomer Directory</p>
          <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-white leading-tight max-w-3xl mx-auto" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>Find Dog Groomers Near You</h1>
          <p className="text-white/85 mt-4 max-w-lg mx-auto" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}>{allGroomers.length.toLocaleString()} dog groomers across the United States. Find top-rated groomers with reviews, contact info, and directions.</p>
        </div>
      </section>

      {/* Trust Signal */}
      <section className="py-3 text-center" style={{ background: '#F0FFF4' }}>
        <p className="text-forest font-bold text-sm tracking-wide font-[Cabin]">&#11088; {allGroomers.length.toLocaleString()} Groomers Across {statesWithData.length} States &mdash; Free Forever</p>
      </section>

      {/* Intro + Tips */}
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-2">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">Find a Trusted Dog Groomer</h2>
          <p className="text-gray-600 leading-relaxed text-sm">Finding a trusted dog groomer is essential for your pup&apos;s health and happiness. Regular grooming keeps your dog&apos;s coat clean, skin healthy, nails trimmed, and ears free of infection. BarkSeeker&apos;s directory includes {allGroomers.length.toLocaleString()} groomers across {statesWithData.length} states with ratings, reviews, phone numbers, and directions to help you find the perfect groomer nearby.</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
          <h3 className="font-[Cabin] font-bold text-forest mb-3">5 Tips for Choosing a Dog Groomer</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> <strong>Check reviews and ratings</strong> &mdash; look for consistently positive feedback from other dog owners in your area.</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> <strong>Ask about certifications</strong> &mdash; NDGAA or IPG certification shows professional training and commitment.</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> <strong>Visit the facility first</strong> &mdash; check for cleanliness, proper ventilation, and calm handling of animals.</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> <strong>Discuss your dog&apos;s needs</strong> &mdash; share breed-specific requirements, allergies, or anxiety issues upfront.</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> <strong>Read our complete guide</strong> &mdash; <Link href="/blog/how-to-find-good-dog-groomer" className="text-forest hover:underline">How to Find a Good Dog Groomer</Link> covers red flags, green flags, and questions to ask.</li>
          </ul>
        </div>
      </section>

<section className="max-w-5xl mx-auto px-4 py-6">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-6">Browse Groomers by State</h2>
        {statesWithData.length > 10 && (
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search states..." className="w-full max-w-md px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-forest transition mb-6" />
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-12">
          {filtered.map((s) => (
            <Link key={s.abbr} href={`/groomers/${s.slug}`} className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <p className="font-bold text-charcoal group-hover:text-forest transition text-sm">{s.name}</p>
              <p className="text-gray-400 text-xs mt-1">{(() => { const c = stateCounts[s.abbr] || 0; return c === 1 ? "1 groomer" : `${c.toLocaleString()} groomers`; })()}</p>
            </Link>
          ))}
        </div>

        <AdSlot position="groomers-mid" />

        {/* Featured Articles */}
        <div className="mb-10">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Grooming Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/blog/how-much-does-dog-grooming-cost" className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <p className="font-bold text-charcoal group-hover:text-forest transition text-sm mb-1">How Much Does Dog Grooming Cost?</p>
              <p className="text-gray-400 text-xs">Complete pricing guide &mdash; $30-$150+ by breed and service type.</p>
            </Link>
            <Link href="/blog/how-often-should-you-groom-your-dog" className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <p className="font-bold text-charcoal group-hover:text-forest transition text-sm mb-1">How Often Should You Groom Your Dog?</p>
              <p className="text-gray-400 text-xs">Grooming frequency guide by coat type and breed.</p>
            </Link>
            <Link href="/blog/do-you-tip-dog-groomer" className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <p className="font-bold text-charcoal group-hover:text-forest transition text-sm mb-1">Do You Tip a Dog Groomer?</p>
              <p className="text-gray-400 text-xs">Tipping etiquette &mdash; how much, when, and why.</p>
            </Link>
            <Link href="/blog/dog-grooming-for-anxious-dogs" className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <p className="font-bold text-charcoal group-hover:text-forest transition text-sm mb-1">Grooming for Anxious Dogs</p>
              <p className="text-gray-400 text-xs">Calming tips and how to find a fear-free groomer.</p>
            </Link>
          </div>
        </div>

        {/* BabyMyDog Promo */}
        <div className="my-8 rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #C4704B 0%, #D4885B 60%, #5B7B5E 100%)" }}>
          <div className="px-6 py-8 md:py-10">
            <h3 className="font-[Cabin] text-xl md:text-2xl font-bold text-white mb-2">Groom Your Dog at Home with BabyMyDog</h3>
            <p className="text-white/80 text-sm mb-6 max-w-md">Premium dog grooming products &mdash; shampoos, brushes, nail clippers, and more.</p>
            <a href="https://babymydog.com" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-[#C4704B] font-bold text-sm px-6 py-2.5 rounded-lg hover:shadow-lg transition">Shop BabyMyDog &rarr;</a>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {[
              { q: "How do I find a good dog groomer near me?", a: `BarkSeeker lists ${allGroomers.length.toLocaleString()} dog groomers across all 50 states. Browse by state or city to find top-rated groomers.` },
              { q: "How much does dog grooming cost?", a: "Dog grooming typically costs $30-$90. Full packages with bath, haircut, nail trim, and ear cleaning run $60-$150+." },
              { q: "How often should I get my dog groomed?", a: "Most dogs need professional grooming every 4-8 weeks. Long-coated breeds may need it every 4-6 weeks." },
              { q: "What should I look for in a groomer?", a: "Positive reviews, certifications (NDGAA/IPG), clean facilities, and experience with your breed." },
              { q: "Do groomers need to be licensed?", a: "Requirements vary by state. Many professional groomers hold NDGAA or IPG certifications." },
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

      <div className="max-w-5xl mx-auto px-4"><CletusAd /></div>
    </div>
  );
}
