"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { allGroomers, stateNames, stateSlugs } from "@/data/all-groomers";
import AdSlot from "@/components/AdSlot";
import CletusAd from "@/components/CletusAd";
import PartnerCard from "@/components/affiliate/PartnerCard";
import AffiliateInlineLink from "@/components/affiliate/AffiliateInlineLink";
import { REVIVAL } from "@/data/affiliates/revival";

const stateList = Object.entries(stateSlugs)
  .map(([abbr, slug]) => ({ abbr, slug, name: stateNames[abbr] || abbr }))
  .sort((a, b) => a.name.localeCompare(b.name));

export default function GroomersDirectory() {
  const [search, setSearch] = useState("");

  const stateCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const g of allGroomers) map[g.stateAbbr] = (map[g.stateAbbr] || 0) + 1;
    return map;
  }, []);

  const statesWithData = useMemo(() => stateList.filter((s) => (stateCounts[s.abbr] || 0) > 0), [stateCounts]);

  const [expanded, setExpanded] = useState(false);

  const sortedByCount = useMemo(
    () => [...statesWithData].sort((a, b) => (stateCounts[b.abbr] || 0) - (stateCounts[a.abbr] || 0)),
    [statesWithData, stateCounts]
  );

  const isSearching = search.length >= 2;
  const searchResults = useMemo(
    () => statesWithData.filter((s) => s.name.toLowerCase().includes(search.toLowerCase())),
    [statesWithData, search]
  );

  const displayStates = isSearching ? searchResults : sortedByCount;
  const showToggle = !isSearching && sortedByCount.length > 15;

  const faqItems = [
    { q: "How do I find a good dog groomer near me?", a: `BarkSeeker lists ${allGroomers.length.toLocaleString()} dog groomers across all 50 states. Browse by state or city to find top-rated groomers.` },
    { q: "How much does dog grooming cost?", a: "Dog grooming typically costs $30-$90. Full packages with bath, haircut, nail trim, and ear cleaning run $60-$150+." },
    { q: "How often should I get my dog groomed?", a: "Most dogs need professional grooming every 4-8 weeks. Long-coated breeds may need it every 4-6 weeks." },
    { q: "What should I look for in a groomer?", a: "Positive reviews, certifications (NDGAA/IPG), clean facilities, and experience with your breed." },
    { q: "Do groomers need to be licensed?", a: "Requirements vary by state. Many professional groomers hold NDGAA or IPG certifications." },
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Choose the Right Dog Groomer: A Complete Guide",
    description: "Comprehensive guide to choosing a dog groomer — certifications, environment evaluation, breed expertise, costs, mobile vs salon, red flags, and decision frameworks.",
    author: { "@type": "Organization", name: "BarkSeeker", url: "https://www.barkseeker.com" },
    publisher: { "@type": "Organization", name: "BarkSeeker", url: "https://www.barkseeker.com" },
    datePublished: "2026-04-27",
    dateModified: "2026-04-27",
    mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.barkseeker.com/groomers" },
    articleSection: "Pet Services",
    keywords: ["how to find a good dog groomer", "dog grooming certifications", "NDGAA certification", "mobile grooming vs salon", "dog grooming cost", "questions to ask a groomer"],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqItems.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      <section className="relative min-h-[45vh] md:min-h-[55vh] flex flex-col items-center justify-center overflow-hidden">
        <img src="/images/poodle-professional-grooming-salon.jpg" alt="Professional dog groomer styling a poodle in a grooming salon" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,58,42,0.88) 0%, rgba(26,58,42,0.45) 50%, rgba(26,58,42,0.15) 100%)' }} />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto py-16">
          <p className="text-white/70 text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Dog Groomer Directory</p>
          <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-white leading-tight max-w-3xl mx-auto" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>Find Dog Groomers Near You</h1>
          <p className="text-white/85 mt-4 max-w-lg mx-auto" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}>{allGroomers.length.toLocaleString()} dog groomers across the United States. Find top-rated groomers with reviews, contact info, and directions.</p>
        </div>
      </section>

      {/* Trust Signal */}
      <section className="py-3 text-center" style={{ background: '#F0FFF4' }}>
        <p className="text-forest font-bold text-sm tracking-wide font-[Cabin]">&#11088; {allGroomers.length.toLocaleString()} Groomers Across {statesWithData.length} States &mdash; Free Forever</p>
      </section>

      {/* Article HEADER — H1 + intro paragraphs above state grid */}
      <article id="choose-a-groomer" className="max-w-3xl mx-auto px-4 pt-12 pb-8">
        <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-6 leading-tight">How to Choose the Right Dog Groomer: A Complete Guide</h1>
        <div className="text-gray-700 leading-relaxed space-y-5">
          <p>The relationship you build with a dog groomer is more intimate than most pet-related relationships. Outside of your veterinarian, no one else handles your dog as physically, as frequently, or as solo as a groomer does. Bath, brush-out, nail trim, ear clean, full coat work, sometimes dental scaling &mdash; all of it happens behind salon doors, often with you not present. Done well, professional grooming is genuinely good for dogs: it catches early skin issues, parasites, lumps, ear infections, and dental problems that owners frequently miss between vet visits. Done poorly, it traumatizes dogs in ways that take months or years to recover from, and occasionally causes injuries serious enough to require emergency care.</p>
          <p>The difficulty is that dog grooming is largely unregulated in the United States. No state requires a license to call yourself a groomer, and quality varies enormously across practitioners. Some are highly-trained professionals who hold national certifications, attend industry conferences, and have decades of breed-specific experience. Others learned from YouTube and a bottle of shampoo. Both can charge similar prices and post similar online photos.</p>
          <p>Below is BarkSeeker&apos;s directory of professional groomers across all 50 states. The complete guide continues below the directory, covering the certifications that matter, what an evaluable salon environment looks like, breed-specific expertise, fair pricing, and the red flags that should send you elsewhere.</p>
        </div>
      </article>

      <section className="max-w-5xl mx-auto px-4 py-6">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-6">Browse Groomers by State</h2>
        {statesWithData.length > 10 && (
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search states..." className="w-full max-w-md px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-forest transition mb-6" />
        )}
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 ${showToggle ? "mb-6" : "mb-12"}`}>
          {displayStates.map((s, index) => {
            const hideThis = !isSearching && !expanded && index >= 15;
            return (
              <Link key={s.abbr} href={`/groomers/${s.slug}`} className={`group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all${hideThis ? " hidden" : ""}`}>
                <p className="font-bold text-charcoal group-hover:text-forest transition text-sm">{s.name}</p>
                <p className="text-gray-400 text-xs mt-1">{(() => { const c = stateCounts[s.abbr] || 0; return c === 1 ? "1 groomer" : `${c.toLocaleString()} groomers`; })()}</p>
              </Link>
            );
          })}
        </div>
        {showToggle && (
          <div className="text-center mb-12">
            <button onClick={() => setExpanded(!expanded)} className="text-bark hover:text-bark-dark font-semibold text-sm transition">
              {expanded ? "Show fewer ↑" : `Show all ${sortedByCount.length} states ↓`}
            </button>
          </div>
        )}

        <AdSlot position="groomers-mid" />

        {/* BabyMyDog Promo */}
        <div className="my-8 rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #C4704B 0%, #D4885B 60%, #5B7B5E 100%)" }}>
          <div className="px-6 py-8 md:py-10">
            <h3 className="font-[Cabin] text-xl md:text-2xl font-bold text-white mb-2">Groom Your Dog at Home with BabyMyDog</h3>
            <p className="text-white/80 text-sm mb-6 max-w-md">Premium dog grooming products &mdash; shampoos, brushes, nail clippers, and more.</p>
            <a href="https://babymydog.com" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-[#C4704B] font-bold text-sm px-6 py-2.5 rounded-lg hover:shadow-lg transition">Shop BabyMyDog &rarr;</a>
          </div>
        </div>
      </section>

      {/* Article CONTINUATION — H2 sections below state grid */}
      <article className="max-w-3xl mx-auto px-4 py-12">
        <div className="border-t border-bark/30 pt-6 mb-8">
          <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold font-[Cabin]">Complete Guide Continues</p>
        </div>
        <div className="text-gray-700 leading-relaxed space-y-5">

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-2 mb-3">Why Choosing Carefully Matters</h2>
          <p>The grooming industry sits in an unusual regulatory gap. Veterinarians require state licenses, dentists require state licenses, hair stylists for humans require state licenses &mdash; but in most US states, anyone can open a dog grooming business with no formal training, no certification, no health department oversight, and no required apprenticeship. Even states with grooming-specific laws (a small minority) typically regulate facility cleanliness rather than the groomer&apos;s actual skills.</p>
          <p>This is why the gap between the best and worst groomers is so wide. The best are professionals who treat their work as a craft: they read continuing education materials, attend trade conferences (GroomExpo, Hershey, PetQuest), pursue national certifications, and often specialize in particular breed groups or behavioral profiles. The worst learned by watching online videos and figured the rest out on someone&apos;s anxious cocker spaniel.</p>
          <p>For owners, this means due diligence isn&apos;t optional. Reviews and price points alone won&apos;t separate professionals from amateurs. Asking specific questions about training, certifications, and methodology &mdash; and noticing how confidently those questions get answered &mdash; is how you separate the two. <Link href="/blog/how-to-find-good-dog-groomer" className="text-forest hover:underline font-semibold">Our complete guide on finding a good dog groomer</Link> goes deeper into the specific signals worth checking before you book a first appointment.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Grooming Certifications and Training</h2>
          <p>Three national bodies issue meaningful grooming certifications in the United States, and the credentials are worth knowing.</p>
          <p>The National Dog Groomers Association of America (NDGAA) offers three certification levels: National Certified Groomer (NCG) at the entry level, National Certified Master Groomer (NCMG) at the advanced level, and Specialty Certification for groomers who want to demonstrate breed-specific or skill-specific expertise. NCMG status requires passing both written exams and practical evaluations across multiple breed groups (sporting, terriers, non-sporting, working) and is genuinely difficult &mdash; most working groomers never pursue it.</p>
          <p>International Professional Groomers (IPG) offers a similar Master Groomer certification with international recognition. The Pet Stylist Association maintains its own certification track focused on creative and breed-standard styling. Each of these organizations requires both written knowledge and demonstrated practical skills, and certified groomers typically display their credentials prominently.</p>
          <p>The most important question to ask: how did the groomer learn? There are two main paths. Grooming schools (typically 4 to 12 weeks of formal coursework) teach fundamentals quickly but in a controlled environment. Apprenticeships (typically 6 to 24 months working under an experienced groomer) take longer but expose new groomers to the full range of dog temperaments, coat conditions, and edge cases that a school cannot replicate. Apprenticeship-trained groomers often handle anxious or difficult dogs better simply because they&apos;ve seen more of them. The best groomers have done both.</p>
          <p>Continuing education is the most overlooked signal. Grooming techniques, products, and best practices evolve quickly &mdash; particularly around handling anxious dogs, working with seniors, and managing skin conditions. Groomers who attend industry conferences, take online courses, and stay current with breed clubs are noticeably better than those who haven&apos;t expanded their knowledge in a decade. If a groomer can&apos;t name a recent course, conference, or technique they&apos;ve learned, that&apos;s information.</p>
          <p>Specialty experience matters when your dog has specific needs. Anxious dogs, senior dogs, dogs with mobility issues, and dogs with skin conditions all benefit from a groomer with experience in those situations. Ask directly &mdash; most groomers will be honest about what they&apos;re comfortable handling.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Evaluating the Grooming Environment</h2>
          <p>Visit a salon before booking, even briefly. The environment tells you a lot in five minutes.</p>
          <p>Sanitation between dogs is non-negotiable. Tools (clippers, blades, scissors, brushes) should be sanitized between every dog. Tables and surfaces should be wiped down. Bathing tubs should be cleaned between baths, not just rinsed. Any salon that&apos;s casual about this is one to avoid &mdash; kennel cough, ringworm, fleas, and skin infections all spread through dirty equipment.</p>
          <p>Climate control matters more than most owners realize. Grooming salons get hot from running dryers and tubs. Anxious dogs, brachycephalic breeds (pugs, bulldogs, boxers), and seniors all stress under heat in ways that can become medically serious. A well-ventilated, climate-controlled space is the standard. Hot, stuffy salons signal a place that hasn&apos;t invested in basic comfort.</p>
          <p>Restraint methods reveal philosophy. Grooming nooses (a soft loop around the neck) are standard and humane when used correctly &mdash; they prevent dogs from jumping off tables and getting injured. Belly straps for nervous dogs add stability and can be appropriate when properly fitted. The clear red flag is restraint that bears the dog&apos;s weight: hammocks, slings, or rigs that suspend a dog. These have caused injuries and aren&apos;t necessary for any standard grooming task.</p>
          <p>Visibility matters too. Salons that allow you to observe grooming through windows or open doorways generally have nothing to hide. Salons that strictly forbid observation, especially without a clear safety reason, raise reasonable questions about why.</p>
          <p>Single-dog versus multi-dog operation is a meaningful distinction. Single-dog salons (one groomer, one dog at a time) tend to be more attentive and less stressful, particularly for anxious dogs, but cost more. Multi-dog operations move faster and cost less and may be fine for confident social dogs. Neither is inherently better &mdash; but the choice should match your dog&apos;s personality. For some dogs, the entire calculus shifts toward mobile grooming, which avoids the salon environment entirely. <Link href="/blog/mobile-dog-grooming-pros-cons" className="text-forest hover:underline font-semibold">Our guide comparing mobile and salon grooming</Link> covers when each makes sense.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Discussing Your Dog&apos;s Specific Needs</h2>
          <p>Breed-specific grooming knowledge is what separates professionals from generalists. A goldendoodle teddy bear cut, a schnauzer schnauzer trim, a poodle Continental, a Westie pluck, a cocker spaniel pet trim, a Yorkie puppy cut, a wire fox terrier hand-strip &mdash; each of these requires real technique, and a groomer who tries them without training produces dogs that look generically clipped rather than properly styled. <Link href="/blog/dog-grooming-by-breed" className="text-forest hover:underline font-semibold">Our guide to grooming by breed</Link> covers the specific cuts and frequencies for the most common breeds.</p>
          <p>Coat condition matters going in. Heavily matted dogs often require shave-down rather than de-matting &mdash; humane de-matting on severe matting can take hours and is more painful for the dog than a clipper-down. A good groomer will tell you honestly when a shave is the better choice rather than charging extra to brush out something that should be cut off.</p>
          <p>Skin sensitivities should be discussed before the appointment. Hypoallergenic, oatmeal-based, or medicated shampoos exist for dogs with allergies, hot spots, or yeast issues &mdash; but only if the groomer knows to use them. Dogs with chronic skin conditions often do better at salons that have experience with veterinary shampoos and prescription products.</p>
          <p>Anxiety triggers vary by dog. Some hate clipper noise, others freeze around dryers, some panic at water, some cannot tolerate restraint. A professional groomer will ask about these upfront and adjust accordingly &mdash; using quieter clippers, towel-drying instead of forced air drying, or breaking the appointment into multiple shorter sessions. For genuinely anxious dogs, <Link href="/blog/dog-grooming-for-anxious-dogs" className="text-forest hover:underline font-semibold">our anxiety-specific grooming guide</Link> covers techniques and questions to use when finding a fear-free groomer.</p>
          <p>Medical considerations &mdash; recent surgery, senior mobility issues, chronic conditions &mdash; should always be communicated. Don&apos;t try to surprise the groomer.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Understanding Grooming Costs</h2>
          <p>Pricing for professional dog grooming has a wider range than most owners expect, and price alone is not a reliable quality signal &mdash; but understanding the structure helps you spot both bargains and overcharges.</p>
          <p>Standard full grooming packages typically include a bath, brush-out, nail trim, ear cleaning, basic haircut, and sanitary trim around the eyes, paws, and rear. By dog size:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
            <li>Small breeds (under 20 lbs): $40 to $80 typical, more in major cities</li>
            <li>Medium breeds (20 to 50 lbs): $60 to $120</li>
            <li>Large breeds (50 to 80 lbs): $80 to $150</li>
            <li>Giant breeds (80+ lbs): $90 to $200, sometimes more for double-coated giants like Newfoundlands and Pyrenees</li>
          </ul>
          <p>Specialty cuts (poodle Continental, Bichon styling, hand-stripped breeds) typically run 20 to 40 percent above standard package prices because they require significantly more time and skill. <Link href="/blog/puppy-first-grooming-appointment" className="text-forest hover:underline font-semibold">Puppy first-groom appointments</Link> are often discounted ($25 to $50) as introduction sessions, which is reasonable &mdash; they&apos;re shorter and less involved than full grooms.</p>
          <p>Common add-ons include de-shedding treatments ($15 to $35), teeth brushing ($5 to $15), anal gland expression ($10 to $20), de-matting fees (typically charged in 15-minute increments at $15 to $25 per increment), medicated shampoos ($10 to $25 above standard), and creative grooming or coloring ($20 to $60+). <Link href="/blog/how-much-does-dog-grooming-cost" className="text-forest hover:underline font-semibold">Our complete grooming cost guide</Link> breaks these down further with regional variation.</p>
          <p>The cheapest groomer in your area is rarely the right choice. Aggressively low pricing usually means rushed cuts, lower-quality products, cookie-cutter styles regardless of breed, and groomers paid hourly rather than by service (which incentivizes speed over quality).</p>
          <p>Between professional appointments, basic at-home maintenance can extend the time between salon visits and keep your dog more comfortable. Quality shampoos, ear cleansers, brushes, and nail tools &mdash; particularly the medicated and pro-grade products groomers themselves use &mdash; are typically available from veterinary suppliers like <AffiliateInlineLink partner={REVIVAL} linkKey="grooming" postSlug="groomers-hub">Revival Animal Health&apos;s grooming category</AffiliateInlineLink> at noticeably lower prices than retail bottles, often 25 to 40 percent less for the same formulations. For owners building a serious between-visits kit, vet-grade ear cleaner and dematting tools are particularly worth having at home. Tipping is its own etiquette question &mdash; <Link href="/blog/do-you-tip-dog-groomer" className="text-forest hover:underline font-semibold">our tipping guide</Link> covers when and how much.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Mobile Grooming vs Salon Grooming</h2>
          <p>Mobile grooming has grown rapidly in the last decade, and for the right dog it&apos;s transformative. Mobile groomers bring a fully-equipped van to your driveway: bath, dryer, grooming table, clippers, the whole setup. Your dog stays in a familiar environment, doesn&apos;t ride in a car, doesn&apos;t share space with other dogs, and gets one-on-one attention from start to finish. For anxious dogs, seniors with mobility issues, dogs with reactive behavior around other dogs, and multi-dog households where logistics are difficult, mobile is often dramatically better.</p>
          <p>The tradeoffs are price and equipment. Mobile groomers typically charge 30 to 50 percent more than equivalent salon services because the per-appointment overhead is higher. Workspace inside a van is limited &mdash; large breeds, double-coats requiring extensive drying, and complex specialty cuts can all be harder in a mobile setup than in a full salon. Weather affects scheduling: extreme heat or cold limits outdoor van operation in some climates.</p>
          <p>Salon grooming offers full equipment range, often lower cost, capacity to handle multi-hour appointments, and access to multiple groomers (which means specialty matching &mdash; the groomer who&apos;s best with anxious dogs handles your anxious dog, the groomer who specializes in poodle styling handles your poodle). The downside is the salon environment itself: other dogs barking, transport stress, longer waiting times.</p>
          <p>Choose mobile for anxious dogs, seniors, multi-dog households, dogs with conditions that make travel difficult, or owners who genuinely value the convenience and willingly pay for it. Choose salon for confident social dogs, larger breeds requiring industrial dryers, owners with budget priority, and dogs whose grooming needs warrant specialist matching.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">First-Visit Best Practices</h2>
          <p>The first appointment with a new groomer is a calibration session as much as a grooming. Done well, it sets up years of consistent results.</p>
          <p>Bring vaccination records. Most professional groomers require current rabies and DAPP (distemper-adenovirus-parvo-parainfluenza), and some require bordetella for dogs that will be in shared space. Bring physical or digital copies; the salon will need them on file.</p>
          <p>Discuss the exact cut you want, in detail. Bring two or three photos showing the cut from front, side, and rear angles. &quot;Trim him up a little&quot; produces wildly different results across groomers; specific photos with specific descriptions (&quot;blade 7F on the body, scissor the legs to about an inch, round the head, leave a fall over the eyes&quot;) produce predictable outcomes. If you don&apos;t know technical grooming language, that&apos;s fine &mdash; describe what you want in plain terms and trust the groomer to translate.</p>
          <p>Note behavioral concerns upfront. Dogs that bite during nail trims, panic at dryers, freeze under restraint, or have any history of aggression need to be flagged before the appointment, not discovered during it. Honesty here protects everyone, including your dog. Surprising a groomer with a dog that has bitten before is unfair to the groomer and creates conditions for a worse outcome.</p>
          <p>Plan extra time for first appointments &mdash; a new dog typically takes longer than an established client because the groomer is learning behavior, coat, and styling preferences.</p>
          <p>When you pick up, observe carefully. Your dog should be calm &mdash; not panting heavily, not trembling, not avoiding the groomer. The cut should match what you discussed. Run your hands over the body to check for nicks, irritated skin, or razor burn. A small nick happens occasionally even with experienced groomers, but multiple nicks or any skin irritation are reasons for honest conversation about what happened.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Red Flags in a Groomer</h2>
          <p>Certain patterns reliably indicate a groomer or salon you&apos;ll regret returning to:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
            <li>Refusal to let you observe the grooming area, especially when no clear safety reason is given</li>
            <li>Pressure to add services your dog doesn&apos;t need (&quot;required&quot; de-shedding, &quot;required&quot; teeth brushing, etc.)</li>
            <li>Aggressive handling, raised voices, harsh corrections, or rough restraint visible during your initial visit</li>
            <li>Returning your dog visibly stressed, scared, panting heavily, or with unexplained injuries</li>
            <li>Vague answers about products used, sanitation protocols, or training</li>
            <li>Inconsistent results across appointments &mdash; different cuts each visit despite identical instructions</li>
            <li>Reviews that specifically mention safety concerns (always read 1-star reviews, not just 5-star)</li>
            <li>Dogs left in cages or kennels for extended periods (4+ hours) when service was supposed to take 90 minutes</li>
            <li>No climate control in the grooming area, particularly in summer</li>
            <li>High staff turnover (different groomer every visit, frequent salon name changes)</li>
            <li>Refusal to discuss why a particular cut was done a particular way</li>
            <li>Resistance to refunds or corrections when work doesn&apos;t match what was discussed</li>
          </ul>
          <p>Two or three of these patterns is reason enough to switch. One serious incident &mdash; your dog returns injured, traumatized, or with clear signs of rough handling &mdash; is reason enough on its own.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Building a Long-Term Grooming Relationship</h2>
          <p>Once you find a good groomer, staying with them produces noticeably better results over time. The same groomer remembers your dog&apos;s coat, sensitivities, and preferred cut. They notice changes &mdash; new lumps, skin issues, dental problems &mdash; that a rotating groomer would miss. Your dog develops trust with someone they see regularly, which makes every appointment less stressful.</p>
          <p>After each visit, share what worked and what didn&apos;t. Good groomers welcome specific feedback (&quot;the head was a bit short this time&quot; or &quot;the legs looked great, exactly what we wanted&quot;) because it makes future appointments more accurate. Vague praise is less useful than calibration.</p>
          <p>Loyalty programs and package pricing for regular customers are common at established salons; ask. Tipping for excellent grooming runs 15 to 20 percent of the service price as the industry standard, with more for difficult dogs or specialty work. <Link href="/blog/how-often-should-you-groom-your-dog" className="text-forest hover:underline font-semibold">Our guide on grooming frequency by breed</Link> helps set the right rhythm for ongoing appointments.</p>
        </div>

        {/* Continue Reading */}
        <div className="mt-12">
          <h3 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">Continue Reading: Grooming Resources</h3>
          <p className="text-gray-600 text-sm mb-4">For deeper coverage of grooming topics that come up across the life of the relationship:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/blog/how-to-find-good-dog-groomer" className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <p className="font-bold text-charcoal group-hover:text-forest transition text-sm mb-1">How to Find a Good Dog Groomer</p>
              <p className="text-gray-400 text-xs">Red flags, green flags, and questions to ask.</p>
            </Link>
            <Link href="/blog/dog-grooming-by-breed" className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <p className="font-bold text-charcoal group-hover:text-forest transition text-sm mb-1">Dog Grooming by Breed</p>
              <p className="text-gray-400 text-xs">Specific cuts and frequencies for common breeds.</p>
            </Link>
            <Link href="/blog/dog-grooming-for-anxious-dogs" className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <p className="font-bold text-charcoal group-hover:text-forest transition text-sm mb-1">Grooming for Anxious Dogs</p>
              <p className="text-gray-400 text-xs">Calming techniques and finding a fear-free groomer.</p>
            </Link>
            <Link href="/blog/mobile-dog-grooming-pros-cons" className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <p className="font-bold text-charcoal group-hover:text-forest transition text-sm mb-1">Mobile Grooming: Pros & Cons</p>
              <p className="text-gray-400 text-xs">When mobile is the right call, when salon is.</p>
            </Link>
          </div>
        </div>
      </article>

      <section className="max-w-5xl mx-auto px-4 py-6">
        {/* FAQ */}
        <div className="mb-10">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqItems.map((f, i) => (
              <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
                <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-forest transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
                <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </div>

        {/* Cross-links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <Link href="/vets" className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-forest transition mb-1">Find a Vet Near You</h3>
            <p className="text-gray-400 text-sm">Browse veterinarians across all 50 states.</p>
          </Link>
          <Link href="/" className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-forest transition mb-1">Find Dog Parks Near You</h3>
            <p className="text-gray-400 text-sm">Explore off-leash dog parks across the country.</p>
          </Link>
        </div>

        {/* Recommended Partners */}
        <div className="mb-10">
          <div className="mb-4">
            <h2 className="font-[Cabin] text-xl font-bold text-charcoal">Recommended Partners</h2>
            <p className="text-gray-500 text-sm mt-1">Trusted suppliers we use ourselves and recommend to fellow dog owners.</p>
          </div>
          <PartnerCard
            partner={REVIVAL}
            tagline="Pro-Grade Grooming Supplies"
            description="Same brands and products professional groomers use — at home prices. From shampoos to clipper blades to nail care. Free shipping over $149, plus $10 off for first-time customers."
            primary={{ label: "Browse Grooming Supplies", linkKey: "grooming" }}
            secondary={{ label: "Get $10 Off First Order", linkKey: "discount10Off" }}
          />
          <p className="text-xs text-gray-400 italic mt-2">
            Affiliate disclosure: links above are sponsored. We may earn a commission at no extra cost to you.{" "}
            <Link href="/disclosure" className="underline hover:text-bark">Learn more</Link>.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4"><CletusAd /></div>
    </div>
  );
}
