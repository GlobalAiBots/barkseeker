import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advertise With BarkSeeker — Reach 37,000+ Dog Parks, Groomers & Vets",
  description: "Advertise on BarkSeeker. Reach dog owners actively researching parks, groomers, vets, and dog products. Featured listings, sponsored posts, and banner ads across 37,000+ pages.",
  alternates: { canonical: "https://barkseeker.com/advertise" },
  openGraph: {
    title: "Advertise With BarkSeeker",
    description: "Reach dog owners actively researching parks, groomers, vets, and products.",
    url: "https://barkseeker.com/advertise",
    siteName: "BarkSeeker",
  },
};

export default function AdvertisePage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://barkseeker.com" },
      { "@type": "ListItem", position: 2, name: "Advertise", item: "https://barkseeker.com/advertise" },
    ],
  };

  const mailto = "mailto:hello@barkseeker.com?subject=" + encodeURIComponent("Advertising Inquiry — BarkSeeker") + "&body=" + encodeURIComponent("Hi BarkSeeker team,\n\nI'd like to learn more about advertising options. Here's a quick intro:\n\n- Company: \n- Product / Service: \n- Target audience: \n- Budget range: \n- Format of interest (featured listing / sponsored post / banner): \n\nThanks!");

  return (
    <div className="min-h-screen pb-24 bg-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="max-w-5xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
          <Link href="/" className="hover:text-forest transition">Home</Link><span>/</span>
          <span className="text-charcoal font-medium">Advertise</span>
        </nav>

        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-12 mb-10">
          <p className="text-bark text-xs font-bold tracking-widest uppercase mb-3">Partnerships</p>
          <h1 className="font-[Cabin] text-3xl md:text-5xl font-bold text-charcoal mb-4 leading-tight">Advertise With BarkSeeker</h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mb-6">
            Reach dog owners actively researching parks, groomers, vets, and dog products. BarkSeeker spans 37,000+ listings across dog parks, grooming services, and veterinary clinics.
          </p>
          <a href={mailto} className="inline-block bg-forest hover:bg-forest-light text-white font-bold px-6 py-3 rounded-lg transition shadow-sm">Start a Conversation</a>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { stat: "37,000+", label: "Listings" },
            { stat: "50", label: "States Covered" },
            { stat: "Parks + Groomers + Vets", label: "Category Coverage" },
            { stat: "Growing", label: "Editorial Library" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 text-center">
              <p className="font-[Cabin] text-2xl md:text-3xl font-bold text-forest">{s.stat}</p>
              <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-10">
          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Who You&apos;ll Reach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700 leading-relaxed">
            <div>
              <p className="font-bold text-charcoal mb-2">Audience profile</p>
              <ul className="space-y-1.5 text-gray-600">
                <li>&bull; Dog owners across all ages, heavy female skew 25-55</li>
                <li>&bull; National reach, strongest in suburban dog-owning markets</li>
                <li>&bull; Readers with sustained dog-care research behavior</li>
                <li>&bull; Mix of park visitors, grooming shoppers, and vet researchers</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-charcoal mb-2">Commercial intent</p>
              <ul className="space-y-1.5 text-gray-600">
                <li>&bull; Shopping for food, treats, toys, and grooming products</li>
                <li>&bull; Researching pet insurance before vet emergencies</li>
                <li>&bull; Comparing local groomers and veterinary clinics</li>
                <li>&bull; Reading breed, training, and health guidance content</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-5">Sponsorship Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Featured Listing",
                price: "$49-199/mo",
                desc: "Pin your grooming salon, vet clinic, or dog-facing business to the top of relevant state and city pages. Best for local businesses wanting direct visibility with dog owners.",
              },
              {
                title: "Sponsored Post",
                price: "$299-999",
                desc: "A dedicated long-form article with your brand integrated naturally. Strong for pet-food brands, pet-insurance providers, supplement companies, and breed-specific products.",
              },
              {
                title: "Banner Ad",
                price: "$299-799/mo",
                desc: "Display placement across high-traffic listing and editorial pages. 300x250 and responsive units. Monthly or quarterly commitments.",
              },
            ].map((opt) => (
              <div key={opt.title} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col">
                <p className="font-[Cabin] font-bold text-charcoal text-xl mb-1">{opt.title}</p>
                <p className="text-forest font-bold text-lg mb-3">{opt.price}</p>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">{opt.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 italic mt-3">Pricing is a starting range. Custom packages and multi-site bundles (MarinaSeeker, PierSeeker, RampSeeker, MechanicSeeker, BabyMyDog) available.</p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-10">
          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-3">Media Kit</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-2xl">
            Current traffic numbers, top-performing content, category breakdowns, and example ad placements are available in our media kit. We send it on request so we can tailor it to your vertical.
          </p>
          <a href={mailto} className="inline-block bg-bark hover:bg-bark-dark text-white font-bold px-6 py-3 rounded-lg transition shadow-sm">Request Media Kit</a>
        </section>

        <section className="bg-forest/5 border-2 border-forest/30 rounded-2xl p-6 md:p-8">
          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-3">Let&apos;s Talk</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-2xl">
            Email <a href={mailto} className="text-forest font-semibold hover:underline">hello@barkseeker.com</a> with a quick note about your product and target audience. We&apos;ll reply within two business days with recommended placements and current availability.
          </p>
          <a href={mailto} className="inline-block bg-forest hover:bg-forest-light text-white font-bold px-6 py-3 rounded-lg transition shadow-sm">Email Us</a>
        </section>
      </div>
    </div>
  );
}
