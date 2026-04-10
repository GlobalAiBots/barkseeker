import Link from "next/link";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { unified, getUnifiedParkById, amenityLabels } from "@/data/all-parks";
import CletusAd from "@/components/CletusAd";
import type { Metadata } from "next";

const ParkMap = dynamic(() => import("@/components/ParkMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 400 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });

export const dynamicParams = true;
export function generateStaticParams() { return []; }

const stateNames: Record<string, string> = {AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",CT:"Connecticut",DE:"Delaware",FL:"Florida",GA:"Georgia",HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming"};
const stateSlugs: Record<string, string> = {AL:"alabama",AK:"alaska",AZ:"arizona",AR:"arkansas",CA:"california",CO:"colorado",CT:"connecticut",DE:"delaware",FL:"florida",GA:"georgia",HI:"hawaii",ID:"idaho",IL:"illinois",IN:"indiana",IA:"iowa",KS:"kansas",KY:"kentucky",LA:"louisiana",ME:"maine",MD:"maryland",MA:"massachusetts",MI:"michigan",MN:"minnesota",MS:"mississippi",MO:"missouri",MT:"montana",NE:"nebraska",NV:"nevada",NH:"new-hampshire",NJ:"new-jersey",NM:"new-mexico",NY:"new-york",NC:"north-carolina",ND:"north-dakota",OH:"ohio",OK:"oklahoma",OR:"oregon",PA:"pennsylvania",RI:"rhode-island",SC:"south-carolina",SD:"south-dakota",TN:"tennessee",TX:"texas",UT:"utah",VT:"vermont",VA:"virginia",WA:"washington",WV:"west-virginia",WI:"wisconsin",WY:"wyoming"};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const park = getUnifiedParkById(id);
  if (!park) return { title: "Park Not Found" };
  return {
    title: `${park.name} — Dog Park Details | BarkSeeker`,
    description: `${park.name} dog park in ${park.city || stateNames[park.state] || park.state}. GPS coordinates, amenities, directions.`,
    openGraph: { title: `${park.name} — BarkSeeker`, url: `https://barkseeker.com/parks/${park.id}` },
    alternates: { canonical: `https://barkseeker.com/parks/${park.id}` },
  };
}

export default async function ParkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const park = getUnifiedParkById(id);
  if (!park) notFound();
  const stSlug = stateSlugs[park.state] || park.state.toLowerCase();
  const stName = stateNames[park.state] || park.state;
  // Precomputed nearby parks
  const nearbyData = (() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const data = require("@/data/nearby.json");
      return (data[park.id] || []).slice(0, 5);
    } catch { return []; }
  })();
  const nearby = nearbyData.length > 0
    ? nearbyData.map((n: { id: string; name: string; distance: number; city: string; state: string }) => {
        const found = unified.find((p) => p.id === n.id);
        return found ? { ...found, distanceMiles: n.distance } : null;
      }).filter(Boolean)
    : unified.filter((p) => p.id !== park.id && p.state === park.state).slice(0, 5);
  const mapParks = [{ id: park.id, name: park.name, latitude: park.latitude, longitude: park.longitude, city: park.city }];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Place", name: park.name, geo: { "@type": "GeoCoordinates", latitude: park.latitude, longitude: park.longitude }, address: { "@type": "PostalAddress", addressRegion: stName } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://barkseeker.com" }, { "@type": "ListItem", position: 2, name: stName, item: `https://barkseeker.com/${stSlug}` }, { "@type": "ListItem", position: 3, name: park.name, item: `https://barkseeker.com/parks/${park.id}` }] }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-forest transition">Home</Link><span>/</span>
        <Link href={`/${stSlug}`} className="hover:text-forest transition">{stName}</Link><span>/</span>
        <span className="text-charcoal font-medium">{park.name}</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-2">{park.name}</h1>
      <p className="text-gray-500 mb-6">{park.city ? `${park.city}, ` : ""}{stName} &middot; GPS: {park.latitude.toFixed(4)}, {park.longitude.toFixed(4)}</p>

      <ParkMap parks={mapParks} center={[park.latitude, park.longitude]} zoom={15} height="400px" className="mb-8" />

      <div className="flex flex-wrap gap-3 mb-8">
        <a href={`https://www.google.com/maps/dir/?api=1&destination=${park.latitude},${park.longitude}`} target="_blank" rel="noopener noreferrer" className="bg-bark hover:bg-bark-dark text-white font-bold px-6 py-3 rounded-lg transition shadow-sm text-sm">Get Directions</a>
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm"><span className="text-gray-400">GPS:</span><span className="font-mono text-charcoal ml-2">{park.latitude.toFixed(6)}, {park.longitude.toFixed(6)}</span></div>
      </div>

      {park.amenities && park.amenities.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">Amenities</h2>
          <div className="flex flex-wrap gap-2">
            {park.amenities.map((a) => (<span key={a} className="bg-forest/10 text-forest text-sm font-medium px-3 py-1.5 rounded-lg">{amenityLabels[a]?.icon} {amenityLabels[a]?.label || a}</span>))}
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">About This Park</h2>
        <p className="text-gray-600 leading-relaxed">{park.description}</p>
      </div>

      <CletusAd />

      {nearby.length > 0 && (
        <>
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4 mt-8">Nearby Dog Parks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {nearby.map((p: { id: string; name: string; city: string; state: string; distanceMiles?: number }) => (
              <Link key={p.id} href={`/parks/${p.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-forest">
                <p className="font-bold text-charcoal group-hover:text-forest transition text-sm">{p.name}</p>
                <p className="text-gray-500 text-xs">{p.city || stName}{p.distanceMiles ? ` \u00b7 ${p.distanceMiles} mi` : ""}</p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
