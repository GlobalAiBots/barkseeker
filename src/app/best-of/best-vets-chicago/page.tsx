import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Vets in Chicago — Top 8 Clinics | BarkSeeker",
  description: "Top-rated vet clinics in Chicago, including urgent care, in-home veterinary, hospice, and neighborhood animal hospitals. Hours, services, and what to expect.",
  openGraph: { title: "Best Vets in Chicago — Top 8 Clinics", url: "https://barkseeker.com/best-of/best-vets-chicago", siteName: "BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/best-of/best-vets-chicago" },
};

export default function BestVetsChicago() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://barkseeker.com/" },
          { "@type": "ListItem", position: 2, name: "Best Of", item: "https://barkseeker.com/best-of" },
          { "@type": "ListItem", position: 3, name: "Best Vets in Chicago", item: "https://barkseeker.com/best-of/best-vets-chicago" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "How do I find a good vet in Chicago?", acceptedAnswer: { "@type": "Answer", text: "Look for a clinic close to home (you'll need to get there fast in an emergency), check recent reviews (2024+), ask about appointment availability for new patients, and confirm they work with your dog's breed or condition. For off-hours care, know where your nearest 24-hour urgent care is before you need it." } },
          { "@type": "Question", name: "Which Chicago vets handle emergencies?", acceptedAnswer: { "@type": "Answer", text: "Scout Veterinary Urgent Care on Lincoln Ave handles after-hours and weekend urgent cases. For full 24-hour emergency and specialty care, Chicago has several dedicated emergency animal hospitals that take walk-ins around the clock — your regular vet can recommend the closest one to you." } },
          { "@type": "Question", name: "How much does a vet visit cost in Chicago?", acceptedAnswer: { "@type": "Answer", text: "A routine wellness exam in Chicago runs roughly $65–120 depending on the clinic. Urgent care and emergency visits start at $125–200 just for the exam, before diagnostics. Annual vaccines add $25–60 each. Budget $500–800/year for a healthy adult dog; more for seniors." } },
        ],
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-forest transition">Home</Link><span>/</span>
        <span className="text-gray-400">Best Of</span><span>/</span>
        <span className="text-charcoal font-medium">Best Vets in Chicago</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-4 leading-tight">Best Vets in Chicago &mdash; Top 8 Clinics</h1>
      <p className="text-gray-400 text-sm mb-8">Updated April 2026 &middot; 8 min read</p>

      <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-6">
        <p>
          Finding a good Chicago vet matters most when you don&apos;t need one yet &mdash; so you have a relationship established before the first emergency. We&apos;ve picked eight highly-rated clinics across the city, covering urgent care, in-home care, hospice, and neighborhood animal hospitals. All have been scored by actual patients on services like wellness exams, surgery, and end-of-life care. For the full searchable directory, head to the <Link href="/vets/illinois" className="text-forest hover:underline font-semibold">Chicago vets page</Link>.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">1. Scout Veterinary Urgent Care &mdash; Lincoln Park</h2>
        <p>
          <Link href="/vets/illinois-scout-veterinary-urgent-care-smouj4yretapobx-1ltrmq" className="text-forest hover:underline font-semibold">Scout Veterinary Urgent Care</Link> on North Lincoln Avenue fills the critical gap between your regular vet and a full emergency hospital &mdash; after-hours, weekends, and walk-in urgent cases without the full ER price tag. Reviewers consistently mention fast triage, clear communication about costs up front, and veterinarians who take time to explain the diagnosis. If your regular vet is closed and it&apos;s not quite ER-level, Scout is a practical first stop. Address: 2369 N Lincoln Ave, Chicago, IL 60614.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">2. Chicago In Home Veterinary Care &mdash; Citywide</h2>
        <p>
          <Link href="/vets/illinois-chicago-in-home-veterinary-care-eontvmlynkbwu7v5flblwa" className="text-forest hover:underline font-semibold">Chicago In Home Veterinary Care</Link> brings the clinic to you &mdash; a real quality-of-life upgrade for anxious dogs, senior pets, multi-pet households, and anyone who has ever wrestled a cat into a carrier. Services include wellness exams, vaccines, diagnostics, and end-of-life care in the comfort of home. Especially valued by owners of stressed or reactive dogs who do worse in a clinic environment. Coverage is citywide; book ahead.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">3. Pets First Veterinary Clinic &mdash; Lakeview</h2>
        <p>
          <Link href="/vets/illinois-pets-first-veterinary-clinic-orq7snegmlb1tzf6rnthkw" className="text-forest hover:underline font-semibold">Pets First Veterinary Clinic</Link> on North Broadway is a full-service Lakeview neighborhood vet with a strong review track record. Reviewers mention thorough exams, staff who remember patients, and a practice that feels personal rather than assembly-line. Good fit for general wellness, vaccines, and routine care. Address: 3413 N Broadway St, Chicago, IL 60657.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">4. West Wrigley Animal Hospital &mdash; Lakeview</h2>
        <p>
          <Link href="/vets/illinois-west-wrigley-animal-hospital-j-zbexgx3jgvtkei2ra-dq" className="text-forest hover:underline font-semibold">West Wrigley Animal Hospital</Link> on North Ashland is another Lakeview favorite with a reputation for clear pricing and unhurried appointments. A strong option for dog owners in the Lakeview/Wrigleyville corridor who want a neighborhood practice rather than a chain. Address: 3416 N Ashland Ave, Chicago, IL 60657.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">5. Fauna Veterinary Care &mdash; Uptown</h2>
        <p>
          <Link href="/vets/illinois-fauna-veterinary-care-fjehfy-hhefgcbpipjw70q" className="text-forest hover:underline font-semibold">Fauna Veterinary Care</Link> on West Lawrence in Uptown has earned a strong reputation for attention to detail and staff who take time with nervous pets. A good pick for the north-side neighborhoods. Address: 1039 W Lawrence Ave, Chicago, IL 60640.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">6. South Loop Animal Hospital &mdash; South Loop</h2>
        <p>
          <Link href="/vets/illinois-south-loop-animal-hospital-wa-ivifkjltwcep0f4pzva" className="text-forest hover:underline font-semibold">South Loop Animal Hospital</Link> covers a part of the city with fewer vet options per capita &mdash; a real advantage for South Loop and nearby residents who don&apos;t want a long drive north. Full-service clinic with a solid review history. Address: 1640 S Michigan Ave, Chicago, IL 60616.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">7. Medical District Veterinary Clinic at Illinois &mdash; Medical District</h2>
        <p>
          <Link href="/vets/illinois-medical-district-veterinary-clinic-at-illinois-eatraucx-o8tgks0odjpvq" className="text-forest hover:underline font-semibold">Medical District Veterinary Clinic at Illinois</Link> on West Harrison is affiliated with the city&apos;s Medical District and draws a solid review base for both general wellness and more complex cases. Easy access from the Loop and West Side. Address: 2242 W Harrison St, Ste 101, Chicago, IL 60612.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">8. Compassionate Veterinary Hospice &mdash; End-of-Life Care</h2>
        <p>
          <Link href="/vets/illinois-compassionate-veterinary-hospice-tt41yeiomccpayvmqdjdg" className="text-forest hover:underline font-semibold">Compassionate Veterinary Hospice</Link> handles the part of pet ownership nobody wants to think about, and does it well. In-home hospice and end-of-life care, with reviewers consistently describing the experience as dignified and personal. Worth knowing about before you need it &mdash; having the number saved in your phone is a kindness to your future self.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">How to Pick Your Chicago Vet</h2>
        <p>
          The best vet for you is usually a 15-minute drive from home, open at hours that fit your schedule, and charges in a range you can afford for routine care. Emergency-grade clinics and mobile vets fill gaps, but you want a steady primary relationship. Our <Link href="/blog/how-to-find-good-veterinarian" className="text-forest hover:underline font-semibold">vet-finding guide</Link> walks through the questions to ask on the first call.
        </p>

        <p>
          For the full searchable directory, see our <Link href="/vets/illinois" className="text-forest hover:underline font-semibold">Chicago vets page</Link>. Pair a good vet with a good emergency plan &mdash; our piece on <Link href="/blog/emergency-vet-vs-regular-vet" className="text-forest hover:underline font-semibold">emergency vet vs regular vet</Link> lays out which to call for what.
        </p>
      </div>
    </article>
  );
}
