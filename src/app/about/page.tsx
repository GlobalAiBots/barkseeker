import Link from "next/link";
import type { Metadata } from "next";
import { SITE_STATS } from "@/lib/site-stats";

const TOTAL = SITE_STATS.total.toLocaleString();

export const metadata: Metadata = {
  title: "About BarkSeeker — Free Dog Park, Groomer & Vet Directory",
  description: `BarkSeeker is a free pet services directory covering ${TOTAL}+ listings across all 50 states — dog parks, professional groomers, and trusted veterinarians. Veteran-owned, ad-supported, no paywalls.`,
  openGraph: { title: "About BarkSeeker", url: "https://www.barkseeker.com/about", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "About BarkSeeker" },
  alternates: { canonical: "https://www.barkseeker.com/about" },
};

const network = [
  { name: "RampSeeker", url: "https://www.rampseeker.com", tag: "27,700+ Boat Ramps" },
  { name: "PierSeeker", url: "https://www.pierseeker.com", tag: "35,000+ Fishing Piers" },
  { name: "MarinaSeeker", url: "https://www.marinaseeker.com", tag: "9,000+ Marinas" },
  { name: "MechanicSeeker", url: "https://www.mechanicseeker.com", tag: "44,000+ Auto Repair Shops" },
  { name: "BarkSeeker", url: "https://www.barkseeker.com", tag: "37,000+ Dog Parks, Groomers & Vets" },
  { name: "BabyMyDog", url: "https://www.babymydog.com", tag: "260+ Dog Product Reviews" },
  { name: "GlobalAiBots", url: "https://www.globalaibots.com", tag: "CLETUS AI Platform" },
  { name: "AskCletus", url: "https://www.askcletus.com", tag: "AI Chat Demo" },
  { name: "GetCletus", url: "https://www.getcletus.com", tag: "CLETUS Signup" },
  { name: "GrandLakeAI", url: "https://www.grandlakeai.com", tag: "Grand Lake Business AI" },
];

export default function AboutPage() {
  return (
    <div>
      <section className="px-4 pt-16 pb-10 text-center bg-cream" style={{ backgroundImage: "radial-gradient(circle at 30% 70%, rgba(45,106,79,0.06) 0%, transparent 50%)" }}>
        <h1 className="font-[Cabin] text-3xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">
          About BarkSeeker &mdash; Free Dog Park, Groomer &amp; Vet Directory
        </h1>
        <p className="text-gray-500 text-lg mt-5 max-w-2xl mx-auto">
          Every dog park, groomer, and vet in America, in one place, free to search. No more driving to a &quot;park&quot; that&apos;s a grass patch, or calling ten groomers to ask who takes your breed.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { num: `${SITE_STATS.parks.toLocaleString()}+`, label: "Dog Parks" },
            { num: `${SITE_STATS.groomers.toLocaleString()}+`, label: "Groomers" },
            { num: `${SITE_STATS.vets.toLocaleString()}+`, label: "Veterinarians" },
            { num: "50", label: "States Covered" },
          ].map(s => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-sm">
              <p className="font-[Cabin] text-2xl md:text-3xl font-extrabold text-forest">{s.num}</p>
              <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-gray-200 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Why We Built This</h2>
          <p className="text-gray-700 leading-relaxed">
            BarkSeeker is part of a directory network built by <strong className="text-charcoal">James Mull, a Navy veteran</strong> who got tired of bouncing between unreliable websites trying to find trusted local services. So we built the network we wished existed &mdash; completely free, ad-supported, and updated constantly. No logins. No paywalls. No upsells to basic information. Just verified contact info and real local data for dog owners who want a park that&apos;s actually fenced, a groomer who takes their breed, and a vet who explains things.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-6">What Makes Us Different</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3"><span className="text-forest text-xl flex-shrink-0 mt-0.5">&#10003;</span><div><strong className="text-charcoal">Free forever</strong> &mdash; no login, no subscription, no paywall behind basic contact info</div></li>
          <li className="flex items-start gap-3"><span className="text-forest text-xl flex-shrink-0 mt-0.5">&#10003;</span><div><strong className="text-charcoal">GPS-verified locations</strong> &mdash; parks, groomers, and vets all pinned accurately</div></li>
          <li className="flex items-start gap-3"><span className="text-forest text-xl flex-shrink-0 mt-0.5">&#10003;</span><div><strong className="text-charcoal">Ratings + reviews</strong> pulled from Yelp and Google, not anonymous user-submitted</div></li>
          <li className="flex items-start gap-3"><span className="text-forest text-xl flex-shrink-0 mt-0.5">&#10003;</span><div><strong className="text-charcoal">Amenity filters</strong> &mdash; fenced, water, shade, small-dog area, off-leash</div></li>
          <li className="flex items-start gap-3"><span className="text-forest text-xl flex-shrink-0 mt-0.5">&#10003;</span><div><strong className="text-charcoal">Veteran-owned, Oklahoma-based</strong> &mdash; a small American team building every page</div></li>
        </ul>
      </section>

      <section className="bg-gray-50 border-y border-gray-200 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-3">Our Network</h2>
          <p className="text-gray-600 mb-6">We operate the GlobalAiBots directory network &mdash; 10 sites covering 150,000+ businesses across boating, auto care, pet services, and AI tools for small businesses.</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {network.map(s => (
              <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="block bg-white border border-gray-200 rounded-xl p-3 hover:border-forest hover:shadow-sm transition">
                <p className="font-bold text-charcoal text-sm">{s.name}</p>
                <p className="text-gray-500 text-xs mt-1">{s.tag}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Contact</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Know a park, groomer, or vet we missed? Spotted a correction? Email <a href="mailto:hello@barkseeker.com" className="text-forest hover:underline font-semibold">hello@barkseeker.com</a>.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Questions or partnerships? Email <a href="mailto:james@globalaibots.com" className="text-forest hover:underline font-semibold">james@globalaibots.com</a>.
        </p>
        <p className="text-gray-400 text-sm mt-6">
          BarkSeeker is a project of <a href="https://www.globalaibots.com" target="_blank" rel="noopener noreferrer" className="text-forest hover:underline">Global AI Bots</a>. Veteran-owned and operated.
        </p>
        <Link href="/" className="inline-block mt-6 text-forest hover:underline font-semibold text-sm">&larr; Back to home</Link>
      </section>
    </div>
  );
}
