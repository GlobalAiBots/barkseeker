import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Vets in Dallas — Top 8 Clinics | BarkSeeker",
  description: "Top-rated vet clinics in Dallas, including hospice, house-call, ophthalmology specialists, and trusted neighborhood animal hospitals. Hours, services, and what to expect.",
  openGraph: { title: "Best Vets in Dallas — Top 8", url: "https://www.barkseeker.com/best-of/best-vets-dallas", siteName: "BarkSeeker" },
  alternates: { canonical: "https://www.barkseeker.com/best-of/best-vets-dallas" },
};

export default function BestVetsDallas() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.barkseeker.com/" },
          { "@type": "ListItem", position: 2, name: "Best Of", item: "https://www.barkseeker.com/best-of" },
          { "@type": "ListItem", position: 3, name: "Best Vets in Dallas", item: "https://www.barkseeker.com/best-of/best-vets-dallas" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "How much does a vet visit cost in Dallas?", acceptedAnswer: { "@type": "Answer", text: "A routine wellness exam in Dallas runs roughly $55–120 depending on the clinic. Urgent care starts at $125–200 for the exam alone. Emergency visits to 24-hour specialty hospitals start at $200–300. Budget $500–900/year for a healthy adult dog; more for seniors." } },
          { "@type": "Question", name: "How do I find a good vet in Dallas?", acceptedAnswer: { "@type": "Answer", text: "Pick a clinic within 15 minutes of home — Dallas is spread out and traffic matters in an emergency. Check recent reviews (2024+), confirm they're taking new patients, and ask about their after-hours protocol. Specialty practices (eye, ortho, oncology) are better to have on your short list before you need them." } },
          { "@type": "Question", name: "Are house-call vets available in Dallas?", acceptedAnswer: { "@type": "Answer", text: "Yes — Park Cities House Call Vet and Dallas Veterinary Hospice both provide in-home services. Mobile and house-call vets are a strong fit for senior dogs, anxious pets, and multi-pet households where transporting everyone is impractical." } },
        ],
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-forest transition">Home</Link><span>/</span>
        <span className="text-gray-400">Best Of</span><span>/</span>
        <span className="text-charcoal font-medium">Best Vets in Dallas</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-4 leading-tight">Best Vets in Dallas &mdash; Top 8 Clinics</h1>
      <p className="text-gray-400 text-sm mb-8">Updated April 2026 &middot; 7 min read</p>

      <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-6">
        <p>
          Dallas is big, spread out, and well-served on vet care &mdash; from established neighborhood animal hospitals to specialty ophthalmology and in-home hospice. We&apos;ve picked eight highly-rated clinics across the metro that cover the major categories. All ratings pulled from verified reviewer data. For the full searchable directory, head to our <Link href="/vets/texas" className="text-forest hover:underline font-semibold">Texas vets page</Link>.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">1. Pavillion Animal Hospital <span className="text-gray-400 font-normal text-base">&mdash; 5.0&#9733; (28 reviews)</span></h2>
        <p>
          <Link href="/vets/texas-pavillion-animal-hospital-drlsianceciaf3b2vrn5va" className="text-forest hover:underline font-semibold">Pavillion Animal Hospital</Link> leads Dallas general practice with a perfect 5-star rating across 28 reviews. Address: 7512 Campbell Rd. Call: (972) 248-8242.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">2. Hernandez Ernesto DVM <span className="text-gray-400 font-normal text-base">&mdash; 5.0&#9733; (17 reviews)</span></h2>
        <p>
          <Link href="/vets/texas-hernandez-ernesto-dvm-qoxqkbsgsyylr6vxbcaddq" className="text-forest hover:underline font-semibold">Hernandez Ernesto DVM</Link> runs a small East Dallas practice with a dedicated patient base. Reviewers cite unhurried exams and Spanish-language service. Address: 11437 Shiloh Rd. Call: (214) 324-5221.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">3. Blink Veterinary Eye Specialists <span className="text-gray-400 font-normal text-base">&mdash; 5.0&#9733; (16 reviews)</span></h2>
        <p>
          <Link href="/vets/texas-blink-veterinary-eye-specialists-mt7qzwtir8htlriquizs6w" className="text-forest hover:underline font-semibold">Blink Veterinary Eye Specialists</Link> is a specialty ophthalmology practice for dogs and cats &mdash; cataracts, glaucoma, corneal ulcers. Your general vet will refer out for these; worth knowing where to go. Address: 13617 Inwood Rd, Ste 240. Call: (214) 817-0637.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">4. GoodVets Uptown &mdash; Dallas <span className="text-gray-400 font-normal text-base">&mdash; 5.0&#9733; (13 reviews)</span></h2>
        <p>
          <Link href="/vets/texas-goodvets-uptown-dallas-heroakadqdsj2hkjirqodg" className="text-forest hover:underline font-semibold">GoodVets Uptown</Link> is part of the GoodVets network — modern design, transparent pricing, app-based booking. A strong fit for Uptown residents. Address: 2717 Howell St, Ste B &amp; C. Call: (214) 783-0090.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">5. Dallas Veterinary Hospice <span className="text-gray-400 font-normal text-base">&mdash; 5.0&#9733; (6 reviews)</span></h2>
        <p>
          <Link href="/vets/texas-dallas-veterinary-hospice-hrs-yiefxz7ey3iqconsrw" className="text-forest hover:underline font-semibold">Dallas Veterinary Hospice</Link> provides in-home hospice and end-of-life care. Save the number in your phone now &mdash; you don&apos;t want to be searching for this service when you need it. Call: (972) 364-7282.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">6. Park Cities House Call Vet <span className="text-gray-400 font-normal text-base">&mdash; 5.0&#9733; (3 reviews)</span></h2>
        <p>
          <Link href="/vets/texas-park-cities-house-call-vet-yqrm0rseonhtghxj1i8w4a" className="text-forest hover:underline font-semibold">Park Cities House Call Vet</Link> is a newer mobile practice serving the Park Cities and surrounding neighborhoods. Still building a review base but early reviews are perfect. Good option for anxious dogs and multi-pet households.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">7. White Rock Animal Hospital <span className="text-gray-400 font-normal text-base">&mdash; 4.9&#9733; (40 reviews)</span></h2>
        <p>
          <Link href="/vets/texas-white-rock-animal-hospital-gd5xyy-fbuc6ykvisklemw" className="text-forest hover:underline font-semibold">White Rock Animal Hospital</Link> serves the White Rock Lake / Lakewood area with 40 reviews averaging 4.9 stars &mdash; a well-established East Dallas favorite. Address: 11414 E Northwest Hwy. Call: (214) 328-3255.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">8. Abrams Royal Animal Clinic <span className="text-gray-400 font-normal text-base">&mdash; 4.9&#9733; (26 reviews)</span></h2>
        <p>
          <Link href="/vets/texas-abrams-royal-animal-clinic-bhhxd4xtz5trbs-fxojkma" className="text-forest hover:underline font-semibold">Abrams Royal Animal Clinic</Link> is a longtime North Dallas general practice with a solid review history. Good fit for Lake Highlands and surrounding neighborhoods. Address: 8244 Abrams Rd. Call: (214) 349-2260.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">How to Pick Your Dallas Vet</h2>
        <p>
          Dallas is big. Pick a vet in your own neighborhood or the immediate next one over &mdash; when something goes wrong, a 30-minute vet drive is an hour with traffic. Know where your nearest 24-hour emergency vet is before you need it. Our <Link href="/blog/how-to-find-good-veterinarian" className="text-forest hover:underline font-semibold">vet-finding guide</Link> walks through the right questions to ask on the first call.
        </p>

        <p>
          For the full directory, see our <Link href="/vets/texas" className="text-forest hover:underline font-semibold">Texas vets page</Link>. Our piece on <Link href="/blog/emergency-vet-vs-regular-vet" className="text-forest hover:underline font-semibold">emergency vet vs regular vet</Link> lays out which to call for what situation.
        </p>
      </div>
    </article>
  );
}
