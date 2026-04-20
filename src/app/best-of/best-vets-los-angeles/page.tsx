import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Vets in Los Angeles — Top 8 Clinics | BarkSeeker",
  description: "Top-rated vet clinics in Los Angeles, including mobile vets, house-call services, and neighborhood animal hospitals. Hours, services, and what to expect.",
  openGraph: { title: "Best Vets in Los Angeles — Top 8", url: "https://www.barkseeker.com/best-of/best-vets-los-angeles", siteName: "BarkSeeker" },
  alternates: { canonical: "https://www.barkseeker.com/best-of/best-vets-los-angeles" },
};

export default function BestVetsLosAngeles() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.barkseeker.com/" },
          { "@type": "ListItem", position: 2, name: "Best Of", item: "https://www.barkseeker.com/best-of" },
          { "@type": "ListItem", position: 3, name: "Best Vets in Los Angeles", item: "https://www.barkseeker.com/best-of/best-vets-los-angeles" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "How much does a vet visit cost in Los Angeles?", acceptedAnswer: { "@type": "Answer", text: "A routine wellness exam in LA runs roughly $75–150 depending on the clinic. Mobile and house-call vets add a travel fee of $50–150 on top. Urgent care and emergency visits start at $150–250 just for the exam, before diagnostics. Budget $600–1,000/year for a healthy adult dog." } },
          { "@type": "Question", name: "How do I find a good vet in Los Angeles?", acceptedAnswer: { "@type": "Answer", text: "Look for a clinic close to home (LA traffic makes a 20-minute vet drive into an hour), check recent reviews (2024+), and confirm they work with your dog's breed or condition. Mobile and house-call vets are a great fit for anxious or senior dogs, and are especially common in LA due to the city's layout." } },
          { "@type": "Question", name: "Which LA vets offer mobile or house-call services?", acceptedAnswer: { "@type": "Answer", text: "Gold Coast Mobile Veterinary Care, IVS Mobile Vets, Comforting Creatures, and several hospice-focused practices all operate citywide. Mobile is especially popular in LA for anxious dogs, senior pets, and multi-pet households that don't want to transport everyone at once." } },
        ],
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-forest transition">Home</Link><span>/</span>
        <span className="text-gray-400">Best Of</span><span>/</span>
        <span className="text-charcoal font-medium">Best Vets in Los Angeles</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-4 leading-tight">Best Vets in Los Angeles &mdash; Top 8 Clinics</h1>
      <p className="text-gray-400 text-sm mb-8">Updated April 2026 &middot; 7 min read</p>

      <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-6">
        <p>
          Finding a good Los Angeles vet matters most when you don&apos;t need one yet &mdash; so the relationship is established before the first emergency. LA is unusual in how many mobile and house-call vets serve the city; traffic and geography make bringing the vet to you a genuinely practical choice. We&apos;ve picked eight highly-rated clinics across LA covering brick-and-mortar, mobile, and specialty care. All ratings pulled from verified reviewer data. For the full searchable directory, head to our <Link href="/vets/california" className="text-forest hover:underline font-semibold">California vets page</Link>.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">1. Ever Animal Care <span className="text-gray-400 font-normal text-base">&mdash; 5.0&#9733; (231 reviews)</span></h2>
        <p>
          <Link href="/vets/california-ever-animal-care-oibi4xvkzz0bssvlq3rp2w" className="text-forest hover:underline font-semibold">Ever Animal Care</Link> is one of LA&apos;s highest-rated full-service animal clinics with 231 reviews and a perfect 5-star average. Reviewers consistently mention thorough exams, clear cost communication, and a staff that takes time with nervous pets. Call: (818) 515-2748.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">2. Gold Coast Mobile Veterinary Care <span className="text-gray-400 font-normal text-base">&mdash; 5.0&#9733; (173 reviews)</span></h2>
        <p>
          <Link href="/vets/california-gold-coast-mobile-veterinary-care-77mfvkw9fq36jucd-7vg4a" className="text-forest hover:underline font-semibold">Gold Coast Mobile Veterinary Care</Link> brings the clinic to you &mdash; wellness exams, vaccines, diagnostics, and end-of-life care in your home. With 173 five-star reviews, it&apos;s one of the most trusted mobile practices on the west side. Call: (310) 528-4026.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">3. Tooth &amp; Nail Pet Care <span className="text-gray-400 font-normal text-base">&mdash; 5.0&#9733; (51 reviews)</span></h2>
        <p>
          <Link href="/vets/california-tooth-nail-pet-care-55ibcv9agvcmr1pfejynjw" className="text-forest hover:underline font-semibold">Tooth &amp; Nail Pet Care</Link> focuses on grooming-adjacent veterinary services and preventive care from a Hollywood-area base. Perfect 5-star rating across 51 reviews. Call: (818) 600-1206.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">4. Dog House Rehab <span className="text-gray-400 font-normal text-base">&mdash; 5.0&#9733; (39 reviews)</span></h2>
        <p>
          <Link href="/vets/california-dog-house-rehab-nma5-tjmu9ffeqhv6zchgg" className="text-forest hover:underline font-semibold">Dog House Rehab</Link> specializes in canine rehabilitation and recovery &mdash; orthopedic post-op care, senior mobility, and injury recovery. Specialty practice, hard to find elsewhere in the city. Call: (818) 254-6847.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">5. IVS Mobile Vets <span className="text-gray-400 font-normal text-base">&mdash; 5.0&#9733; (24 reviews)</span></h2>
        <p>
          <Link href="/vets/california-ivs-mobile-vets-3yoqi-qhdppdm7isgoyzfw" className="text-forest hover:underline font-semibold">IVS Mobile Vets</Link> covers South LA with a full range of mobile services. Great fit for households with multiple pets or dogs who don&apos;t travel well. Call: (323) 898-1906.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">6. Reina Gaetan DVM <span className="text-gray-400 font-normal text-base">&mdash; 5.0&#9733; (11 reviews)</span></h2>
        <p>
          <Link href="/vets/california-reina-gaetan-dvm-cicldbzpuaitgb3g0ziocg" className="text-forest hover:underline font-semibold">Reina Gaetan DVM</Link> runs a small practice on Melrose with a dedicated patient base. Reviewers cite unhurried appointments and the ability to build a real relationship with the vet. Address: 5853 Melrose Ave. Call: (323) 461-3575.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">7. Liz Friedman, DVM <span className="text-gray-400 font-normal text-base">&mdash; 4.9&#9733; (155 reviews)</span></h2>
        <p>
          <Link href="/vets/california-liz-friedman-dvm-k6inpwisvdcoa0i6mob0mg" className="text-forest hover:underline font-semibold">Liz Friedman, DVM</Link> is a well-established individual practitioner with 155 reviews and a 4.9 rating &mdash; unusual for a solo practice. Strong fit for owners who want the same vet every visit. Call: (323) 314-8536.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">8. Comforting Creatures <span className="text-gray-400 font-normal text-base">&mdash; 4.9&#9733; (135 reviews)</span></h2>
        <p>
          <Link href="/vets/california-comforting-creatures-szdtfver1apv4qyla41zsw" className="text-forest hover:underline font-semibold">Comforting Creatures</Link> handles the part of pet ownership nobody wants to think about &mdash; in-home hospice and end-of-life care, with 135 reviews describing the experience as dignified and personal. Worth knowing about before you need it. Call: (310) 483-7250.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">How to Pick Your LA Vet</h2>
        <p>
          The best vet for you is usually a 15-minute drive from home (LA traffic compressed), open at hours that fit your schedule, and charges in a range you can afford for routine care. Mobile and house-call vets solve the traffic-and-anxiety problem but cost a travel premium. Our <Link href="/blog/how-to-find-good-veterinarian" className="text-forest hover:underline font-semibold">vet-finding guide</Link> walks through what to ask on the first call.
        </p>

        <p>
          For the full directory, see our <Link href="/vets/california" className="text-forest hover:underline font-semibold">California vets page</Link>. Pair a good vet with an emergency plan &mdash; our piece on <Link href="/blog/emergency-vet-vs-regular-vet" className="text-forest hover:underline font-semibold">emergency vet vs regular vet</Link> lays out which to call for what.
        </p>
      </div>
    </article>
  );
}
