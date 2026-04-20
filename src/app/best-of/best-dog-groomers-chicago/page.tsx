import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Dog Groomers in Chicago — Top 10 Picks | BarkSeeker",
  description: "Top-rated Chicago dog groomers: Chicago Packtive, Aeslin Pup Hub, Tucker Pup's, Found Chicago, Salon Dog. Ratings, addresses, hours, and what to expect.",
  openGraph: { title: "Best Dog Groomers in Chicago — Top 10", url: "https://www.barkseeker.com/best-of/best-dog-groomers-chicago", siteName: "BarkSeeker" },
  alternates: { canonical: "https://www.barkseeker.com/best-of/best-dog-groomers-chicago" },
};

export default function BestDogGroomersChicago() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.barkseeker.com/" },
          { "@type": "ListItem", position: 2, name: "Best Of", item: "https://www.barkseeker.com/best-of" },
          { "@type": "ListItem", position: 3, name: "Best Dog Groomers in Chicago", item: "https://www.barkseeker.com/best-of/best-dog-groomers-chicago" },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "How much does dog grooming cost in Chicago?", acceptedAnswer: { "@type": "Answer", text: "Chicago full-service grooming runs roughly $60–150 for small-to-medium dogs and $90–225+ for large breeds or hand-scissoring. Pricing varies significantly by neighborhood — Gold Coast and Lincoln Park run higher than outer neighborhoods. Mobile groomers add a $40–80 visit fee." } },
          { "@type": "Question", name: "How often should I groom my dog?", acceptedAnswer: { "@type": "Answer", text: "Most dogs need professional grooming every 4–8 weeks depending on coat type. Chicago winters are especially hard on double-coat breeds — undercoat removal in spring and fall is critical. Salt and snow also mean more frequent baths from November through March, so stretching between full grooms is harder in winter." } },
          { "@type": "Question", name: "What should I look for in a Chicago groomer?", acceptedAnswer: { "@type": "Answer", text: "Pick a groomer within your neighborhood or the immediate next one over — Chicago winters make long drives with a wet dog particularly unpleasant. Look for transparent pricing, recent 2024+ reviews, and experience with your dog's breed. The best groomers in Chicago combine grooming with daycare or boarding, which is useful for working pet owners." } },
        ],
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-forest transition">Home</Link><span>/</span>
        <span className="text-gray-400">Best Of</span><span>/</span>
        <span className="text-charcoal font-medium">Best Dog Groomers in Chicago</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-4 leading-tight">Best Dog Groomers in Chicago &mdash; Top 10 Picks</h1>
      <p className="text-gray-400 text-sm mb-8">Updated April 2026 &middot; 7 min read</p>

      <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-6">
        <p>
          Chicago grooming runs heavy on neighborhood-specific shops with deep community ties &mdash; Lakeview, Wicker Park, Lincoln Square, and Logan Square each have loyal groomer bases. The city also has one of the largest combination groomer/daycare/boarding operations in the country (Tucker Pup&apos;s), which is a practical win for working pet owners. We&apos;ve pulled the top ten Chicago groomers by verified rating data (4.5+ stars, minimum 10 reviews, restaurants filtered out). All real groomers &mdash; we ran a fresh Yelp category-filtered query to eliminate the restaurant contamination that affected older lists. For the full searchable directory of every groomer in the city, head to our <Link href="/groomers" className="text-forest hover:underline font-semibold">groomer directory page</Link> or the <Link href="/illinois" className="text-forest hover:underline font-semibold">Illinois index</Link>.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">1. Chicago Packtive <span className="text-gray-400 font-normal text-base">&mdash; 5.0&#9733; (29 reviews)</span></h2>
        <p>
          <Link href="/groomers/illinois-chicago-packtive-ttks2fu4ibyjxp-arrsi3w" className="text-forest hover:underline font-semibold">Chicago Packtive</Link> leads Chicago groomers with a perfect 5-star rating. West Side base, covers daycare and grooming. Address: 315 S California Ave. Call: (708) 415-0290.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">2. Purrvana Chicago <span className="text-gray-400 font-normal text-base">&mdash; 5.0&#9733; (12 reviews)</span></h2>
        <p>
          <Link href="/groomers/illinois-purrvana-chicago-billneltaoazap4c54zlyq" className="text-forest hover:underline font-semibold">Purrvana Chicago</Link> specializes in cat grooming &mdash; a rare and valuable specialty. Lakeview base. Call: (773) 800-7877.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">3. Aeslin Pup Hub Noble Square <span className="text-gray-400 font-normal text-base">&mdash; 4.9&#9733; (34 reviews)</span></h2>
        <p>
          <Link href="/groomers/illinois-aeslin-pup-hub-noble-square-n-hii3bxi8aw0twyzx-r-g" className="text-forest hover:underline font-semibold">Aeslin Pup Hub Noble Square</Link> is a Noble Square/West Town favorite with a strong review track. Address: 1448 W Chicago Ave. Call: (312) 374-3957.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">4. Bow Wow Barkery <span className="text-gray-400 font-normal text-base">&mdash; 4.9&#9733; (11 reviews)</span></h2>
        <p>
          <Link href="/groomers/illinois-bow-wow-barkery-97ebnajthh5no2ck5kwlyg" className="text-forest hover:underline font-semibold">Bow Wow Barkery</Link> is a Bridgeport-area groomer with a clean review history. Address: 3401 S Lituanica Ave. Call: (872) 228-9691.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">5. Sit Social <span className="text-gray-400 font-normal text-base">&mdash; 4.8&#9733; (81 reviews)</span></h2>
        <p>
          <Link href="/groomers/illinois-sit-social-a4hqmmhmgtgvhzmqhnb63a" className="text-forest hover:underline font-semibold">Sit Social</Link> combines grooming and daycare in Lakeview with 81 reviews. Address: 3221 N Clark St. Call: (773) 531-0308.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">6. All Star Pet Care <span className="text-gray-400 font-normal text-base">&mdash; 4.8&#9733; (77 reviews)</span></h2>
        <p>
          <Link href="/groomers/illinois-all-star-pet-care-m5mjf02s8fbzpd4ar7qndw" className="text-forest hover:underline font-semibold">All Star Pet Care</Link> serves Logan Square with full-service grooming and a 77-review track record. Address: 3267 W Armitage. Call: (773) 234-7762.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">7. DoggieWorks <span className="text-gray-400 font-normal text-base">&mdash; 4.8&#9733; (46 reviews)</span></h2>
        <p>
          <Link href="/groomers/illinois-doggieworks-zl4fuk1orxagnl-jfc6zba" className="text-forest hover:underline font-semibold">DoggieWorks</Link> is a Lakeview East groomer with a 46-review track record. Address: 2338 W Nelson St. Call: (773) 697-7339.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">8. Tucker Pup&apos;s Pet Resort <span className="text-gray-400 font-normal text-base">&mdash; 4.7&#9733; (987 reviews)</span></h2>
        <p>
          <Link href="/groomers/illinois-tucker-pup-s-pet-resort-lhz7tg9ddwjoc4ummltunw" className="text-forest hover:underline font-semibold">Tucker Pup&apos;s Pet Resort</Link> is the highest-volume highly-rated operation in Chicago &mdash; 987 reviews across grooming, daycare, and boarding. Fulton Market area. Address: 219 N Carpenter St. Call: (312) 829-8787.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">9. Found Chicago Boarding and Training Center <span className="text-gray-400 font-normal text-base">&mdash; 4.7&#9733; (267 reviews)</span></h2>
        <p>
          <Link href="/groomers/illinois-found-chicago-boarding-and-training-center-mi5zgrypreukw0hkcio7cg" className="text-forest hover:underline font-semibold">Found Chicago</Link> combines grooming with training and boarding in Ravenswood. 267-review track. Address: 4108A N Rockwell St. Call: (773) 539-3880.
        </p>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">10. Salon Dog <span className="text-gray-400 font-normal text-base">&mdash; 4.7&#9733; (168 reviews)</span></h2>
        <p>
          <Link href="/groomers/illinois-salon-dog-bu9iw43afs7wshae3aipjq" className="text-forest hover:underline font-semibold">Salon Dog</Link> is a Logan Square classic with 168 reviews and a loyal local base. Address: 2542 W Fullerton Ave. Call: (773) 799-8889.
        </p>

        <div className="my-8 rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #C4704B 0%, #D4885B 60%, #5B7B5E 100%)" }}>
          <div className="px-6 py-8 md:py-10">
            <h3 className="font-[Cabin] text-xl md:text-2xl font-bold text-white mb-2">Keep Your Dog&apos;s Coat Healthy Between Grooms</h3>
            <p className="text-white/80 text-sm mb-6 max-w-md">Premium brushes, shampoos, and paw balm from BabyMyDog &mdash; especially useful for Chicago winters where salt and snow wreck paws and coats.</p>
            <a href="https://babymydog.com/best/dog-grooming" target="_blank" rel="noopener noreferrer" className="inline-block bg-bark hover:bg-bark/90 text-white font-bold text-sm px-6 py-2.5 rounded-lg hover:shadow-lg transition">Shop BabyMyDog Grooming &rarr;</a>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4 font-[Cabin]">How to Pick Your Chicago Groomer</h2>
        <p>
          Stay in your neighborhood or the immediate next one over. Chicago winters make long drives with a wet dog especially unpleasant, and summer humidity creates similar issues. Confirm pricing upfront, ask about the deshed routine if you have a double-coat breed, and check for recent 2024+ reviews. Groomer-plus-daycare combos (Tucker Pup&apos;s, Found Chicago, Sit Social) are worth considering for working pet owners. Our <Link href="/blog/how-to-find-good-dog-groomer" className="text-forest hover:underline font-semibold">groomer-finding guide</Link> walks through the full vetting process.
        </p>

        <p>
          For the full Chicago groomer directory, see our <Link href="/groomers" className="text-forest hover:underline font-semibold">groomers page</Link>. Our <Link href="/blog/do-you-tip-dog-groomer" className="text-forest hover:underline font-semibold">tipping guide</Link> covers what&apos;s standard in 2026 (15-25%).
        </p>
      </div>
    </article>
  );
}
