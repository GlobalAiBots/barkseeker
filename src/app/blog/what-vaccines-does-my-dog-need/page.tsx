import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import BlogCletusCallout from "@/components/BlogCletusCallout";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import AffiliateCallout from "@/components/affiliate/AffiliateCallout";
import AffiliateInlineLink from "@/components/affiliate/AffiliateInlineLink";
import { REVIVAL } from "@/data/affiliates/revival";
import type { Metadata } from "next";

const POST_SLUG = "what-vaccines-does-my-dog-need";

export const metadata: Metadata = {
  title: "What Vaccines Does My Dog Need? Core vs. Non-Core Vaccine Guide | BarkSeeker",
  description: "Complete dog vaccination guide — core vs. non-core vaccines, puppy schedule, adult boosters, and costs. Everything you need to know.",
  openGraph: { title: "What Vaccines Does My Dog Need? Core vs. Non-Core Vaccine Guide", url: "https://www.barkseeker.com/blog/what-vaccines-does-my-dog-need", siteName: "BarkSeeker" },
  alternates: { canonical: "https://www.barkseeker.com/blog/what-vaccines-does-my-dog-need" },
};

export default function PostPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: "What Vaccines Does My Dog Need? Core vs. Non-Core Vaccine Guide", datePublished: "2026-04-15", author: { "@type": "Organization", name: "BarkSeeker" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.barkseeker.com/" }, { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.barkseeker.com/blog" }, { "@type": "ListItem", position: 3, name: "What Vaccines Does My Dog Need?", item: "https://www.barkseeker.com/blog/what-vaccines-does-my-dog-need" }] }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What are the core vaccines for dogs?", acceptedAnswer: { "@type": "Answer", text: "Core vaccines required for all dogs are: Rabies, Distemper, Parvovirus, and Adenovirus (Hepatitis). These protect against highly contagious and potentially fatal diseases." } }, { "@type": "Question", name: "How much do dog vaccines cost?", acceptedAnswer: { "@type": "Answer", text: "Individual vaccines typically cost $20-40 each. A puppy's full vaccine series (3-4 visits) costs $150-350 total. Adult booster visits cost $80-150 including the exam fee." } }, { "@type": "Question", name: "Can my dog skip vaccines?", acceptedAnswer: { "@type": "Answer", text: "Core vaccines should not be skipped as the diseases they prevent are serious and potentially fatal. Non-core vaccines can be discussed with your vet based on your dog's lifestyle and risk factors." } }, { "@type": "Question", name: "Do indoor dogs need vaccines?", acceptedAnswer: { "@type": "Answer", text: "Yes. Even indoor dogs need core vaccines. Rabies vaccination is required by law. Diseases like parvovirus can be carried in on shoes and clothing, and any dog could escape outdoors unexpectedly." } }] }) }} />
      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-forest transition">Home</Link><span>/</span>
        <Link href="/blog" className="hover:text-forest transition">Blog</Link><span>/</span>
        <span className="text-charcoal font-medium">What Vaccines Does My Dog Need?</span>
      </nav>
      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-4 leading-tight">What Vaccines Does My Dog Need? Core vs. Non-Core Vaccine Guide</h1>
      <p className="text-gray-400 text-sm mb-4">April 15, 2026 &middot; 8 min read</p>

      <AffiliateDisclosure />

      <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-6">
        <p>
          Vaccines are one of the most important tools in protecting your dog from serious, potentially fatal diseases. But the world of dog vaccinations can be confusing — which vaccines are required, which are optional, and how often does your dog need boosters? This guide breaks down everything you need to know about core and non-core vaccines, schedules, costs, and the science behind keeping your dog protected.
        </p>

        <AffiliateCallout
          partner={REVIVAL}
          linkKey="vaccinesDog"
          postSlug={POST_SLUG}
          variant="hero"
          heading="Vet-Grade Vaccines & Health Supplies from Revival Animal Health"
          body="Revival has supplied breeders, shelters, and veterinarians with vet-grade vaccines, syringes, and post-vaccine support products since 1987. Browse their full canine vaccine and immune-support catalog — the same lineup professional kennels rely on."
          ctaLabel="Shop Vaccines at Revival"
        />

        <AdSlot position="top" />

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Core Vaccines: Required for All Dogs</h2>
        <p>
          Core vaccines are considered essential for every dog regardless of lifestyle, location, or breed. The diseases they prevent are highly contagious, widespread, and often fatal.
        </p>
        <p>
          <strong>Rabies:</strong> Rabies vaccination is required by law in all 50 US states. Rabies is a fatal viral disease that can be transmitted to humans. Puppies receive their first rabies vaccine between 12 and 16 weeks of age. A booster is given one year later, then every one to three years depending on the vaccine type and local laws.
        </p>
        <p>
          <strong>Distemper (CDV):</strong> Canine distemper is a severe, often fatal virus that attacks the respiratory, gastrointestinal, and nervous systems. It spreads through airborne exposure and is highly contagious. There is no cure — only supportive care — making vaccination critical.
        </p>
        <p>
          <strong>Parvovirus (CPV):</strong> Parvo is one of the most feared canine diseases. It is extremely contagious, survives in the environment for months, and is often fatal in puppies. Symptoms include severe bloody diarrhea, vomiting, and dehydration. Treatment costs $2,000 to $5,000+ with no guarantee of survival — making the $25 vaccine one of the best investments in your dog&apos;s health.
        </p>
        <p>
          <strong>Adenovirus/Hepatitis (CAV-2):</strong> Canine adenovirus type 2 protects against infectious canine hepatitis, which affects the liver, kidneys, and blood vessels. The CAV-2 vaccine also provides some cross-protection against respiratory disease.
        </p>

        <div className="bg-green-50 border-l-4 border-forest p-4 rounded-r-lg">
          <p className="font-semibold text-charcoal mb-1">The DHPP Combination Vaccine</p>
          <p className="text-sm text-gray-600">Distemper, Hepatitis (Adenovirus), Parainfluenza, and Parvovirus are typically given together as a single combination shot called DHPP or DA2PP. This reduces the number of injections your dog needs while providing comprehensive core protection.</p>
        </div>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Non-Core Vaccines: Based on Lifestyle and Risk</h2>
        <p>
          Non-core vaccines are recommended based on your dog&apos;s individual risk factors — where they live, their activities, and their exposure to other dogs. Discuss these with your <Link href="/vets" className="text-forest font-semibold hover:underline">veterinarian</Link> to determine which are appropriate for your dog.
        </p>
        <p>
          <strong>Bordetella (Kennel Cough):</strong> Highly recommended for dogs that attend daycare, boarding, grooming salons, dog parks, or training classes. Bordetella causes a hacking cough that is highly contagious but rarely life-threatening in healthy adult dogs. Most boarding facilities and daycares require it.
        </p>
        <p>
          <strong>Leptospirosis:</strong> Recommended for dogs in areas where Leptospirosis is prevalent — particularly near bodies of water, farms, or wildlife. Lepto is a bacterial disease that can cause kidney and liver failure and can be transmitted to humans. Many vets now consider this semi-core due to increasing prevalence.
        </p>
        <p>
          <strong>Canine Influenza (H3N2 and H3N8):</strong> Recommended for dogs with high social exposure, especially in areas with recent outbreaks. Canine flu spreads rapidly in group settings and can cause serious respiratory illness.
        </p>
        <p>
          <strong>Lyme Disease:</strong> Recommended for dogs living in or traveling to tick-endemic areas, particularly the Northeast, upper Midwest, and Pacific Coast. Lyme disease can cause joint pain, kidney damage, and chronic illness.
        </p>

        <AdSlot position="middle" />

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Vaccination Schedule</h2>
        <p>
          The vaccination schedule differs for puppies and adult dogs:
        </p>
        <p>
          <strong>Puppy Schedule:</strong> Puppies receive a series of DHPP vaccinations starting at 6 to 8 weeks, with boosters every 3 to 4 weeks until 16 weeks of age (typically three to four total doses). Rabies is given once between 12 and 16 weeks. Non-core vaccines like Bordetella and Leptospirosis are started during this period if recommended.
        </p>
        <p>
          <strong>Adult Booster Schedule:</strong> After completing the puppy series, dogs receive a booster at one year of age, then every one to three years depending on the vaccine. Rabies boosters follow local law requirements — typically every one or three years. DHPP boosters are given every three years after the one-year booster. Non-core vaccines may need annual boosters.
        </p>

        <div className="bg-amber-50 border-l-4 border-bark p-4 rounded-r-lg">
          <p className="font-semibold text-charcoal mb-1">Titer Testing as an Alternative</p>
          <p className="text-sm text-gray-600">Titer testing measures your dog&apos;s antibody levels to determine if they still have adequate immunity from previous vaccinations. Some owners use titer testing to avoid unnecessary boosters. Discuss this option with your vet — it costs $100-200 per test and is not accepted as a rabies vaccine substitute in any state.</p>
        </div>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Vaccine Costs</h2>
        <p>
          Vaccination is one of the most affordable forms of preventive care. Individual vaccines typically cost $20 to $40 per injection. A complete puppy vaccination series across three to four visits costs approximately $150 to $350 total. Adult booster visits, including the exam fee, run $80 to $150. Low-cost vaccination clinics are available in many areas and can reduce costs further, though they do not provide the comprehensive exam that a full vet visit includes. Beyond the shots themselves, baseline immune support &mdash; balanced multivitamins, omega-3s, and a stable gut &mdash; helps your dog build a strong vaccine response. <AffiliateInlineLink partner={REVIVAL} linkKey="vitaminsGeneral" postSlug={POST_SLUG}>Revival&apos;s general health and vitamin catalog</AffiliateInlineLink> covers the supportive products most vets recommend alongside a regular vaccination schedule.
        </p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Keeping Your Dog Protected</h2>
        <p>
          Vaccinations are one of the simplest and most cost-effective ways to protect your dog from devastating diseases. Work with your <Link href="/vets" className="text-forest font-semibold hover:underline">veterinarian</Link> to create a vaccination plan tailored to your dog&apos;s age, breed, lifestyle, and geographic risk factors. Keep vaccination records organized and up to date — you will need them for boarding, daycare, grooming, and travel.
        </p>

        <Link href="/pet-insurance" className="inline-block mt-4 px-6 py-3 rounded-lg font-semibold text-white transition" style={{ backgroundColor: "#E8913A" }}>
          Protect Your Dog with Pet Insurance
        </Link>

        <AffiliateCallout
          partner={REVIVAL}
          linkKey="discount10Off"
          postSlug={POST_SLUG}
          variant="footer"
          heading="New to Revival? Save $10 on Your First Order"
          body="If you're stocking vaccine-adjacent supplies (syringes, immune-support vitamins, dewormers) directly rather than paying clinic markups, Revival's $10-off-first-order is a low-friction way to get started, with free shipping over $149."
          ctaLabel="Claim $10 Off"
        />
      </div>
      <BlogCletusCallout />
    </article>
  );
}
