import Link from "next/link";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { allGroomers, getGroomerBySlug, getGroomersByState, stateNames, stateSlugs, slugToAbbr, slugify } from "@/data/all-groomers";
import CletusAd from "@/components/CletusAd";
import FeaturedArticle from "@/components/FeaturedArticle";
import AdSlot from "@/components/AdSlot";
import nearbyData from "@/data/nearby-groomers.json";
import groomerCityPages from "@/data/groomer-city-pages.json";
import type { Metadata } from "next";

const ParkMap = dynamic(() => import("@/components/ParkMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 400 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });
const nearbyMap = nearbyData as Record<string, { slug: string; name: string; distance: number; city: string; stateAbbr: string }[]>;
interface CityPage { state: string; stateName: string; stateSlug: string; city: string; citySlug: string; count: number; lat: number; lng: number; }
const allCityPages = groomerCityPages as CityPage[];

export const dynamicParams = true;
export function generateStaticParams() { return []; }

function isStatePage(slug: string) { return !!slugToAbbr[slug]; }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (isStatePage(slug)) {
    const abbr = slugToAbbr[slug];
    const name = stateNames[abbr];
    const count = allGroomers.filter(g => g.stateAbbr === abbr).length;
    return {
      title: `Dog Groomers in ${name} | BarkSeeker`,
      description: `Browse ${count}+ dog groomers in ${name}. Compare ratings, read reviews, and find grooming services near you with phone numbers, addresses, and directions. Free.`,
      alternates: { canonical: `https://www.barkseeker.com/groomers/${slug}` },
    };
  }
  const groomer = getGroomerBySlug(slug);
  if (!groomer) return { title: "Groomer Not Found" };
  const sn = stateNames[groomer.stateAbbr] || groomer.state;
  return {
    title: `${groomer.name} — Dog Groomer in ${groomer.city}, ${sn} | BarkSeeker`,
    description: `${groomer.name} is a professional dog groomer in ${groomer.city}, ${sn}.${groomer.rating > 0 ? ` Rated ${groomer.rating.toFixed(1)} stars.` : ""} Phone, address, directions, and reviews. Find dog groomers near you on BarkSeeker.`,
    alternates: { canonical: `https://www.barkseeker.com/groomers/${slug}` },
  };
}

export default async function GroomerSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (isStatePage(slug)) return <StatePage stateSlug={slug} />;
  return <ListingPage slug={slug} />;
}

/* ── STATE PAGE ── */
function StatePage({ stateSlug }: { stateSlug: string }) {
  const abbr = slugToAbbr[stateSlug]!;
  const name = stateNames[abbr]!;
  const groomers = getGroomersByState(abbr).sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name));
  const cities = allCityPages.filter(c => c.state === abbr).sort((a, b) => b.count - a.count);
  const mapParks = groomers.filter(g => g.latitude && g.longitude).map(g => ({ id: g.slug, name: g.name, latitude: g.latitude, longitude: g.longitude, city: g.city }));
  const center: [number, number] = groomers.length > 0
    ? [groomers.reduce((s, g) => s + g.latitude, 0) / groomers.length, groomers.reduce((s, g) => s + g.longitude, 0) / groomers.length]
    : [39.8, -98.5];

  const faqs = [
    { q: `How many dog groomers are in ${name}?`, a: `BarkSeeker lists ${groomers.length} dog groomers across ${name} with ratings, contact info, and directions.` },
    { q: `How do I find a dog groomer near me in ${name}?`, a: `Browse our ${name} groomer directory below or use the city links to find groomers in your area.` },
    { q: `How much does dog grooming cost in ${name}?`, a: `Basic grooming in ${name} typically costs $30-90. Full-service grooming runs $60-150+ depending on breed size and coat type.` },
    { q: `How often should I groom my dog?`, a: `Most dogs need professional grooming every 4-8 weeks, depending on breed and coat type. Long-haired breeds may need more frequent visits.` },
    { q: `What should I look for in a dog groomer?`, a: `Look for certifications, clean facilities, positive reviews, and willingness to answer questions. Read our guide on finding a good groomer.` },
    { q: `Do you tip a dog groomer?`, a: `Yes, tipping 15-20% is standard for dog grooming. If your groomer did an exceptional job or handled a difficult dog, consider tipping more. For salon groomers, tip the individual groomer directly.` },
    { q: `What happens during a dog grooming appointment?`, a: `A typical grooming appointment includes a bath, blow dry, haircut or trim, nail clipping, ear cleaning, and sometimes anal gland expression. Full-service appointments take 1-3 hours depending on breed size and coat condition.` },
  ];

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.barkseeker.com" }, { "@type": "ListItem", position: 2, name: "Groomers", item: "https://www.barkseeker.com/groomers" }, { "@type": "ListItem", position: 3, name: name, item: `https://www.barkseeker.com/groomers/${stateSlug}` }] }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />

      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(45,106,79,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">{name} Dog Groomer Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Dog Groomers in {name}</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{groomers.length.toLocaleString()} groomers across {name}. Ratings, reviews, and contact info.</p>
      </section>

      <section className="max-w-4xl mx-auto px-4 pt-10 pb-2">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">Dog Groomers in {name}</h2>
          <p className="text-gray-600 leading-relaxed text-sm">Browse {groomers.length.toLocaleString()} dog groomers across {name} on BarkSeeker. Find professional grooming services near you with ratings, reviews, phone numbers, and directions. Whether your pup needs a simple bath or a full breed-specific cut, our directory helps you find the perfect groomer.</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
          <h3 className="font-[Cabin] font-bold text-forest mb-3">Tips for Choosing a Dog Groomer in {name}</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Ask about certifications &mdash; look for National Dog Groomers Association of America (NDGAA) or International Professional Groomers (IPG) certified groomers.</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Visit the facility before your appointment to check cleanliness and observe how they handle dogs.</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Read reviews and ask for referrals from other dog owners in your area.</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Communicate your dog&apos;s temperament and any sensitivities before the first visit.</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Read our <Link href="/blog/how-to-find-good-dog-groomer" className="text-forest hover:underline">complete guide to finding a good groomer</Link>.</li>
          </ul>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pt-8">
        <ParkMap parks={mapParks} center={center} zoom={7} height="350px" className="mb-4" />
      </div>

      {cities.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pt-8 pb-4">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Browse by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {cities.slice(0, 16).map(c => (
              <Link key={`${c.stateSlug}-${c.citySlug}`} href={`/groomers/cities/${c.stateSlug}-${c.citySlug}`} className="text-left bg-white border border-gray-200 rounded-lg p-3 hover:border-forest hover:shadow-sm transition">
                <p className="font-bold text-charcoal text-sm">{c.city}</p>
                <p className="text-gray-400 text-xs">{c.count} groomer{c.count !== 1 ? "s" : ""}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <AdSlot position="groomer-state-mid" />

      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">All Dog Groomers in {name} ({groomers.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {groomers.slice(0, 60).map(g => (
            <Link key={g.slug} href={`/groomers/${g.slug}`} className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <p className="font-bold text-charcoal group-hover:text-forest transition text-sm truncate">{g.name}</p>
              <p className="text-gray-500 text-xs mt-1">{g.city}{g.rating > 0 ? ` · ${"★".repeat(Math.round(g.rating))} ${g.rating.toFixed(1)}` : ""}</p>
              {g.phone && <p className="text-gray-400 text-xs mt-1">{g.phone}</p>}
            </Link>
          ))}
        </div>
        {groomers.length > 60 && <p className="text-gray-400 text-sm mt-4 text-center">Showing 60 of {groomers.length} groomers. Browse by city above for more.</p>}
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 mb-8">
          <Link href={`/vets/${stateSlug}`} className="bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-forest hover:shadow-sm transition text-sm"><span className="font-bold text-charcoal">Find Vets in {name}</span></Link>
          <Link href={`/${stateSlug}`} className="bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-forest hover:shadow-sm transition text-sm"><span className="font-bold text-charcoal">Dog Parks in {name}</span></Link>
        </div>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {faqs.map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-forest transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4"><FeaturedArticle listingSlug={stateSlug} /></div>
      <div className="max-w-4xl mx-auto px-4"><CletusAd /></div>
    </div>
  );
}

/* ── INDIVIDUAL LISTING PAGE ── */
function ListingPage({ slug }: { slug: string }) {
  const groomer = getGroomerBySlug(slug);
  if (!groomer) notFound();

  const sn = stateNames[groomer.stateAbbr] || groomer.state;
  const ss = stateSlugs[groomer.stateAbbr] || groomer.state.toLowerCase();
  const nearby = (nearbyMap[groomer.slug] || []).slice(0, 6);
  const mapParks = [{ id: groomer.slug, name: groomer.name, latitude: groomer.latitude, longitude: groomer.longitude, city: groomer.city }];

  const faqs = [
    { q: `Where is ${groomer.name} located?`, a: `${groomer.name} is located at ${groomer.address || `${groomer.city}, ${sn}`}.` },
    { q: `What is the rating for ${groomer.name}?`, a: groomer.rating > 0 ? `${groomer.name} has a ${groomer.rating.toFixed(1)}-star rating based on ${groomer.reviewCount} reviews.` : `${groomer.name} does not have ratings yet.` },
    { q: `How do I contact ${groomer.name}?`, a: `You can reach ${groomer.name}${groomer.phone ? ` by phone at ${groomer.phone}` : ""}${groomer.website ? ` or visit their website` : ""}.` },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "LocalBusiness", name: groomer.name, address: { "@type": "PostalAddress", streetAddress: groomer.address, addressLocality: groomer.city, addressRegion: sn }, geo: { "@type": "GeoCoordinates", latitude: groomer.latitude, longitude: groomer.longitude }, telephone: groomer.phone || undefined, url: groomer.website || undefined, aggregateRating: groomer.rating > 0 ? { "@type": "AggregateRating", ratingValue: groomer.rating, reviewCount: groomer.reviewCount } : undefined }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.barkseeker.com" }, { "@type": "ListItem", position: 2, name: "Groomers", item: "https://www.barkseeker.com/groomers" }, { "@type": "ListItem", position: 3, name: sn, item: `https://www.barkseeker.com/groomers/${ss}` }, { "@type": "ListItem", position: 4, name: groomer.name, item: `https://www.barkseeker.com/groomers/${slug}` }] }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-forest transition">Home</Link><span>/</span>
        <Link href="/groomers" className="hover:text-forest transition">Groomers</Link><span>/</span>
        <Link href={`/groomers/${ss}`} className="hover:text-forest transition">{sn}</Link><span>/</span>
        <span className="text-charcoal font-medium">{groomer.name}</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-2">{groomer.name}</h1>
      <p className="text-gray-500 mb-1">{groomer.city}, {sn}</p>
      {groomer.rating > 0 && <p className="text-bark font-semibold text-sm mb-6">{"★".repeat(Math.round(groomer.rating))}{"☆".repeat(5 - Math.round(groomer.rating))} {groomer.rating.toFixed(1)} ({groomer.reviewCount} reviews)</p>}

      <ParkMap parks={mapParks} center={[groomer.latitude, groomer.longitude]} zoom={15} height="400px" className="mb-8" />

      <div className="flex flex-wrap gap-3 mb-8">
        <a href={`https://www.google.com/maps/dir/?api=1&destination=${groomer.latitude},${groomer.longitude}`} target="_blank" rel="noopener noreferrer" className="bg-bark hover:bg-bark-dark text-white font-bold px-6 py-3 rounded-lg transition shadow-sm text-sm">Get Directions</a>
        {groomer.phone && <a href={`tel:${groomer.phone}`} className="bg-forest hover:bg-forest-light text-white font-bold px-6 py-3 rounded-lg transition shadow-sm text-sm">Call {groomer.phone}</a>}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">About {groomer.name}</h2>
        <p className="text-gray-600 leading-relaxed text-sm">{groomer.name} is a professional dog grooming service in {groomer.city}, {sn}.{groomer.rating > 0 ? ` Rated ${groomer.rating.toFixed(1)} stars from ${groomer.reviewCount} reviews.` : ""}</p>
      </div>

      {(groomer.address || groomer.phone || groomer.website) && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">Contact</h2>
          <div className="space-y-3 text-sm">
            {groomer.address && <div className="flex items-start gap-3"><span className="text-forest">&#128205;</span><a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(groomer.address)}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-forest transition">{groomer.address}</a></div>}
            {groomer.phone && <div className="flex items-start gap-3"><span className="text-forest">&#128222;</span><a href={`tel:${groomer.phone}`} className="text-gray-600 hover:text-forest transition">{groomer.phone}</a></div>}
            {groomer.website && <div className="flex items-start gap-3"><span className="text-forest">&#127760;</span><a href={groomer.website} target="_blank" rel="noopener noreferrer" className="text-forest hover:underline truncate max-w-xs">{groomer.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}</a></div>}
          </div>
        </div>
      )}

      <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
        <h3 className="font-[Cabin] font-bold text-forest mb-3">Tips for Your Grooming Appointment</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Brush your dog before the appointment to remove loose fur and tangles.</li>
          <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Let the groomer know about any skin conditions or sensitivities.</li>
          <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Bring reference photos if you have a specific style in mind.</li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Frequently Asked Questions</h3>
        <div className="space-y-2">
          {faqs.map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-forest transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </div>

      {nearby.length > 0 && (
        <div className="mb-6">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Nearby Dog Groomers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {nearby.map(n => (
              <Link key={n.slug} href={`/groomers/${n.slug}`} className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition border-l-4 border-l-bark">
                <p className="font-bold text-charcoal group-hover:text-forest transition text-sm">{n.name}</p>
                <p className="text-gray-500 text-xs">{n.city}, {n.stateAbbr} &middot; {n.distance} mi</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <h3 className="font-[Cabin] font-bold text-charcoal mb-3">People Also Search For</h3>
        <div className="flex flex-wrap gap-2">
          {groomer.city && <Link href={`/cities/${ss}-${slugify(groomer.city)}`} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-forest hover:border-forest transition">Dog Parks in {groomer.city}</Link>}
          {groomer.city && <Link href={`/vets/cities/${ss}-${slugify(groomer.city)}`} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-forest hover:border-forest transition">Vets in {groomer.city}</Link>}
          <Link href={`/groomers/${ss}`} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-forest hover:border-forest transition">Dog Groomers in {sn}</Link>
        </div>
      </div>

      <section className="bg-cream border border-forest/30 rounded-2xl p-6 mb-8">
        <h3 className="font-[Cabin] text-lg font-bold text-charcoal mb-2">Own this business?</h3>
        <p className="text-gray-600 text-sm mb-4 max-w-lg">Claim your free listing to add hours, photos, and contact info. Respond to customers and keep your details up to date.</p>
        <a href={`mailto:hello@barkseeker.com?subject=${encodeURIComponent(`Claim Listing: ${groomer.name}`)}&body=${encodeURIComponent(`I'd like to claim the listing for ${groomer.name} at ${groomer.address || `${groomer.city}, ${sn}`}.\n\nListing URL: https://www.barkseeker.com/groomers/${slug}\n\nPlease contact me to verify ownership.`)}`} className="inline-block bg-forest hover:bg-forest-light text-white font-bold px-6 py-3 rounded-lg transition shadow-sm text-sm">Claim This Listing &mdash; It&apos;s Free</a>
      </section>

      <FeaturedArticle listingSlug={groomer.slug} />

      <div className="my-8 rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #C4704B 0%, #D4885B 60%, #5B7B5E 100%)" }}>
        <div className="px-6 py-8 md:py-10">
          <h3 className="font-[Cabin] text-xl md:text-2xl font-bold text-white mb-2">Groom Your Dog at Home with BabyMyDog</h3>
          <p className="text-white/80 text-sm mb-6 max-w-md">Premium dog grooming products — shampoos, brushes, nail clippers, and everything your pup needs between professional sessions.</p>
          <a href="https://babymydog.com" target="_blank" rel="noopener noreferrer" className="inline-block bg-bark hover:bg-bark/90 text-white font-bold text-sm px-6 py-2.5 rounded-lg hover:shadow-lg transition">Shop BabyMyDog &rarr;</a>
        </div>
      </div>

      <CletusAd />
    </div>
  );
}
