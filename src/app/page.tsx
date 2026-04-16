"use client";

/* eslint-disable @next/next/no-img-element */

import { useState, useMemo } from "react";
import Link from "next/link";
import { unified } from "@/data/all-parks";
import { allGroomers } from "@/data/all-groomers";
import { allVets } from "@/data/all-vets";
import AdSlot from "@/components/AdSlot";
import CletusAd from "@/components/CletusAd";
import NearMeButton from "@/components/NearMeButton";
import { blogPosts } from "@/data/blog-posts";

function pluralize(count: number, singular: string, plural: string) {
  return count === 1 ? `${count} ${singular}` : `${count.toLocaleString()} ${plural}`;
}

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


export default function Home() {
  const [query, setQuery] = useState("");

  const stateCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const r of unified) map[r.state] = (map[r.state] || 0) + 1;
    return map;
  }, []);

  const statesWithCounts = useMemo(() =>
    stateList.map((s) => ({ ...s, count: stateCounts[s.code] || 0 })).sort((a, b) => b.count - a.count),
  [stateCounts]);

  const suggestions = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    const results: { type: string; label: string; href: string }[] = [];
    stateList.filter((s) => s.name.toLowerCase().includes(q)).slice(0, 4).forEach((s) => {
      results.push({ type: "State", label: s.name, href: `/${s.slug}` });
    });
    unified.filter((r) => r.name.toLowerCase().includes(q)).slice(0, 5).forEach((r) => {
      results.push({ type: "Park", label: `${r.name} (${r.state})`, href: `/parks/${r.id}` });
    });
    return results.slice(0, 8);
  }, [query]);

  const parkCount = unified.length.toLocaleString();

  return (
    <div>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebSite", name: "BarkSeeker", url: "https://barkseeker.com",
        description: `Find dog parks, groomers, and vets near you. 40,000+ listings across all 50 states. Free forever.`,
        potentialAction: { "@type": "SearchAction", target: "https://barkseeker.com/?q={search_term_string}", "query-input": "required name=search_term_string" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Organization", name: "BarkSeeker", url: "https://barkseeker.com",
        description: "The most complete pet services directory in America. Dog parks, groomers, and vets across all 50 states.",
      }) }} />

      {/* HERO — Full-bleed */}
      <section className="relative min-h-[50vh] md:min-h-[70vh] flex flex-col items-center justify-center overflow-hidden">
        <img src="/images/hero-dogs-playing-park.jpg" alt="Dogs playing together at a park" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(45,59,46,0.85) 0%, rgba(45,59,46,0.4) 50%, transparent 100%)' }} />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto pt-8">
          <p className="text-white/60 text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Your Complete Dog Care Hub</p>
          <h1 className="font-[Cabin] text-5xl md:text-7xl font-bold text-white leading-tight">
            Everything Your<br />Dog Needs
          </h1>
          <p className="text-white/80 mt-4 max-w-lg mx-auto text-lg">
            Dog parks, groomers, and vets &mdash; find the best care for your pup across all 50 states.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto mt-8 relative">
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by state, city, or park name..."
              className="w-full px-5 py-4 rounded-xl bg-white text-charcoal outline-none focus:ring-2 focus:ring-forest/40 transition shadow-2xl text-sm font-['Source_Sans_3']" />
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden">
                {suggestions.map((s, i) => (
                  <Link key={i} href={s.href} className="flex items-center gap-3 px-4 py-3 hover:bg-forest/5 transition border-b border-gray-100 last:border-0">
                    <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{s.type}</span>
                    <span className="text-sm text-charcoal">{s.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-center mt-4">
            <NearMeButton label="Find Parks Near Me" color="#2D6A4F" />
          </div>

          {/* Top states */}
          <div className="flex gap-2 justify-center mt-4 flex-wrap max-w-2xl mx-auto">
            {statesWithCounts.slice(0, 6).map((s) => (
              <Link key={s.code} href={`/${s.slug}`} className="bg-white/15 hover:bg-white/25 text-white font-bold px-4 py-2 rounded-lg transition text-xs backdrop-blur-sm border border-white/10">{s.name} ({s.count.toLocaleString()})</Link>
            ))}
          </div>
        </div>

        {/* Stats overlay */}
        <div className="relative z-10 w-full mt-auto">
          <div className="bg-[#2D3B2E]/80 backdrop-blur-sm border-t border-white/10 py-5">
            <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16 text-center">
              {[
                { value: parkCount, label: "Dog Parks" },
                { value: String(stateList.length), label: "States" },
                { value: "Free", label: "& Updated" },
                { value: "GPS", label: "Verified" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-[Cabin] text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-white/50 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* YOUR COMPLETE DOG CARE HUB */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal text-center mb-3">Your Complete Dog Care Hub</h2>
        <p className="text-gray-500 text-center mb-8 max-w-lg mx-auto">Everything your dog needs — parks, grooming, and veterinary care — all in one place.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Link href="/" className="group bg-white border-2 border-forest rounded-2xl p-6 shadow-sm text-center hover:shadow-lg hover:-translate-y-0.5 transition-all">
            <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl">&#127795;</span>
            </div>
            <h3 className="font-[Cabin] font-bold text-charcoal text-lg mb-1">Dog Parks</h3>
            <p className="text-forest font-bold text-sm mb-2">{parkCount}+ parks</p>
            <p className="text-gray-500 text-xs">Off-leash areas, fenced parks, and amenities across all 50 states.</p>
            <span className="inline-block mt-3 text-bark font-bold text-sm group-hover:translate-x-1 transition-transform">Browse &rarr;</span>
          </Link>
          <Link href="/groomers" className="group bg-white border-2 border-forest rounded-2xl p-6 shadow-sm text-center hover:shadow-lg hover:-translate-y-0.5 transition-all">
            <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl">&#9986;&#65039;</span>
            </div>
            <h3 className="font-[Cabin] font-bold text-charcoal text-lg mb-1">Dog Groomers</h3>
            <p className="text-forest font-bold text-sm mb-2">{allGroomers.length.toLocaleString()}+ groomers</p>
            <p className="text-gray-500 text-xs">Professional groomers with ratings, reviews, and contact info.</p>
            <span className="inline-block mt-3 text-bark font-bold text-sm group-hover:translate-x-1 transition-transform">Browse &rarr;</span>
          </Link>
          <Link href="/vets" className="group bg-white border-2 border-forest rounded-2xl p-6 shadow-sm text-center hover:shadow-lg hover:-translate-y-0.5 transition-all">
            <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl">&#128137;</span>
            </div>
            <h3 className="font-[Cabin] font-bold text-charcoal text-lg mb-1">Veterinarians</h3>
            <p className="text-forest font-bold text-sm mb-2">{allVets.length.toLocaleString()}+ vets</p>
            <p className="text-gray-500 text-xs">Trusted veterinarians with locations, ratings, and contact details.</p>
            <span className="inline-block mt-3 text-bark font-bold text-sm group-hover:translate-x-1 transition-transform">Browse &rarr;</span>
          </Link>
        </div>
        <div className="text-center">
          <Link href="/pet-insurance" className="inline-flex items-center gap-2 bg-cream border-2 border-bark rounded-xl px-6 py-3 hover:shadow-md transition">
            <span className="text-xl">&#128737;&#65039;</span>
            <span className="font-[Cabin] font-bold text-charcoal text-sm">Compare Pet Insurance Plans</span>
            <span className="text-bark font-bold text-sm">&rarr;</span>
          </Link>
        </div>
      </section>

      {/* BROWSE DOG PARKS BY STATE */}
      <section id="browse-states" className="max-w-5xl mx-auto px-4 pt-14 pb-8">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-6">Browse Dog Parks by State</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {statesWithCounts.map((s) => (
            <Link key={s.code} href={`/${s.slug}`} className="group bg-white border border-gray-200 rounded-lg p-3 hover:bg-[#E8F0E5] hover:border-forest hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-forest">
              <p className="font-bold text-charcoal text-sm group-hover:text-forest transition">{s.name}</p>
              <span className="inline-block mt-1 text-xs font-semibold bg-forest/10 text-forest px-2 py-0.5 rounded">{pluralize(s.count, 'park', 'parks')}</span>
            </Link>
          ))}
        </div>
      </section>

      <AdSlot position="homepage-mid" />

      {/* WHY BARKSEEKER */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal text-center mb-8">Why BarkSeeker</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { icon: "&#128205;", title: "GPS Coordinates", desc: "Exact location for every park. Never end up at the wrong entrance again." },
            { icon: "&#128054;", title: "Off-Leash Info", desc: "Know which parks have off-leash areas, fenced sections, and small dog zones." },
            { icon: "&#127793;", title: "Amenity Details", desc: "Find parks with water stations, shade, agility equipment, and waste bags." },
            { icon: "&#128274;", title: "Free Forever", desc: "No login. No account. No fees. Just find your park and go." },
            { icon: "&#128241;", title: "Mobile Friendly", desc: "Full GPS and directions on any phone. No app needed." },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-xl p-5 shadow-sm text-center transition-all hover:shadow-md" style={{ borderTop: '3px solid #2D6A4F' }}>
              <div className="w-14 h-14 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl" dangerouslySetInnerHTML={{ __html: f.icon }} />
              </div>
              <h3 className="font-[Cabin] font-bold text-charcoal text-sm mb-1">{f.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BABYMYDOG PROMO */}
      <section className="max-w-5xl mx-auto px-4 py-6">
        <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #C4704B 0%, #D4885B 60%, #5B7B5E 100%)" }}>
          <div className="px-6 py-8 md:py-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <h3 className="font-[Cabin] text-xl md:text-2xl font-bold text-white mb-2">Gear Up for the Park &#128054;</h3>
              <p className="text-white/80 text-sm max-w-md">Expert-picked leashes, harnesses, treats, and toys. Everything your pup needs for a great day out.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "https://babymydog.com/best/dog-leashes", label: "Leashes" },
                { href: "https://babymydog.com/best/dog-toys", label: "Toys" },
                { href: "https://babymydog.com/best/dog-treats", label: "Treats" },
              ].map((p) => (
                <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer" className="bg-white/15 hover:bg-white/25 text-white font-bold text-xs px-4 py-2 rounded-lg transition">{p.label}</a>
              ))}
              <a href="https://babymydog.com" target="_blank" rel="noopener noreferrer" className="bg-white text-[#C4704B] font-bold text-xs px-4 py-2 rounded-lg hover:shadow-lg transition">Shop All &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal">Dog Owner Tips &amp; Guides</h2>
          <Link href="/blog" className="text-sm font-semibold text-bark hover:text-bark-dark transition">All posts &rarr;</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {blogPosts.slice(0, 3).map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group bg-white rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div className="aspect-[16/9] flex items-center justify-center" style={{ background: p.gradient }}>
                <span className="text-white/30 text-4xl font-bold font-[Cabin]">{p.category}</span>
              </div>
              <div className="p-4">
                <p className="text-gray-400 text-xs mb-1">{p.date} &middot; {p.readTime}</p>
                <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-forest transition text-sm">{p.title}</h3>
                <p className="text-gray-500 text-xs mt-2 leading-relaxed">{(p.description || "").substring(0, 120)}...</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <AdSlot position="homepage-pre-faq" />

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "How many dog parks does BarkSeeker cover?", acceptedAnswer: { "@type": "Answer", text: `We have data on ${parkCount}+ dog parks across ${stateList.length} states.` } },
            { "@type": "Question", name: "Is BarkSeeker free?", acceptedAnswer: { "@type": "Answer", text: "Yes, completely free. No login, no account, no fees. Just find your park and go." } },
            { "@type": "Question", name: "How do I find a dog park near me?", acceptedAnswer: { "@type": "Answer", text: `Use the search bar to search by state, city, or park name. We cover ${stateList.length} states with detailed dog park directories.` } },
          ],
        }) }} />
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {[
            { q: "How many dog parks does BarkSeeker cover?", a: `We have data on ${parkCount}+ dog parks across ${stateList.length} states with GPS coordinates, amenities, and off-leash info.` },
            { q: "Is BarkSeeker free?", a: "Yes, completely free. No login, no account needed. Just find your park and go." },
            { q: "How do I find a dog park near me?", a: `Use the search bar or browse by state. We cover ${stateList.length} states with detailed dog park directories.` },
            { q: "Can I submit a park you're missing?", a: "Yes! Email hello@barkseeker.com with the park name and location. We'll add it to the directory." },
          ].map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-forest transition list-none flex items-center justify-between">
                {f.q}
                <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-16" style={{ background: '#2D3B2E' }}>
        <div className="max-w-lg mx-auto px-4 text-center">
          <h2 className="font-[Cabin] text-2xl font-bold text-white mb-2">Get Park Updates &#128054;</h2>
          <p className="text-white/70 text-sm mb-6">New parks, seasonal tips, and dog-friendly spots delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="email" placeholder="your@email.com" className="flex-1 px-5 py-3.5 rounded-xl text-sm outline-none bg-white/10 text-white placeholder-white/40 border border-white/10 focus:border-forest transition" />
            <button className="bg-bark hover:bg-bark-dark text-white font-bold px-7 py-3.5 rounded-xl transition text-sm whitespace-nowrap">Subscribe Free</button>
          </div>
          <p className="text-white/30 text-xs mt-3">No spam, ever. Unsubscribe anytime.</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4"><CletusAd /></div>

      {/* Submit */}
      <section id="submit" className="max-w-2xl mx-auto px-4 pb-20 pt-10">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-2">Know a park we&apos;re missing?</h2>
          <p className="text-gray-500 text-sm mb-6">Help us build the most complete dog park directory in America.</p>
          <a href="mailto:hello@barkseeker.com?subject=New%20Park%20Submission" className="bg-bark hover:bg-bark-dark text-white font-bold py-3 px-8 rounded-lg transition shadow-sm inline-block">Submit a Park</a>
        </div>
      </section>
    </div>
  );
}
