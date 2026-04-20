import Link from "next/link";
import dynamic from "next/dynamic";
import { getGroomersByCity } from "@/data/all-groomers";
import FeaturedArticle from "@/components/FeaturedArticle";
import groomerCityPages from "@/data/groomer-city-pages.json";
import type { Metadata } from "next";

const ParkMap = dynamic(() => import("@/components/ParkMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 350 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });

interface CityPage { state: string; stateName: string; stateSlug: string; city: string; citySlug: string; count: number; lat: number; lng: number; }
const allCityPages = groomerCityPages as CityPage[];

export const dynamicParams = true;
export function generateStaticParams() { return []; }

function parseCitySlug(slug: string): CityPage | undefined {
  return allCityPages.find((c) => `${c.stateSlug}-${c.citySlug}` === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cityInfo = parseCitySlug(slug);
  if (!cityInfo) return { title: "City Not Found" };
  return {
    title: `Dog Groomers in ${cityInfo.city}, ${cityInfo.stateName} (${cityInfo.count} Listed) | BarkSeeker`,
    description: `Find the best dog groomers in ${cityInfo.city}, ${cityInfo.stateName}. Browse ${cityInfo.count} groomers with ratings, reviews, phone numbers, and directions.`,
    openGraph: { title: `Dog Groomers in ${cityInfo.city}, ${cityInfo.stateName} | BarkSeeker`, url: `https://www.barkseeker.com/groomers/cities/${slug}` },
    alternates: { canonical: `https://www.barkseeker.com/groomers/cities/${slug}` },
  };
}

export default async function GroomerCityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cityInfo = parseCitySlug(slug);

  if (!cityInfo) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="font-[Cabin] text-3xl font-bold text-charcoal mb-4">City Not Found</h1>
        <Link href="/groomers" className="text-forest hover:underline">Browse all groomers</Link>
      </div>
    );
  }

  const groomers = getGroomersByCity(cityInfo.city, cityInfo.state).sort((a, b) => b.rating - a.rating);
  const mapParks = groomers.map((g) => ({ id: g.slug, name: g.name, latitude: g.latitude, longitude: g.longitude, city: g.city }));
  const center: [number, number] = groomers.length ? [groomers.reduce((s, g) => s + g.latitude, 0) / groomers.length, groomers.reduce((s, g) => s + g.longitude, 0) / groomers.length] : [cityInfo.lat, cityInfo.lng];

  const faqItems = [
    { q: `How many dog groomers are in ${cityInfo.city}, ${cityInfo.stateName}?`, a: `There are ${groomers.length} dog groomers in ${cityInfo.city}, ${cityInfo.stateName} listed on BarkSeeker. Browse all listings with ratings and contact info.` },
    { q: `How do I find the best dog groomer in ${cityInfo.city}?`, a: `BarkSeeker ranks dog groomers in ${cityInfo.city} by customer rating. Check reviews, compare services, and find the best fit for your dog.` },
    { q: `How much does dog grooming cost in ${cityInfo.city}, ${cityInfo.stateName}?`, a: `Dog grooming in ${cityInfo.city} typically costs $30-$90 depending on your dog's size, breed, and the services requested. Contact individual groomers for exact pricing.` },
  ];

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqItems.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.barkseeker.com" }, { "@type": "ListItem", position: 2, name: "Groomers", item: "https://www.barkseeker.com/groomers" }, { "@type": "ListItem", position: 3, name: cityInfo.stateName, item: `https://www.barkseeker.com/groomers/${cityInfo.stateSlug}` }, { "@type": "ListItem", position: 4, name: cityInfo.city, item: `https://www.barkseeker.com/groomers/cities/${slug}` }] }) }} />

      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(45,106,79,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">{cityInfo.city} Dog Groomer Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Dog Groomers in {cityInfo.city}, {cityInfo.stateName}</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{groomers.length} dog groomer{groomers.length !== 1 ? "s" : ""} in {cityInfo.city}, {cityInfo.stateName}. Ratings, reviews, and contact info for every listing.</p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
          <Link href="/" className="hover:text-forest transition">Home</Link><span>/</span>
          <Link href="/groomers" className="hover:text-forest transition">Groomers</Link><span>/</span>
          <Link href={`/groomers/${cityInfo.stateSlug}`} className="hover:text-forest transition">{cityInfo.stateName}</Link><span>/</span>
          <span className="text-charcoal font-medium">{cityInfo.city}</span>
        </nav>

        {/* Tips */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8">
          <h3 className="font-[Cabin] font-bold text-forest mb-3">Tips for Choosing a Dog Groomer in {cityInfo.city}</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Check online reviews and ask for recommendations from other local dog owners in {cityInfo.city}.</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Visit the grooming facility before your first appointment to make sure it&apos;s clean and well-maintained.</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5">&#10003;</span> Ask about experience with your dog&apos;s breed &mdash; specialized coat types need groomers who know the right techniques.</li>
          </ul>
        </div>

        {/* Map */}
        {groomers.length > 0 && <ParkMap parks={mapParks} center={center} zoom={12} height="350px" className="mb-8" />}

        {/* Groomer Listings */}
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">All Dog Groomers in {cityInfo.city}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          {groomers.map((g) => (
            <Link key={g.slug} href={`/groomers/${g.slug}`} className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-bark">
              <p className="font-bold text-charcoal group-hover:text-forest transition text-sm">{g.name}</p>
              <p className="text-gray-500 text-xs mt-1">{g.city}, {g.stateAbbr}</p>
              <div className="flex items-center gap-2 mt-1">
                {g.rating > 0 && <span className="text-bark text-xs font-semibold">{"★".repeat(Math.round(g.rating))} {g.rating.toFixed(1)}</span>}
                {g.phone && <span className="text-gray-400 text-xs">&middot; {g.phone}</span>}
              </div>
            </Link>
          ))}
        </div>

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqItems.map((f, i) => (
              <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
                <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-forest transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
                <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </div>

        <FeaturedArticle listingSlug={`groomers-${slug}`} />

        {/* Cross-links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 mb-10">
          <Link href={`/vets/cities/${cityInfo.stateSlug}-${cityInfo.citySlug}`} className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-forest transition mb-1">Find a Vet in {cityInfo.city}</h3>
            <p className="text-gray-400 text-sm">Browse veterinarians in {cityInfo.city}, {cityInfo.stateName}.</p>
          </Link>
          <Link href={`/${cityInfo.stateSlug}`} className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-forest transition mb-1">Dog Parks in {cityInfo.stateName}</h3>
            <p className="text-gray-400 text-sm">Explore off-leash dog parks across {cityInfo.stateName}.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
