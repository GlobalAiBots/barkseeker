import Link from "next/link";
import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import CletusAd from "@/components/CletusAd";

export const metadata: Metadata = {
  title: "Best Pet Insurance for Dogs (2026) — Compare Plans | BarkSeeker",
  description: "Compare the best pet insurance plans for dogs. Coverage options, costs, and what to look for. Save on vet bills with the right plan.",
  alternates: { canonical: "https://barkseeker.com/pet-insurance" },
};

const providers = [
  { name: "Lemonade", monthly: "$15-40", deductible: "$100-500", reimbursement: "70-90%", highlight: "Fast AI-powered claims", link: "#lemonade" },
  { name: "Healthy Paws", monthly: "$20-50", deductible: "$100-500", reimbursement: "70-90%", highlight: "No annual or lifetime caps", link: "#healthy-paws" },
  { name: "Embrace", monthly: "$18-55", deductible: "$200-1000", reimbursement: "70-90%", highlight: "Diminishing deductible", link: "#embrace" },
  { name: "Trupanion", monthly: "$25-60", deductible: "$0-1000", reimbursement: "90%", highlight: "Direct vet payment", link: "#trupanion" },
  { name: "Nationwide", monthly: "$20-50", deductible: "$250", reimbursement: "70-90%", highlight: "Wellness plan available", link: "#nationwide" },
  { name: "ASPCA", monthly: "$18-45", deductible: "$100-500", reimbursement: "70-90%", highlight: "Multi-pet discount", link: "#aspca" },
];

export default function PetInsurancePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://barkseeker.com" },
          { "@type": "ListItem", position: 2, name: "Pet Insurance", item: "https://barkseeker.com/pet-insurance" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "How much does pet insurance cost?", acceptedAnswer: { "@type": "Answer", text: "Pet insurance for dogs typically costs $15-60 per month depending on breed, age, location, and coverage level. Accident-only plans start as low as $10/month." } },
          { "@type": "Question", name: "Is pet insurance worth it for dogs?", acceptedAnswer: { "@type": "Answer", text: "Pet insurance can save thousands on unexpected vet bills. A single emergency surgery can cost $3,000-$10,000+. Insurance is most valuable when enrolled early before pre-existing conditions develop." } },
          { "@type": "Question", name: "What does pet insurance cover?", acceptedAnswer: { "@type": "Answer", text: "Most plans cover accidents, illnesses, surgeries, hospitalization, prescriptions, and diagnostics. Some plans add wellness coverage for routine care like vaccines and checkups." } },
          { "@type": "Question", name: "When should I get pet insurance?", acceptedAnswer: { "@type": "Answer", text: "The best time is when your dog is young and healthy. Most plans exclude pre-existing conditions, so enrolling early ensures maximum coverage." } },
          { "@type": "Question", name: "Can I use any vet with pet insurance?", acceptedAnswer: { "@type": "Answer", text: "Yes, most pet insurance plans let you visit any licensed veterinarian, specialist, or emergency clinic. You pay the vet directly and submit a claim for reimbursement." } },
        ],
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-forest transition">Home</Link><span>/</span>
        <span className="text-charcoal font-medium">Pet Insurance</span>
      </nav>

      <div className="inline-flex items-center gap-2 bg-forest/5 border border-forest/15 rounded-full px-4 py-2 mb-6">
        <span className="text-forest text-sm">&#11088;</span>
        <span className="text-charcoal text-xs font-bold">Compare Plans Trusted by Thousands of Pet Owners</span>
      </div>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-3">Best Pet Insurance for Dogs (2026)</h1>
      <p className="text-gray-500 mb-8 max-w-2xl">Compare top pet insurance providers. Find the right plan to protect your dog and your wallet from unexpected vet bills.</p>

      <AdSlot position="pet-insurance-top" />

      <section className="mb-10">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Why Pet Insurance?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[
            { stat: "$3,000+", label: "Average emergency surgery cost" },
            { stat: "1 in 3", label: "Dogs need emergency vet care each year" },
            { stat: "Up to 90%", label: "Reimbursement on covered bills" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm">
              <p className="text-2xl font-bold text-forest">{s.stat}</p>
              <p className="text-gray-500 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">Pet insurance works like health insurance for your dog. You pay a monthly premium, and when your dog needs medical care, the insurance reimburses you for covered expenses after your deductible. The earlier you enroll, the better — most plans exclude pre-existing conditions.</p>
      </section>

      <section className="mb-10">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Top Pet Insurance Providers</h2>
        <div className="space-y-4">
          {providers.map((p) => (
            <div key={p.name} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-[Cabin] font-bold text-charcoal text-lg">{p.name}</h3>
                  <p className="text-forest text-sm font-medium mt-1">{p.highlight}</p>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                    <span><strong className="text-charcoal">{p.monthly}</strong>/mo</span>
                    <span>Deductible: <strong className="text-charcoal">{p.deductible}</strong></span>
                    <span>Reimburse: <strong className="text-charcoal">{p.reimbursement}</strong></span>
                  </div>
                </div>
                <a href={p.link} className="bg-bark hover:bg-bark-dark text-white font-bold px-6 py-3 rounded-lg transition text-sm whitespace-nowrap text-center">Get a Quote</a>
              </div>
            </div>
          ))}
        </div>
        <p className="text-gray-400 text-xs mt-4">*Prices are estimates and vary by breed, age, and location. Links will be updated with affiliate partnerships.</p>
      </section>

      <section className="mb-10">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">How to Choose a Plan</h2>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5 font-bold">1.</span> <strong>Check coverage limits.</strong> Look for plans with no annual or lifetime caps for maximum protection.</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5 font-bold">2.</span> <strong>Understand the deductible.</strong> A higher deductible means lower premiums, but more out-of-pocket per incident.</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5 font-bold">3.</span> <strong>Read exclusions carefully.</strong> Breed-specific conditions, pre-existing conditions, and waiting periods vary.</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5 font-bold">4.</span> <strong>Consider wellness add-ons.</strong> Some plans cover routine care like vaccines and dental cleanings for an extra fee.</li>
            <li className="flex items-start gap-2"><span className="text-forest mt-0.5 font-bold">5.</span> <strong>Enroll early.</strong> Puppies get the best rates and no pre-existing condition exclusions.</li>
          </ul>
        </div>
      </section>

      <AdSlot position="pet-insurance-mid" />

      <section className="mb-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {[
            { q: "How much does pet insurance cost?", a: "Pet insurance for dogs typically costs $15-60 per month depending on breed, age, location, and coverage level. Accident-only plans start as low as $10/month." },
            { q: "Is pet insurance worth it?", a: "For most dog owners, yes. A single emergency can cost $3,000-$10,000+. Insurance provides peace of mind and financial protection. It's most valuable when enrolled early." },
            { q: "What does pet insurance cover?", a: "Most plans cover accidents, illnesses, surgeries, hospitalization, prescriptions, and diagnostics. Some add wellness coverage for routine care." },
            { q: "When should I get pet insurance?", a: "The best time is when your dog is young and healthy. Most plans exclude pre-existing conditions, so earlier enrollment means better coverage." },
            { q: "Can I use any vet?", a: "Yes, most plans let you visit any licensed veterinarian, specialist, or emergency clinic. You pay the vet and submit a claim for reimbursement." },
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

      <section className="mb-10">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Related Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/vets" className="bg-white border border-gray-200 rounded-xl p-4 hover:border-forest hover:shadow-sm transition">
            <p className="font-bold text-charcoal text-sm">Find a Veterinarian</p>
            <p className="text-gray-400 text-xs mt-1">Browse 17,800+ vets across the US</p>
          </Link>
          <Link href="/blog/how-much-does-vet-visit-cost" className="bg-white border border-gray-200 rounded-xl p-4 hover:border-forest hover:shadow-sm transition">
            <p className="font-bold text-charcoal text-sm">How Much Does a Vet Visit Cost?</p>
            <p className="text-gray-400 text-xs mt-1">Complete cost breakdown by visit type</p>
          </Link>
          <Link href="/blog/is-pet-insurance-worth-it" className="bg-white border border-gray-200 rounded-xl p-4 hover:border-forest hover:shadow-sm transition">
            <p className="font-bold text-charcoal text-sm">Is Pet Insurance Worth It?</p>
            <p className="text-gray-400 text-xs mt-1">In-depth analysis of costs vs. coverage</p>
          </Link>
          <Link href="/blog/how-to-reduce-vet-bills" className="bg-white border border-gray-200 rounded-xl p-4 hover:border-forest hover:shadow-sm transition">
            <p className="font-bold text-charcoal text-sm">How to Reduce Vet Bills</p>
            <p className="text-gray-400 text-xs mt-1">12 strategies to save on pet care</p>
          </Link>
        </div>
      </section>

      <CletusAd />
    </div>
  );
}
