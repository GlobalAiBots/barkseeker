import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Dog Groomers in Los Angeles — Top 10 Picks | BarkSeeker",
  description: "Top-rated LA dog groomers: Pet Purrspective, Tooth & Nail, Jess Rona, Doggie's Mobile, Angie's Pooch Pawlor. Ratings, addresses, hours, and what to expect.",
  openGraph: { title: "Best Dog Groomers in Los Angeles — Top 10", url: "https://www.barkseeker.com/best-of/best-dog-groomers-los-angeles", siteName: "BarkSeeker" },
  alternates: { canonical: "https://www.barkseeker.com/best-of/best-dog-groomers-los-angeles" },
};

export default function BestDogGroomersLosAngeles() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.barkseeker.com/" },
          { "@type": "ListItem", position: 2, name: "Best Of", item: "https://www.barkseeker.com/best-of" },
          { "@type": "ListItem", position: 3, name: "Best Dog Groomers in Los Angeles", item: "https://www.barkseeker.com/best-of/best-dog-groomers-los-angeles" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "How much does dog grooming cost in Los Angeles?", acceptedAnswer: { "@type": "Answer", text: "LA full-service grooming runs roughly $75–200 for small-to-medium dogs and $100–300+ for larger breeds or hand-scissoring. Premium and boutique groomers (Jess Rona, Puppy Prom) charge higher; chains and neighborhood shops run lower. Mobile groomers add a $30–80 travel fee on top of the grooming price." } },
          { "@type": "Question", name: "How often should I groom my dog?", acceptedAnswer: { "@type": "Answer", text: "Most dogs need professional grooming every 4–8 weeks depending on coat type. Doodles, poodles, and other long-coat breeds typically need 4–6 weeks to prevent matting. Short-coat dogs (labs, beagles, boxers) can stretch to 8–12 weeks or rely on home brushing and nail trims between full grooms." } },
          { "@type": "Question", name: "What should I look for in a Los Angeles groomer?", acceptedAnswer: { "@type": "Answer", text: "Look for clear pricing, a visible work area (transparency matters), staff who take time to talk about your dog's temperament, certifications like NDGAA or IPG, and recent 2024+ reviews. LA has a strong mobile-grooming scene — worth considering for anxious dogs or multi-pet households." } },
        ],
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-forest transition">Home</Link><span>/</span>
        <span className="text-gray-400">Best Of</span><span>/</span>
        <span className="text-charcoal font-medium">Best Dog Groomers in Los Angeles</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-4 leading-tight">Best Dog Groomers in Los Angeles &mdash; Top 10 Picks</h1>
      <p className="text-gray-400 text-sm mb-8">Updated April 2026 &middot; 7 min read</p>

      <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-6">
        <p>
          Los Angeles has more quality dog groomers per capita than almost any other American city, ranging from Hollywood boutique salons to mobile vans that come to your driveway. Breed specialists, hand-scissoring experts, cat groomers, anxiety-friendly shops &mdash; the range reflects the city. We&apos;ve pulled the top ten LA groomers by verified rating data (4.5+ stars, minimum 10 reviews, restaurants filtered out). Mobile groomers are especially popular in LA because of traffic and heat &mdash; many of the top-rated practices operate out of a van rather than a storefront. For the full searchable directory of every groomer in the city, head to our <Link href="/groomers" className="text-forest hover:underline font-semibold">groomer directory page</Link> or the <Link href="/california" className="text-forest hover:underline font-semibold">California index</Link>.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">1. Pet Purrspective <span className="text-gray-400 font-normal text-base">&mdash; 5.0&#9733; (55 reviews)</span></h2>
        <p>
          <Link href="/groomers/california-pet-purrspective-rlrm6ky5rk4ai6v4t5kyew" className="text-forest hover:underline font-semibold">Pet Purrspective</Link> in the heart of LA offers both dog and cat grooming with a perfect 5-star rating. Reviewers highlight the gentle approach to anxious pets and the unhurried pace. Address: 5834 Santa Monica Blvd. Call: (323) 600-5913.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">2. Tooth &amp; Nail Pet Care <span className="text-gray-400 font-normal text-base">&mdash; 5.0&#9733; (53 reviews)</span></h2>
        <p>
          <Link href="/groomers/california-tooth-nail-pet-care-55ibcv9agvcmr1pfejynjw" className="text-forest hover:underline font-semibold">Tooth &amp; Nail Pet Care</Link> runs from a Hollywood-area base with a focus on grooming and preventive care. Clean 5-star track record across 53 reviews. Call: (818) 600-1206.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">3. Puppy Prom <span className="text-gray-400 font-normal text-base">&mdash; 5.0&#9733; (32 reviews)</span></h2>
        <p>
          <Link href="/groomers/california-puppy-prom-ruiyazdn8ejlwiq8zfjn-q" className="text-forest hover:underline font-semibold">Puppy Prom</Link> is a West 3rd Street boutique groomer that has built a loyal following for hand-scissoring and breed-specific cuts. Address: 8212 W 3rd St. Call: (323) 317-4971.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">4. Gato Salon <span className="text-gray-400 font-normal text-base">&mdash; 5.0&#9733; (23 reviews)</span></h2>
        <p>
          <Link href="/groomers/california-gato-salon-5-adhnjweectbgujomeqxq" className="text-forest hover:underline font-semibold">Gato Salon</Link> specializes in cat grooming, a rare and valuable specialty &mdash; most generalist groomers don&apos;t take cats. Jefferson Park area. Address: 5360 W Adams Blvd. Call: (213) 212-0023.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">5. Gigi Pet Grooming <span className="text-gray-400 font-normal text-base">&mdash; 5.0&#9733; (16 reviews)</span></h2>
        <p>
          <Link href="/groomers/california-gigi-pet-grooming-1od7tfi7nqmsu76mz0zduw" className="text-forest hover:underline font-semibold">Gigi Pet Grooming</Link> is a Koreatown shop with a consistent 5-star record. Address: 3807 W 3rd St. Call: (213) 915-0002.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">6. PoshPetCare &mdash; West Adams <span className="text-gray-400 font-normal text-base">&mdash; 5.0&#9733; (13 reviews)</span></h2>
        <p>
          <Link href="/groomers/california-poshpetcare-west-adams-0jfmh6kfbdw1up8e7ckugq" className="text-forest hover:underline font-semibold">PoshPetCare</Link> covers full-service grooming plus boarding and daycare on the West Adams side. Address: 5163 W Adams Blvd. Call: (323) 656-7674.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">7. Jess Rona Grooming <span className="text-gray-400 font-normal text-base">&mdash; 5.0&#9733; (13 reviews)</span></h2>
        <p>
          <Link href="/groomers/california-jess-rona-grooming-gf-a1p-ioxo7wh3ccxu1fg" className="text-forest hover:underline font-semibold">Jess Rona Grooming</Link> is the celebrity-groomer spot on North Larchmont &mdash; Jess Rona&apos;s Instagram built a cult following, and the Hancock Park salon books out weeks ahead. Premium pricing matches the reputation. Address: 656 N Larchmont Blvd.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">8. DogsForLoveGrooming <span className="text-gray-400 font-normal text-base">&mdash; 5.0&#9733; (13 reviews)</span></h2>
        <p>
          <Link href="/groomers/california-dogsforlovegrooming-ihx5o01704y8zakwdt5rq" className="text-forest hover:underline font-semibold">DogsForLoveGrooming</Link> is a Hollywood-area groomer with a clean review history. Call: (917) 392-6004.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">9. Doggie&apos;s Groom Mobile <span className="text-gray-400 font-normal text-base">&mdash; 4.9&#9733; (275 reviews)</span></h2>
        <p>
          <Link href="/groomers/california-doggie-s-groom-mobile-nq6yteblkxnfb9o3jdspgq" className="text-forest hover:underline font-semibold">Doggie&apos;s Groom Mobile</Link> is LA&apos;s highest-volume mobile groomer with 275 reviews and a 4.9 average. Vans come to your driveway, ideal for anxious dogs and busy schedules. San Fernando Valley base, serves widely. Call: (310) 922-0283.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">10. Angie&apos;s Pooch Pawlor <span className="text-gray-400 font-normal text-base">&mdash; 4.9&#9733; (102 reviews)</span></h2>
        <p>
          <Link href="/groomers/california-angie-s-pooch-pawlor-b23n2eq0wlpphjnwrm-lpg" className="text-forest hover:underline font-semibold">Angie&apos;s Pooch Pawlor</Link> on Selma Ave has a long Hollywood track record with 102 reviews averaging 4.9 stars. Address: 6709 Selma Ave. Call: (323) 645-7475.
        </p>

        <div className="my-8 rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #C4704B 0%, #D4885B 60%, #5B7B5E 100%)" }}>
          <div className="px-6 py-8 md:py-10">
            <h3 className="font-[Cabin] text-xl md:text-2xl font-bold text-white mb-2">Keep Your Dog&apos;s Coat Healthy Between Grooms</h3>
            <p className="text-white/80 text-sm mb-6 max-w-md">Premium brushes, shampoos, and nail clippers from BabyMyDog &mdash; everything you need to stretch the time between professional sessions.</p>
            <a href="https://babymydog.com/best/dog-grooming" target="_blank" rel="noopener noreferrer" className="inline-block bg-bark hover:bg-bark/90 text-white font-bold text-sm px-6 py-2.5 rounded-lg hover:shadow-lg transition">Shop BabyMyDog Grooming &rarr;</a>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">How to Pick Your LA Groomer</h2>
        <p>
          The right LA groomer is usually within a 15-minute drive (traffic adjusted), specializes in your dog&apos;s coat type, and has a recent review history. For doodles and long-coat breeds, specifically ask about hand-scissoring experience &mdash; the wrong clip can take months to grow out. For anxious or reactive dogs, mobile or one-dog-at-a-time salons are worth the premium. Our <Link href="/blog/how-to-find-good-dog-groomer" className="text-forest hover:underline font-semibold">groomer-finding guide</Link> covers the right questions to ask on the first call.
        </p>

        <p>
          For the full LA groomer directory, see our <Link href="/groomers" className="text-forest hover:underline font-semibold">groomers page</Link>. Already tipping your groomer properly? Our <Link href="/blog/do-you-tip-dog-groomer" className="text-forest hover:underline font-semibold">tipping guide</Link> walks through what&apos;s standard in 2026.
        </p>
      </div>
    </article>
  );
}
