import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Dog Groomers in New York City — Top 10 Picks | BarkSeeker",
  description: "Top-rated NYC dog groomers: Parker's Doghouse, Good Dog!, Le Pet Spa, Happy Dogs, Walter's Pet Styles. Ratings, addresses, hours, and what to expect.",
  openGraph: { title: "Best Dog Groomers in NYC — Top 10", url: "https://barkseeker.com/best-of/best-dog-groomers-new-york", siteName: "BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/best-of/best-dog-groomers-new-york" },
};

export default function BestDogGroomersNewYork() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://barkseeker.com/" },
          { "@type": "ListItem", position: 2, name: "Best Of", item: "https://barkseeker.com/best-of" },
          { "@type": "ListItem", position: 3, name: "Best Dog Groomers in New York City", item: "https://barkseeker.com/best-of/best-dog-groomers-new-york" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "How much does dog grooming cost in New York City?", acceptedAnswer: { "@type": "Answer", text: "NYC is the most expensive grooming market in the country. Full-service grooming runs $85–250 for small-to-medium dogs and $125–350+ for large breeds or hand-scissoring. Manhattan boutique salons push the upper end; outer-borough shops and chain locations run lower. Mobile groomers add a $50–100 visit fee." } },
          { "@type": "Question", name: "How often should I groom my dog?", acceptedAnswer: { "@type": "Answer", text: "Most dogs need professional grooming every 4–8 weeks depending on coat type. Doodles and long-coat breeds need 4–6 weeks; short-coat breeds can stretch to 8–12 weeks. NYC apartment dogs benefit from more frequent nail trims (pavement wear is low compared to suburbs)." } },
          { "@type": "Question", name: "What should I look for in an NYC groomer?", acceptedAnswer: { "@type": "Answer", text: "Transparent pricing upfront (NYC surprise fees are common), a visible work area where you can see your dog, and recent 2024+ reviews. Location matters — a 40-minute ride with a wet anxious dog is brutal, so prioritize walkable distance. Many top-rated NYC groomers are boutique shops that take one or two dogs at a time." } },
        ],
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-forest transition">Home</Link><span>/</span>
        <span className="text-gray-400">Best Of</span><span>/</span>
        <span className="text-charcoal font-medium">Best Dog Groomers in New York City</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-4 leading-tight">Best Dog Groomers in New York City &mdash; Top 10 Picks</h1>
      <p className="text-gray-400 text-sm mb-8">Updated April 2026 &middot; 7 min read</p>

      <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-6">
        <p>
          NYC grooming is a specialty market: tiny storefronts, boutique one-dog-at-a-time shops, and mobile vans that navigate Manhattan&apos;s chaos. We&apos;ve pulled the top ten NYC groomers by verified rating data (4.5+ stars, minimum 10 reviews, restaurants filtered out). Several are on the spa end of the spectrum with premium pricing; others are neighborhood favorites with decades of loyal clients. The common thread is real track records, not hype. For the full searchable directory of every groomer in the city, head to our <Link href="/groomers" className="text-forest hover:underline font-semibold">groomer directory page</Link> or the <Link href="/new-york" className="text-forest hover:underline font-semibold">New York index</Link>.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">1. Parker&apos;s Doghouse <span className="text-gray-400 font-normal text-base">&mdash; 5.0&#9733; (46 reviews)</span></h2>
        <p>
          <Link href="/groomers/new-york-parker-s-doghouse-z-z5k8mbcilb2mwgbuyaig" className="text-forest hover:underline font-semibold">Parker&apos;s Doghouse</Link> leads NYC groomers with a perfect 5-star rating across 46 reviews. Hell&apos;s Kitchen base. Address: 620 W 42nd St. Call: (347) 675-2179.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">2. Good Dog! Private Pet Grooming <span className="text-gray-400 font-normal text-base">&mdash; 5.0&#9733; (18 reviews)</span></h2>
        <p>
          <Link href="/groomers/new-york-good-dog-private-pet-grooming-eudw2h0kzkvawmfgdnkpjq" className="text-forest hover:underline font-semibold">Good Dog! Private Pet Grooming</Link> is an Upper West Side one-dog-at-a-time boutique &mdash; ideal for anxious pets who do poorly in a crowded salon. Call: (212) 679-6402.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">3. Le Pet Spa <span className="text-gray-400 font-normal text-base">&mdash; 4.9&#9733; (76 reviews)</span></h2>
        <p>
          <Link href="/groomers/new-york-le-pet-spa-funfrflwo-f0sleum3bcgq" className="text-forest hover:underline font-semibold">Le Pet Spa</Link> is the Battery Park City favorite with a solid 76-review track record. Address: 300 Rector Pl, Ste 2. Call: (212) 786-9070.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">4. D is for Doggy Hudson Yards <span className="text-gray-400 font-normal text-base">&mdash; 4.9&#9733; (15 reviews)</span></h2>
        <p>
          <Link href="/groomers/new-york-d-is-for-doggy-hudson-yards-zy5rkczoblzvrcpw3gpulq" className="text-forest hover:underline font-semibold">D is for Doggy Hudson Yards</Link> serves the Hudson Yards and Midtown West corridor. Address: 493 10th Ave. Call: (646) 360-4889.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">5. Barking Budds <span className="text-gray-400 font-normal text-base">&mdash; 4.9&#9733; (15 reviews)</span></h2>
        <p>
          <Link href="/groomers/new-york-barking-budds-yoreflitjadaw5syunkwrg" className="text-forest hover:underline font-semibold">Barking Budds</Link> covers SoHo/Greenwich Village grooming with a perfect-four-nine rating. Call: (917) 396-2768.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">6. Now You&apos;re Clean <span className="text-gray-400 font-normal text-base">&mdash; 4.8&#9733; (29 reviews)</span></h2>
        <p>
          <Link href="/groomers/new-york-now-you-re-clean-sdyvdazffky4ni8lroy-ua" className="text-forest hover:underline font-semibold">Now You&apos;re Clean</Link> is an East Village neighborhood favorite. Address: 279 E 10th St. Call: (332) 257-2376.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">7. Easy Wag <span className="text-gray-400 font-normal text-base">&mdash; 4.8&#9733; (25 reviews)</span></h2>
        <p>
          <Link href="/groomers/new-york-easy-wag-sdcivykjexhnnqkpffqnrg" className="text-forest hover:underline font-semibold">Easy Wag</Link> serves the Financial District with full-service grooming. Address: 124 Nassau St. Call: (347) 495-7578.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">8. Happy Dogs <span className="text-gray-400 font-normal text-base">&mdash; 4.7&#9733; (176 reviews)</span></h2>
        <p>
          <Link href="/groomers/new-york-happy-dogs-tnvnkma6p-0qj9jkweohgq" className="text-forest hover:underline font-semibold">Happy Dogs</Link> has the highest review volume among highly-rated NYC groomers &mdash; 176 reviews across a long track record. East Village location. Address: 403 1st Ave. Call: (212) 532-4220.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">9. MR. CAT <span className="text-gray-400 font-normal text-base">&mdash; 4.7&#9733; (26 reviews)</span></h2>
        <p>
          <Link href="/groomers/new-york-mr-cat-tna5er6q2socshxeo3hjww" className="text-forest hover:underline font-semibold">MR. CAT</Link> specializes in cat grooming, a rare and valuable specialty in NYC. Call: (212) 731-9324.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">10. Walter&apos;s Pet Styles <span className="text-gray-400 font-normal text-base">&mdash; 4.6&#9733; (174 reviews)</span></h2>
        <p>
          <Link href="/groomers/new-york-walter-s-pet-styles-20s9bdd0z3zai6rsmvwfcq" className="text-forest hover:underline font-semibold">Walter&apos;s Pet Styles</Link> is a long-established Murray Hill groomer with 174 reviews averaging 4.6 stars. Reliable go-to for midtown residents. Address: 201-C E 33rd St. Call: (212) 725-0000.
        </p>

        <div className="my-8 rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #C4704B 0%, #D4885B 60%, #5B7B5E 100%)" }}>
          <div className="px-6 py-8 md:py-10">
            <h3 className="font-[Cabin] text-xl md:text-2xl font-bold text-white mb-2">Keep Your Dog&apos;s Coat Healthy Between Grooms</h3>
            <p className="text-white/80 text-sm mb-6 max-w-md">Premium brushes, shampoos, and nail clippers from BabyMyDog &mdash; everything you need to stretch the time between professional sessions.</p>
            <a href="https://babymydog.com/best/dog-grooming" target="_blank" rel="noopener noreferrer" className="inline-block bg-bark hover:bg-bark/90 text-white font-bold text-sm px-6 py-2.5 rounded-lg hover:shadow-lg transition">Shop BabyMyDog Grooming &rarr;</a>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">How to Pick Your NYC Groomer</h2>
        <p>
          Proximity matters more in NYC than almost anywhere else &mdash; a 40-minute cab ride home with a wet anxious dog is a bad day. Prioritize groomers within walking distance of home, ask about breed-specific experience before your first visit, and confirm pricing in advance (NYC has a common habit of upcharges appearing on the invoice). Our <Link href="/blog/how-to-find-good-dog-groomer" className="text-forest hover:underline font-semibold">groomer-finding guide</Link> walks through the full vetting process.
        </p>

        <p>
          For the full NYC groomer directory, see our <Link href="/groomers" className="text-forest hover:underline font-semibold">groomers page</Link>. Worth budgeting for groomer tips? Our <Link href="/blog/do-you-tip-dog-groomer" className="text-forest hover:underline font-semibold">tipping guide</Link> covers the 15-25% standard and when to tip more.
        </p>
      </div>
    </article>
  );
}
