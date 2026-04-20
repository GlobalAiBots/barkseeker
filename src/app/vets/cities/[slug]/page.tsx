import Link from "next/link";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getVetsByCity, slugToAbbr } from "@/data/all-vets";
import FeaturedArticle from "@/components/FeaturedArticle";
import AdSlot from "@/components/AdSlot";
import CletusAd from "@/components/CletusAd";
import vetCityPagesData from "@/data/vet-city-pages.json";
import type { Metadata } from "next";

interface VetCityPage { state: string; stateName: string; stateSlug: string; city: string; citySlug: string; count: number; lat: number; lng: number; }
const allCityPages = vetCityPagesData as VetCityPage[];

const ParkMap = dynamic(() => import("@/components/ParkMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 350 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });

export const dynamicParams = true;
export function generateStaticParams() { return []; }

function parseCitySlug(slug: string): VetCityPage | undefined {
  return allCityPages.find((c) => `${c.stateSlug}-${c.citySlug}` === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cityInfo = parseCitySlug(slug);
  if (!cityInfo) return { title: "City Not Found | BarkSeeker" };
  const abbr = slugToAbbr[cityInfo.stateSlug];
  const vets = abbr ? getVetsByCity(cityInfo.city, abbr) : [];
  return {
    title: `Best Veterinarians in ${cityInfo.city}, ${cityInfo.stateName} — Ratings & Reviews (2026)`,
    description: `Find ${vets.length} top-rated veterinarians in ${cityInfo.city}, ${cityInfo.stateName}. Compare ratings, read reviews, and get directions on BarkSeeker. Updated 2026.`,
    openGraph: { title: `Best Veterinarians in ${cityInfo.city}, ${cityInfo.stateName} (2026) | BarkSeeker`, url: `https://www.barkseeker.com/vets/cities/${slug}` },
    alternates: { canonical: `https://www.barkseeker.com/vets/cities/${slug}` },
  };
}

export default async function VetCityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cityInfo = parseCitySlug(slug);
  if (!cityInfo) notFound();

  const abbr = slugToAbbr[cityInfo.stateSlug];
  if (!abbr) notFound();

  const vets = getVetsByCity(cityInfo.city, abbr).sort((a, b) => b.rating - a.rating);
  const stName = cityInfo.stateName;
  const stSlug = cityInfo.stateSlug;
  const mapParks = vets.slice(0, 100).map((v) => ({ id: v.id, name: v.name, latitude: v.latitude, longitude: v.longitude, city: v.city }));
  const center: [number, number] = vets.length ? [vets.reduce((s, v) => s + v.latitude, 0) / vets.length, vets.reduce((s, v) => s + v.longitude, 0) / vets.length] : [cityInfo.lat, cityInfo.lng];

  // Nearby cities
  const nearbyCities = allCityPages
    .filter((c) => c !== cityInfo && c.stateSlug === stSlug && c.count >= 1)
    .map((c) => ({ ...c, dist: Math.sqrt(Math.pow(c.lat - cityInfo.lat, 2) + Math.pow(c.lng - cityInfo.lng, 2)) }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 6);

  const tips = [
    "Look for vets with experience treating your pet's breed or specific health needs.",
    "Check online reviews and ask neighbors for personal recommendations.",
    "Schedule a consultation visit before committing to a new vet.",
  ];

  const faqItems = [
    { q: `How many vets are in ${cityInfo.city}, ${stName}?`, a: `There are ${vets.length} veterinarians in ${cityInfo.city}, ${stName} listed on BarkSeeker with ratings and contact information.` },
    { q: `What is the best rated vet in ${cityInfo.city}?`, a: vets.length > 0 && vets[0].rating > 0 ? `${vets[0].name} is the highest-rated vet in ${cityInfo.city} with a ${vets[0].rating.toFixed(1)}-star rating${vets[0].reviewCount ? ` across ${vets[0].reviewCount} reviews` : ""}. Browse all ${cityInfo.city} vets sorted by rating above.` : `Vets in ${cityInfo.city} are sorted by rating above. Check the top entries in the list for the highest-rated clinics.` },
    { q: `How do I choose a vet in ${cityInfo.city}?`, a: `Compare vet ratings on BarkSeeker, read recent reviews, and consider factors like location (you want one close to home for emergencies), services offered, and after-hours availability.` },
    { q: `What is the average cost of a vet visit in ${cityInfo.city}?`, a: `A routine wellness exam in ${cityInfo.city} typically costs $55-$200 depending on the clinic. Urgent care starts at $125-$250, and emergency visits at 24-hour hospitals run $200-$400+ for the exam alone, before diagnostics.` },
    { q: `Which ${cityInfo.city} vets handle emergencies?`, a: `Most general-practice vets handle urgent cases during office hours but refer to dedicated 24-hour emergency animal hospitals after hours. Save your nearest emergency vet's phone number before you need it.` },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Schema: BreadcrumbList */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.barkseeker.com" },
          { "@type": "ListItem", position: 2, name: "Vets", item: "https://www.barkseeker.com/vets" },
          { "@type": "ListItem", position: 3, name: stName, item: `https://www.barkseeker.com/vets/${stSlug}` },
          { "@type": "ListItem", position: 4, name: cityInfo.city, item: `https://www.barkseeker.com/vets/cities/${slug}` },
        ],
      }) }} />
      {/* Schema: FAQPage */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqItems.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-[#2D6A4F] transition">Home</Link><span>/</span>
        <Link href="/vets" className="hover:text-[#2D6A4F] transition">Vets</Link><span>/</span>
        <Link href={`/vets/${stSlug}`} className="hover:text-[#2D6A4F] transition">{stName}</Link><span>/</span>
        <span className="text-[#2B2B2B] font-medium">{cityInfo.city}</span>
      </nav>

      {/* Hero */}
      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-[#2B2B2B] mb-2">Veterinarians in {cityInfo.city}, {stName}</h1>
      <p className="text-gray-500 mb-6">{vets.length} veterinarian{vets.length !== 1 ? "s" : ""} in {cityInfo.city}, {stName}. Sorted by rating.</p>

      {/* Tips */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8">
        <h3 className="font-[Cabin] font-bold text-[#2D6A4F] mb-3">Tips for Finding a Vet in {cityInfo.city}</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          {tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2"><span className="text-[#2D6A4F] mt-0.5">&#10003;</span> {tip}</li>
          ))}
        </ul>
      </div>

      {/* Map */}
      {mapParks.length > 0 && <ParkMap parks={mapParks} center={center} zoom={12} height="350px" className="mb-8" />}

      <AdSlot position="vet-city-top" />

      {/* Vet Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
        {vets.map((v) => (
          <Link key={v.id} href={`/vets/${v.slug}`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <h3 className="font-[Cabin] font-bold text-[#2B2B2B] group-hover:text-[#2D6A4F] transition text-sm">{v.name}</h3>
            <p className="text-gray-500 text-xs mt-1">{v.city}, {stName}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[#E8913A] text-sm font-bold">{v.rating > 0 ? `${v.rating.toFixed(1)} ★` : "No rating"}</span>
              {v.phone && <span className="text-gray-400 text-xs">{v.phone}</span>}
            </div>
          </Link>
        ))}
      </div>

      {/* About */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
        <h2 className="font-[Cabin] text-xl font-bold text-[#2B2B2B] mb-3">Veterinarians in {cityInfo.city}, {stName}</h2>
        <p className="text-gray-600 leading-relaxed text-sm">
          {cityInfo.city}, {stName} has {vets.length} veterinarian{vets.length !== 1 ? "s" : ""} listed on BarkSeeker. Compare clinics by rating, get contact info, and find the best vet for your pet. Whether you need a routine checkup, vaccinations, or emergency care, BarkSeeker helps you find trusted vets nearby.
        </p>
      </div>

      {/* FAQ */}
      <div className="mb-8">
        <h2 className="font-[Cabin] text-xl font-bold text-[#2B2B2B] mb-4">Frequently Asked Questions</h2>
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

      {/* Pet Insurance CTA */}
      <div className="bg-[#2D6A4F] rounded-2xl p-6 md:p-8 mb-8 text-white">
        <h2 className="font-[Cabin] text-2xl font-bold mb-2">Save on Vet Bills with Pet Insurance</h2>
        <p className="text-white/80 text-sm mb-4 max-w-lg">Pet insurance can help cover routine and emergency vet care in {cityInfo.city}. Compare plans to find the best coverage for your pet.</p>
        <Link href="/pet-insurance" className="inline-block bg-[#E8913A] hover:bg-[#d07e2e] text-white font-bold text-sm px-6 py-3 rounded-lg transition shadow-sm">
          Compare Pet Insurance Plans &rarr;
        </Link>
      </div>

      <FeaturedArticle listingSlug={`vet-city-${slug}`} />

      {/* Cross-links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Link href={`/groomers/cities/${slug}`} className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
          <h3 className="font-[Cabin] font-bold text-[#2B2B2B] group-hover:text-[#2D6A4F] transition mb-1">Groomers in {cityInfo.city}</h3>
          <p className="text-gray-500 text-sm">Find dog groomers in {cityInfo.city}, {stName}.</p>
        </Link>
        <Link href={`/${stSlug}`} className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
          <h3 className="font-[Cabin] font-bold text-[#2B2B2B] group-hover:text-[#2D6A4F] transition mb-1">Dog Parks in {stName}</h3>
          <p className="text-gray-500 text-sm">Discover off-leash dog parks across {stName}.</p>
        </Link>
      </div>

      <CletusAd />

      {/* Nearby Cities */}
      {nearbyCities.length > 0 && (
        <section className="mt-8">
          <h2 className="font-[Cabin] text-xl font-bold text-[#2B2B2B] mb-4">Nearby Cities with Vets</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {nearbyCities.map((c) => (
              <Link key={`${c.stateSlug}-${c.citySlug}`} href={`/vets/cities/${c.stateSlug}-${c.citySlug}`} className="bg-white border border-gray-200 rounded-lg p-3 hover:border-[#2D6A4F] transition">
                <p className="font-bold text-[#2B2B2B] text-sm">{c.city}</p>
                <p className="text-gray-400 text-xs">{c.count} vet{c.count !== 1 ? "s" : ""}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Back to state */}
      <div className="text-center py-6">
        <Link href={`/vets/${stSlug}`} className="text-[#2D6A4F] hover:underline font-semibold text-sm">Browse all {stName} vets &rarr;</Link>
      </div>
    </div>
  );
}
