import Link from "next/link";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { allVets, getVetBySlug, getVetsByState, stateNames, stateSlugs, slugToAbbr, slugify } from "@/data/all-vets";
import CletusAd from "@/components/CletusAd";
import FeaturedArticle from "@/components/FeaturedArticle";
import AdSlot from "@/components/AdSlot";
import nearbyVetsData from "@/data/nearby-vets.json";
import type { Metadata } from "next";

const ParkMap = dynamic(() => import("@/components/ParkMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 400 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });
interface NearbyVet { slug: string; name: string; distance: number; city: string; stateAbbr: string; }
const nearbyMap = nearbyVetsData as Record<string, NearbyVet[]>;

export const dynamicParams = true;
export function generateStaticParams() { return []; }

function isStatePage(slug: string) { return !!slugToAbbr[slug]; }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (isStatePage(slug)) {
    const abbr = slugToAbbr[slug];
    const name = stateNames[abbr];
    const count = allVets.filter(v => v.stateAbbr === abbr).length;
    return {
      title: `Veterinarians in ${name} | BarkSeeker`,
      description: `Browse ${count}+ veterinarians in ${name}. Compare ratings, read reviews, and find vets near you with phone numbers, addresses, and directions. Free.`,
      alternates: { canonical: `https://www.barkseeker.com/vets/${slug}` },
    };
  }
  const vet = getVetBySlug(slug);
  if (!vet) return { title: "Vet Not Found" };
  const sn = stateNames[vet.stateAbbr] || vet.stateAbbr;
  return {
    title: `${vet.name} — Veterinarian in ${vet.city}, ${sn} | BarkSeeker`,
    description: `${vet.name} is a veterinarian in ${vet.city}, ${sn}.${vet.rating > 0 ? ` Rated ${vet.rating.toFixed(1)} stars.` : ""} Phone, address, directions, and reviews. Find vets near you on BarkSeeker.`,
    alternates: { canonical: `https://www.barkseeker.com/vets/${slug}` },
  };
}

export default async function VetSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (isStatePage(slug)) return <StatePage stateSlug={slug} />;
  return <ListingPage slug={slug} />;
}

/* ── STATE PAGE ── */
function StatePage({ stateSlug }: { stateSlug: string }) {
  const abbr = slugToAbbr[stateSlug]!;
  const name = stateNames[abbr]!;
  const vets = getVetsByState(abbr).sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name));
  // Derive city tiles directly from vets so sparse states (e.g. Wyoming with 20
  // vets across 1 pre-aggregated city) show every city, not just the few that
  // happen to have dedicated entries in vet-city-pages.json.
  const citiesAgg: Record<string, { city: string; citySlug: string; count: number }> = {};
  for (const v of vets) {
    const rawCity = v.city?.trim();
    if (!rawCity) continue;
    const citySlug = slugify(rawCity);
    if (!citySlug) continue;
    if (!citiesAgg[citySlug]) citiesAgg[citySlug] = { city: rawCity, citySlug, count: 0 };
    citiesAgg[citySlug].count++;
  }
  const cities = Object.values(citiesAgg).sort((a, b) => b.count - a.count);
  const mapParks = vets.filter(v => v.latitude && v.longitude).map(v => ({ id: v.slug, name: v.name, latitude: v.latitude, longitude: v.longitude, city: v.city }));
  const center: [number, number] = vets.length > 0
    ? [vets.reduce((s, v) => s + v.latitude, 0) / vets.length, vets.reduce((s, v) => s + v.longitude, 0) / vets.length]
    : [39.8, -98.5];

  const faqs = [
    { q: `How many veterinarians are in ${name}?`, a: `BarkSeeker lists ${vets.length} veterinarians across ${name} with ratings, contact info, and directions.` },
    { q: `How do I find a vet near me in ${name}?`, a: `Browse our ${name} vet directory below or use the city links to find vets in your area.` },
    { q: `How much does a vet visit cost in ${name}?`, a: `Routine vet visits in ${name} typically cost $50-250. Emergency visits can range from $500-5,000+.` },
    { q: `How often should I take my dog to the vet?`, a: `Adult dogs should visit the vet at least once a year for a wellness exam. Puppies and senior dogs may need more frequent visits.` },
    { q: `Does pet insurance work with any vet in ${name}?`, a: `Yes, most pet insurance plans let you visit any licensed veterinarian. You pay the vet and submit a claim for reimbursement.` },
    { q: `When should I take my dog to the vet?`, a: `Take your dog to the vet immediately if you notice vomiting, lethargy, difficulty breathing, seizures, or bleeding. For non-emergencies like limping or appetite changes, schedule a visit within a few days.` },
    { q: `Do I need pet insurance?`, a: `Pet insurance is worth considering, especially for puppies and breeds prone to health issues. A single emergency can cost $3,000-$10,000+. Insurance typically covers 70-90% after deductible. Enroll early before pre-existing conditions develop.` },
    { q: `What vaccines does my dog need?`, a: `Core vaccines include rabies, distemper, parvovirus, and adenovirus. Non-core vaccines like Bordetella, Lyme, and canine influenza depend on your dog's lifestyle and location. Your vet will recommend a schedule.` },
  ];

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.barkseeker.com" }, { "@type": "ListItem", position: 2, name: "Vets", item: "https://www.barkseeker.com/vets" }, { "@type": "ListItem", position: 3, name: name, item: `https://www.barkseeker.com/vets/${stateSlug}` }] }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />

      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(45,106,79,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">{name} Veterinarian Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Veterinarians in {name}</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{vets.length.toLocaleString()} vets across {name}. Ratings, reviews, and contact info.</p>
      </section>

      <section className="max-w-4xl mx-auto px-4 pt-10 pb-2">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">Veterinarians in {name}</h2>
          <p className="text-gray-600 leading-relaxed text-sm">Browse {vets.length.toLocaleString()} veterinarians across {name} on BarkSeeker. Find trusted vets near you with ratings, reviews, phone numbers, and directions. From routine checkups to emergency care, our directory helps you find the right vet for your pet.</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
          <h3 className="font-[Cabin] font-bold text-forest mb-3">Tips for Choosing a Vet in {name}</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Look for AAHA-accredited clinics &mdash; the gold standard for veterinary practice.</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Ask about emergency protocols &mdash; does the clinic handle after-hours emergencies or refer to an ER?</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Schedule a meet-and-greet visit before committing to a new vet.</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Check if they accept your pet insurance or offer payment plans.</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Read our <Link href="/blog/how-to-find-good-veterinarian" className="text-forest hover:underline">complete guide to finding a good vet</Link>.</li>
          </ul>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pt-8"><ParkMap parks={mapParks} center={center} zoom={7} height="350px" className="mb-4" /></div>

      {cities.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pt-8 pb-4">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Browse by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {cities.slice(0, 16).map(c => (
              <Link key={`${stateSlug}-${c.citySlug}`} href={`/vets/cities/${stateSlug}-${c.citySlug}`} className="text-left bg-white border border-gray-200 rounded-lg p-3 hover:border-forest hover:shadow-sm transition">
                <p className="font-bold text-charcoal text-sm">{c.city}</p>
                <p className="text-gray-400 text-xs">{c.count} vet{c.count !== 1 ? "s" : ""}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <AdSlot position="vet-state-mid" />

      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">All Veterinarians in {name} ({vets.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {vets.slice(0, 60).map(v => (
            <Link key={v.slug} href={`/vets/${v.slug}`} className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <p className="font-bold text-charcoal group-hover:text-forest transition text-sm truncate">{v.name}</p>
              <p className="text-gray-500 text-xs mt-1">{v.city}{v.rating > 0 ? ` · ${"★".repeat(Math.round(v.rating))} ${v.rating.toFixed(1)}` : ""}</p>
              {v.phone && <p className="text-gray-400 text-xs mt-1">{v.phone}</p>}
            </Link>
          ))}
        </div>
        {vets.length > 60 && <p className="text-gray-400 text-sm mt-4 text-center">Showing 60 of {vets.length} vets. Browse by city above for more.</p>}
      </section>

      <section className="max-w-4xl mx-auto px-4 py-4">
        <div className="bg-cream border-2 border-bark rounded-2xl p-6 mb-8 text-center">
          <h3 className="font-[Cabin] text-xl font-bold text-charcoal mb-2">Save on Vet Bills with Pet Insurance</h3>
          <p className="text-gray-500 text-sm mb-4">Compare top pet insurance plans and find the right coverage for your dog.</p>
          <Link href="/pet-insurance" className="inline-block bg-bark hover:bg-bark-dark text-white font-bold text-sm px-6 py-3 rounded-lg transition">Compare Plans &rarr;</Link>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <Link href={`/groomers/${stateSlug}`} className="bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-forest hover:shadow-sm transition text-sm"><span className="font-bold text-charcoal">Find Groomers in {name}</span></Link>
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
  const vet = getVetBySlug(slug);
  if (!vet) notFound();

  const sn = stateNames[vet.stateAbbr] || vet.stateAbbr;
  const ss = stateSlugs[vet.stateAbbr] || vet.stateAbbr.toLowerCase();
  const nearby = (nearbyMap[vet.slug] || []).slice(0, 6);
  const mapParks = [{ id: vet.id, name: vet.name, latitude: vet.latitude, longitude: vet.longitude, city: vet.city }];

  const faqs = [
    { q: `Where is ${vet.name} located?`, a: `${vet.name} is located at ${vet.address || `${vet.city}, ${sn}`}.` },
    { q: `What is ${vet.name}'s rating?`, a: vet.rating > 0 ? `${vet.name} has a ${vet.rating.toFixed(1)}-star rating from ${vet.reviewCount} reviews.` : `${vet.name} does not have ratings yet.` },
    { q: `How do I contact ${vet.name}?`, a: `Reach ${vet.name}${vet.phone ? ` by phone at ${vet.phone}` : ""}${vet.website ? ` or visit their website` : ""}.` },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "LocalBusiness", name: vet.name, address: { "@type": "PostalAddress", streetAddress: vet.address, addressLocality: vet.city, addressRegion: sn }, geo: { "@type": "GeoCoordinates", latitude: vet.latitude, longitude: vet.longitude }, telephone: vet.phone || undefined, url: vet.website || undefined, aggregateRating: vet.rating > 0 ? { "@type": "AggregateRating", ratingValue: vet.rating, reviewCount: vet.reviewCount } : undefined }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.barkseeker.com" }, { "@type": "ListItem", position: 2, name: "Vets", item: "https://www.barkseeker.com/vets" }, { "@type": "ListItem", position: 3, name: sn, item: `https://www.barkseeker.com/vets/${ss}` }, { "@type": "ListItem", position: 4, name: vet.name, item: `https://www.barkseeker.com/vets/${slug}` }] }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-forest transition">Home</Link><span>/</span>
        <Link href="/vets" className="hover:text-forest transition">Vets</Link><span>/</span>
        <Link href={`/vets/${ss}`} className="hover:text-forest transition">{sn}</Link><span>/</span>
        <span className="text-charcoal font-medium">{vet.name}</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-2">{vet.name}</h1>
      <p className="text-gray-500 mb-1">{vet.city}, {sn}</p>
      {vet.rating > 0 && <p className="text-bark font-semibold text-sm mb-6">{"★".repeat(Math.round(vet.rating))}{"☆".repeat(5 - Math.round(vet.rating))} {vet.rating.toFixed(1)} ({vet.reviewCount} reviews)</p>}

      <ParkMap parks={mapParks} center={[vet.latitude, vet.longitude]} zoom={15} height="400px" className="mb-8" />

      <div className="flex flex-wrap gap-3 mb-8">
        <a href={`https://www.google.com/maps/dir/?api=1&destination=${vet.latitude},${vet.longitude}`} target="_blank" rel="noopener noreferrer" className="bg-bark hover:bg-bark-dark text-white font-bold px-6 py-3 rounded-lg transition shadow-sm text-sm">Get Directions</a>
        {vet.phone && <a href={`tel:${vet.phone}`} className="bg-forest hover:bg-forest-light text-white font-bold px-6 py-3 rounded-lg transition shadow-sm text-sm">Call {vet.phone}</a>}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">About {vet.name}</h2>
        <p className="text-gray-600 leading-relaxed text-sm">{vet.name} is a veterinary clinic in {vet.city}, {sn}.{vet.rating > 0 ? ` Rated ${vet.rating.toFixed(1)} stars from ${vet.reviewCount} reviews.` : ""}</p>
      </div>

      {(vet.address || vet.phone || vet.website) && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">Contact</h2>
          <div className="space-y-3 text-sm">
            {vet.address && <div className="flex items-start gap-3"><span className="text-forest">&#128205;</span><a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(vet.address)}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-forest transition">{vet.address}</a></div>}
            {vet.phone && <div className="flex items-start gap-3"><span className="text-forest">&#128222;</span><a href={`tel:${vet.phone}`} className="text-gray-600 hover:text-forest transition">{vet.phone}</a></div>}
            {vet.website && <div className="flex items-start gap-3"><span className="text-forest">&#127760;</span><a href={vet.website} target="_blank" rel="noopener noreferrer" className="text-forest hover:underline truncate max-w-xs">{vet.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}</a></div>}
          </div>
        </div>
      )}

      <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
        <h3 className="font-[Cabin] font-bold text-forest mb-3">Tips for Your Vet Visit</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Call ahead to confirm hours and whether they&apos;re accepting new patients.</li>
          <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Bring vaccination records and any previous medical history.</li>
          <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Ask about payment plans or pet insurance acceptance.</li>
        </ul>
      </div>

      <div className="mb-8 bg-cream border border-gray-200 rounded-xl p-5">
        <p className="font-[Cabin] font-bold text-charcoal text-sm mb-3">Pet wellness essentials:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { name: "Pet First Aid Kit", hook: "For cuts, hot spots, and road trips", q: "pet first aid kit dog" },
            { name: "Pill Pockets", hook: "Easiest way to give medication", q: "greenies pill pockets dog" },
            { name: "Dental Chews", hook: "Vet-recommended between cleanings", q: "vohc dental chews dog" },
          ].map((p) => (
            <a key={p.name} href={`https://www.amazon.com/s?k=${encodeURIComponent(p.q)}&tag=babymydog03-20`} target="_blank" rel="noopener noreferrer nofollow sponsored" className="block bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-forest hover:shadow-sm transition">
              <p className="font-bold text-charcoal text-sm">{p.name}</p>
              <p className="text-gray-500 text-xs mt-0.5">{p.hook}</p>
              <p className="text-forest text-xs font-semibold mt-1">&#9733; Our Pick &mdash; Shop on Amazon</p>
            </a>
          ))}
        </div>
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
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Nearby Veterinarians</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {nearby.map(n => (
              <Link key={n.slug} href={`/vets/${n.slug}`} className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition border-l-4 border-l-forest">
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
          {vet.city && <Link href={`/cities/${ss}-${slugify(vet.city)}`} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-forest hover:border-forest transition">Dog Parks in {vet.city}</Link>}
          {vet.city && <Link href={`/groomers/cities/${ss}-${slugify(vet.city)}`} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-forest hover:border-forest transition">Groomers in {vet.city}</Link>}
          <Link href={`/vets/${ss}`} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-forest hover:border-forest transition">Vets in {sn}</Link>
          <Link href="/pet-insurance" className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-500 hover:text-forest hover:border-forest transition">Pet Insurance Plans</Link>
        </div>
      </div>

      <section className="bg-cream border border-forest/30 rounded-2xl p-6 mb-8">
        <h3 className="font-[Cabin] text-lg font-bold text-charcoal mb-2">Own this clinic?</h3>
        <p className="text-gray-600 text-sm mb-4 max-w-lg">Claim your free listing to add hours, photos, and contact info. Respond to pet owners and keep your details up to date.</p>
        <a href={`mailto:hello@barkseeker.com?subject=${encodeURIComponent(`Claim Listing: ${vet.name}`)}&body=${encodeURIComponent(`I'd like to claim the listing for ${vet.name} at ${vet.address || `${vet.city}, ${sn}`}.\n\nListing URL: https://www.barkseeker.com/vets/${slug}\n\nPlease contact me to verify ownership.`)}`} className="inline-block bg-forest hover:bg-forest-light text-white font-bold px-6 py-3 rounded-lg transition shadow-sm text-sm">Claim This Listing &mdash; It&apos;s Free</a>
      </section>

      <div className="bg-cream border-2 border-bark rounded-2xl p-6 mb-8">
        <h3 className="font-[Cabin] text-xl font-bold text-charcoal mb-2">Could Pet Insurance Save You Money?</h3>
        <p className="text-gray-600 text-sm mb-4 max-w-lg">Unexpected vet bills add up fast. Pet insurance covers emergencies, surgeries, and medications.</p>
        <Link href="/pet-insurance" className="inline-block bg-bark hover:bg-bark-dark text-white font-bold text-sm px-6 py-3 rounded-lg transition">Compare Plans &rarr;</Link>
      </div>

      <FeaturedArticle listingSlug={vet.slug} />
      <CletusAd />
    </div>
  );
}
