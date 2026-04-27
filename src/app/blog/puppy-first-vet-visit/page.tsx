import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import BlogCletusCallout from "@/components/BlogCletusCallout";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import AffiliateCallout from "@/components/affiliate/AffiliateCallout";
import AffiliateInlineLink from "@/components/affiliate/AffiliateInlineLink";
import { REVIVAL } from "@/data/affiliates/revival";
import type { Metadata } from "next";

const POST_SLUG = "puppy-first-vet-visit";

export const metadata: Metadata = {
  title: "Puppy's First Vet Visit: What to Expect, Timeline, and Vaccines | BarkSeeker",
  description: "Everything about your puppy's first vet visit — when to go, what happens, vaccine schedule, and questions to ask. A complete new puppy owner guide.",
  openGraph: { title: "Puppy's First Vet Visit: What to Expect, Timeline, and Vaccines", url: "https://www.barkseeker.com/blog/puppy-first-vet-visit", siteName: "BarkSeeker" },
  alternates: { canonical: "https://www.barkseeker.com/blog/puppy-first-vet-visit" },
};

export default function PostPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: "Puppy's First Vet Visit: What to Expect, Timeline, and Vaccines", datePublished: "2026-04-15", author: { "@type": "Organization", name: "BarkSeeker" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.barkseeker.com/" }, { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.barkseeker.com/blog" }, { "@type": "ListItem", position: 3, name: "Puppy's First Vet Visit", item: "https://www.barkseeker.com/blog/puppy-first-vet-visit" }] }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "When should a new puppy go to the vet for the first time?", acceptedAnswer: { "@type": "Answer", text: "Schedule your puppy's first vet visit within the first week of bringing them home — ideally within the first 2-3 days. Most puppies come home between 8-12 weeks of age." } }, { "@type": "Question", name: "How much does a puppy's first vet visit cost?", acceptedAnswer: { "@type": "Answer", text: "A puppy's first vet visit typically costs $100-300, including the exam fee ($50-75), initial vaccinations ($20-40 each), deworming ($20-50), and a fecal test ($25-45)." } }, { "@type": "Question", name: "What vaccines does a puppy need?", acceptedAnswer: { "@type": "Answer", text: "Puppies need core vaccines: DHPP (distemper, hepatitis, parvo, parainfluenza) given in a series at 6-8, 10-12, and 14-16 weeks, plus rabies at 12-16 weeks. Non-core vaccines depend on lifestyle and location." } }, { "@type": "Question", name: "How many vet visits does a puppy need in the first year?", acceptedAnswer: { "@type": "Answer", text: "Puppies typically need 3-4 vet visits in the first 16 weeks for their vaccine series, plus a spay/neuter appointment and a 6-month or 1-year checkup — about 5-6 visits total in the first year." } }] }) }} />
      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-forest transition">Home</Link><span>/</span>
        <Link href="/blog" className="hover:text-forest transition">Blog</Link><span>/</span>
        <span className="text-charcoal font-medium">Puppy&apos;s First Vet Visit</span>
      </nav>
      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-4 leading-tight">Puppy&apos;s First Vet Visit: What to Expect, Timeline, and Vaccines</h1>
      <p className="text-gray-400 text-sm mb-4">April 15, 2026 &middot; 8 min read</p>

      <AffiliateDisclosure />

      <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-6">
        <p>
          Bringing home a new puppy is one of life&apos;s greatest joys, and one of your first responsibilities as a new puppy parent is scheduling that crucial first vet visit. This appointment establishes your puppy&apos;s health baseline, kicks off their vaccination schedule, and gives you a trusted partner in your puppy&apos;s healthcare for years to come. Here is everything you need to know about your puppy&apos;s first trip to the vet &mdash; plus the supplies and supplements you&apos;ll want stocked at home before that visit, often available cheaper through <AffiliateInlineLink partner={REVIVAL} linkKey="puppyNeeds" postSlug={POST_SLUG}>Revival Animal Health&apos;s puppy supply category</AffiliateInlineLink> than at your clinic.
        </p>

        <AdSlot position="top" />

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">When to Schedule the First Visit</h2>
        <p>
          Schedule your puppy&apos;s first vet appointment within the first week of bringing them home — ideally within two to three days. This is true regardless of whether the breeder or shelter provided a health certificate. Even a puppy that appears perfectly healthy may have conditions that are not visible to the untrained eye, such as heart murmurs, hernias, parasites, or early signs of illness. If you are adopting from a shelter, many require a vet visit within a specific timeframe as part of the adoption agreement.
        </p>
        <p>
          When choosing a vet, look for one who is experienced with puppies, has flexible appointment availability for the multiple visits your puppy will need, and makes you feel comfortable asking questions. Use our <Link href="/vets" className="text-forest font-semibold hover:underline">vet directory</Link> to find well-reviewed veterinarians near you.
        </p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">What Happens During the First Visit</h2>
        <p>
          The first vet visit is thorough. The veterinarian will perform a complete physical examination, checking your puppy from head to tail. Here is what they evaluate:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Weight and body condition:</strong> Establishing a baseline weight and checking that your puppy is growing appropriately.</li>
          <li><strong>Heart and lungs:</strong> Listening for heart murmurs, abnormal rhythms, or respiratory issues.</li>
          <li><strong>Eyes, ears, and nose:</strong> Checking for infections, discharge, or structural abnormalities.</li>
          <li><strong>Mouth and teeth:</strong> Examining the bite alignment, baby teeth, and gum health.</li>
          <li><strong>Skin and coat:</strong> Looking for parasites, fungal infections like ringworm, or skin conditions.</li>
          <li><strong>Abdomen:</strong> Palpating for hernias, organ abnormalities, or signs of bloating.</li>
          <li><strong>Joints and limbs:</strong> Checking for orthopedic issues like luxating patellas.</li>
        </ul>
        <p>
          The vet will also check for intestinal parasites with a fecal test and begin deworming if needed — most puppies have some level of intestinal parasites. They will start your puppy&apos;s vaccination series and discuss a schedule for upcoming boosters.
        </p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">The Puppy Vaccination Schedule</h2>
        <p>
          Vaccines are the cornerstone of your puppy&apos;s first-year veterinary care. The core vaccination schedule looks like this:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>6 to 8 weeks:</strong> First DHPP vaccine (distemper, hepatitis, parainfluenza, parvovirus).</li>
          <li><strong>10 to 12 weeks:</strong> Second DHPP booster, Leptospirosis (first dose), and possibly Bordetella (kennel cough) if your puppy will attend daycare or training classes.</li>
          <li><strong>12 to 16 weeks:</strong> Rabies vaccine (required by law), third DHPP booster, Leptospirosis booster.</li>
          <li><strong>14 to 16 weeks:</strong> Final DHPP booster to complete the puppy series.</li>
        </ul>
        <p>
          Most pet owners get vaccines administered at the clinic, which is the right call for first-time puppy owners and anyone without veterinary handling experience. Breeders and shelter operators raising multiple litters often source vaccines directly through <AffiliateInlineLink partner={REVIVAL} linkKey="vaccinesDog" postSlug={POST_SLUG}>Revival&apos;s vaccine catalog</AffiliateInlineLink>, where the per-dose pricing is meaningfully lower than retail clinic markup &mdash; useful context if your breeder mentions doing the early shots themselves before transferring the puppy to you.
        </p>

        <div className="bg-amber-50 border-l-4 border-bark p-4 rounded-r-lg">
          <p className="font-semibold text-charcoal mb-1">Keep Your Puppy Safe Before Full Vaccination</p>
          <p className="text-sm text-gray-600">Until your puppy has completed their full vaccine series (around 16 weeks), avoid dog parks, pet stores, and areas where unvaccinated dogs may have been. Parvovirus is extremely contagious and can survive in the environment for months.</p>
        </div>

        <AdSlot position="middle" />

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">What to Bring to the First Visit</h2>
        <p>
          Come prepared to make the most of your first vet appointment. Bring any paperwork from the breeder, shelter, or previous vet — this includes vaccination records, deworming history, and any health certificates. Bring a fresh stool sample in a sealed plastic bag (collected within the last 12 hours) so the vet can run a fecal test immediately. Write down any questions you have about feeding, training, socialization, spay/neuter timing, and parasite prevention. Finally, bring treats to help your puppy form a positive association with the vet&apos;s office.
        </p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Questions to Ask Your Vet</h2>
        <p>
          Your first vet visit is the perfect time to ask important questions:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>What food do you recommend for my puppy&apos;s breed and size?</li>
          <li>How much should my puppy be eating, and how often?</li>
          <li>When should I start heartworm and flea/tick prevention?</li>
          <li>What is the recommended timeline for spaying or neutering?</li>
          <li>Are there any breed-specific health concerns I should watch for?</li>
          <li>When can my puppy safely interact with other dogs and visit public spaces?</li>
          <li>Do you offer puppy wellness packages or payment plans?</li>
        </ul>

        <div className="bg-green-50 border-l-4 border-forest p-4 rounded-r-lg">
          <p className="font-semibold text-charcoal mb-1">Start Pet Insurance Early</p>
          <p className="text-sm text-gray-600">The best time to get pet insurance is when your puppy is young and healthy, before any conditions develop that could be excluded as pre-existing. Many policies can be started as young as 8 weeks old.</p>
        </div>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">First-Year Vet Visit Timeline</h2>
        <p>
          Your puppy will need several vet visits during their first year. After the initial visit, plan on returning every three to four weeks until the vaccination series is complete around 16 weeks. Then your vet will want to see your puppy around six months for a progress check and to discuss spay/neuter timing, and again at one year for their first adult wellness exam and vaccine boosters. In total, expect five to six vet visits in your puppy&apos;s first year, costing a total of approximately $500 to $1,200 depending on your location and the services needed.
        </p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Find the Right Vet for Your New Puppy</h2>
        <p>
          Your puppy&apos;s vet will be your partner in pet parenthood for years to come. Take the time to find one you trust, who communicates clearly, and who makes both you and your puppy feel comfortable. Browse our <Link href="/vets" className="text-forest font-semibold hover:underline">vet directory</Link> to find highly rated veterinarians in your area.
        </p>

        <Link href="/pet-insurance" className="inline-block mt-4 px-6 py-3 rounded-lg font-semibold text-white transition" style={{ backgroundColor: "#E8913A" }}>
          Get Pet Insurance for Your Puppy
        </Link>

        <AffiliateCallout
          partner={REVIVAL}
          linkKey="discount10Off"
          postSlug={POST_SLUG}
          variant="footer"
          heading="First-Time Puppy Owner? $10 Off Your Revival Starter Order"
          body="The first six months bring a long shopping list: dewormers, parasite prevention, immune-support vitamins, training treats, dental supplies. Revival's $10-off-first-order is a low-friction way to get a starter bundle stocked, with free shipping over $149."
          ctaLabel="Claim $10 Off"
        />
      </div>
      <BlogCletusCallout />
    </article>
  );
}
