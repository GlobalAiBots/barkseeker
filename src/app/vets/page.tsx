"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { allVets, stateNames, stateSlugs } from "@/data/all-vets";
import AdSlot from "@/components/AdSlot";
import CletusAd from "@/components/CletusAd";
import PartnerCard from "@/components/affiliate/PartnerCard";
import AffiliateInlineLink from "@/components/affiliate/AffiliateInlineLink";
import { REVIVAL } from "@/data/affiliates/revival";

const stateList = Object.entries(stateSlugs)
  .map(([abbr, slug]) => ({ abbr, slug, name: stateNames[abbr] || abbr }))
  .sort((a, b) => a.name.localeCompare(b.name));

export default function VetsDirectoryPage() {
  const [search, setSearch] = useState("");

  const stateCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const v of allVets) map[v.stateAbbr] = (map[v.stateAbbr] || 0) + 1;
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
    { q: "How do I find the best veterinarian near me?", a: "Use BarkSeeker's vet directory to browse veterinarians by state and city. Check ratings, read reviews, and compare clinics to find the best fit for your pet." },
    { q: "How much does a vet visit cost?", a: "A routine vet visit typically costs $50-$250. Emergency visits can range from $500-$5,000+ depending on the treatment needed." },
    { q: "What should I bring to my first vet visit?", a: "Bring your pet's medical records, vaccination history, a list of current medications, and any questions you have. A stool sample for parasite testing is also helpful." },
    { q: "How often should I take my dog to the vet?", a: "Adult dogs should visit the vet at least once a year. Puppies need visits every 3-4 weeks until 16 weeks. Senior dogs (7+) should go every 6 months." },
    { q: "What's the difference between a regular vet and an emergency vet?", a: "A regular veterinarian handles routine care and scheduled procedures. Emergency vets are open 24/7 and handle urgent, life-threatening situations." },
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Choose the Right Vet for Your Dog: A Complete Guide",
    description: "Comprehensive guide to choosing a veterinarian — credentials, AAHA accreditation, practice environment, communication, costs, red flags, and decision frameworks.",
    author: { "@type": "Organization", name: "BarkSeeker", url: "https://www.barkseeker.com" },
    publisher: { "@type": "Organization", name: "BarkSeeker", url: "https://www.barkseeker.com" },
    datePublished: "2026-04-27",
    dateModified: "2026-04-27",
    mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.barkseeker.com/vets" },
    articleSection: "Pet Care",
    keywords: ["how to choose a vet", "find a good veterinarian", "AAHA accredited vets", "vet credentials", "questions to ask a vet", "average vet costs", "when to switch vets"],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqItems.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      <section className="relative min-h-[45vh] md:min-h-[55vh] flex flex-col items-center justify-center overflow-hidden">
        <img src="/images/vet-examining-english-bulldog-ear.jpg" alt="Veterinarian examining a dog during a checkup" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,58,42,0.88) 0%, rgba(26,58,42,0.45) 50%, rgba(26,58,42,0.15) 100%)' }} />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto py-16">
          <p className="text-white/70 text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">Veterinarian Directory</p>
          <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-white leading-tight max-w-3xl mx-auto" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>Find Veterinarians Near You</h1>
          <p className="text-white/85 mt-4 max-w-lg mx-auto" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}>{allVets.length.toLocaleString()} veterinarians across the United States. Ratings, reviews, and contact info.</p>
        </div>
      </section>

      {/* Trust Signal */}
      <section className="py-3 text-center" style={{ background: '#F0FFF4' }}>
        <p className="text-forest font-bold text-sm tracking-wide font-[Cabin]">&#11088; {allVets.length.toLocaleString()} Veterinarians Across {statesWithData.length} States &mdash; Free Forever</p>
      </section>

      {/* Article HEADER — H1 + intro paragraphs above state grid */}
      <article id="choose-a-vet" className="max-w-3xl mx-auto px-4 pt-12 pb-8">
        <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-6 leading-tight">How to Choose the Right Vet for Your Dog: A Complete Guide</h1>
        <div className="text-gray-700 leading-relaxed space-y-5">
          <p>The veterinarian you choose for your dog will shape years &mdash; often more than a decade &mdash; of medical decisions that compound. Vaccine schedules, dental care, the moment you catch (or miss) a tumor, the conversation about whether a senior dog should undergo surgery: these all happen inside a relationship with one practice. Most owners stay with their first vet for five years or more, and when that vet is the right fit, the loyalty is well-placed. When it isn&apos;t, dogs pay the cost in missed diagnoses, unnecessary treatments, or care that never quite addresses what&apos;s actually wrong.</p>
          <p>Choosing well is harder than it should be. A search for &quot;vets near me&quot; returns dozens of clinics, almost all with 4.5+ star averages and similar-sounding mission statements. Reviews skew positive (people rarely write reviews after a routine wellness visit) and the genuinely informative signals &mdash; credentials, accreditation, communication style, pricing transparency &mdash; are buried under marketing copy and waiting-room photos.</p>
          <p>This guide walks through the framework experienced dog owners and rescue organizations actually use. Below is BarkSeeker&apos;s directory of trusted veterinarians &mdash; over {allVets.length.toLocaleString()} across all 50 states. Start there if you&apos;re looking for vets in your area. The complete guide continues below the directory, covering credentials that matter, what to look for in a practice environment, communication style, costs, and the red flags worth knowing before your first appointment.</p>
        </div>
      </article>

      {/* State grid */}
      <section className="max-w-5xl mx-auto px-4 py-6">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-6">Browse Veterinarians by State</h2>
        {statesWithData.length > 10 && (
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search states..." className="w-full max-w-md px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-forest transition mb-6" />
        )}
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 ${showToggle ? "mb-6" : "mb-12"}`}>
          {displayStates.map((s, index) => {
            const hideThis = !isSearching && !expanded && index >= 15;
            return (
              <Link key={s.abbr} href={`/vets/${s.slug}`} className={`group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all${hideThis ? " hidden" : ""}`}>
                <p className="font-bold text-charcoal group-hover:text-forest transition text-sm">{s.name}</p>
                <p className="text-gray-400 text-xs mt-1">{(() => { const c = stateCounts[s.abbr] || 0; return c === 1 ? "1 vet" : `${c.toLocaleString()} vets`; })()}</p>
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

        <AdSlot position="vets-mid" />
      </section>

      {/* Article CONTINUATION — H2 sections below state grid */}
      <article className="max-w-3xl mx-auto px-4 py-12">
        <div className="border-t border-bark/30 pt-6 mb-8">
          <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold font-[Cabin]">Complete Guide Continues</p>
        </div>
        <div className="text-gray-700 leading-relaxed space-y-5">

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-2 mb-3">Why Vet Selection Matters More Than Most Owners Realize</h2>
          <p>The average dog will visit the vet between 80 and 120 times across a typical lifespan &mdash; annual wellness exams, vaccine boosters, dental cleanings, the inevitable ear infection or limp that turns out to be nothing, the occasional emergency, and eventually senior care that grows more frequent with age. That is roughly two visits per year for a healthy dog, scaling to monthly toward the end of life. Each one is a decision point: what tests to run, what treatments to recommend, when to wait and watch versus when to intervene.</p>
          <p>Most pet owners spend more time researching dog food than vets. They pick the closest practice with decent reviews, schedule the first appointment, and stay there by inertia. That works fine when the practice is good. When it isn&apos;t, the consequences are often invisible &mdash; the missed early-stage kidney disease, the skin condition that gets treated symptomatically for years before someone runs the right test, the chronic dental issues that are never addressed because the practice doesn&apos;t push for cleanings.</p>
          <p>The right vet is a long-term partner who knows your dog&apos;s baseline, asks about behavior changes, and earns trust slowly through small interactions. That relationship is hard to build with the wrong practice &mdash; and easy to take for granted with the right one. For a sense of when to actually use that relationship, <Link href="/blog/when-to-take-dog-to-vet" className="text-forest hover:underline font-semibold">our guide on when to take your dog to the vet</Link> covers the warning signs that warrant a visit and the ones that don&apos;t.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Credentials and Specializations to Look For</h2>
          <p>Every practicing veterinarian holds a Doctor of Veterinary Medicine (DVM or VMD) degree from an accredited college and a state license to practice. That&apos;s the floor &mdash; a non-negotiable baseline. Verifying it is straightforward: state veterinary boards maintain public license lookups, and the American Veterinary Medical Association (AVMA) accredits every legitimate DVM program in the country.</p>
          <p>Beyond the baseline, board certification matters when your dog needs specialty care. The American College of Veterinary Internal Medicine (ACVIM), the American College of Veterinary Surgeons (ACVS), the American College of Veterinary Dermatology, and similar boards require years of additional residency training and rigorous examination. A boarded specialist in cardiology, oncology, neurology, ophthalmology, or dermatology brings depth a general practitioner cannot match &mdash; and the title &quot;DACVIM&quot; or &quot;DACVS&quot; after a name is a meaningful signal.</p>
          <p>Most dogs spend their entire lives with general practitioners and never need a specialist. When a referral happens &mdash; typically for complex chronic disease, surgery beyond routine spays and neuters, or unusual diagnostic puzzles &mdash; your general vet should be willing to refer rather than attempt care beyond their depth. A general practitioner who refuses to refer when warranted is a red flag, not a sign of confidence.</p>
          <p>Years of practice experience are useful but overrated. A vet ten years out of school who has stopped pursuing continuing education is often less effective than a recent graduate from a strong program who attends conferences and stays current. Veterinary medicine moves quickly: new vaccines, new pain management protocols, new diagnostic tools, evolving best practices for everything from anesthesia to nutrition. The vets to seek out are the ones who can name what they&apos;ve learned recently. Practices that prominently mention CE (continuing education) hours, AVMA conference attendance, or specialty memberships signal a culture that values staying sharp. When credentialed care is working well, it shows up in small ways at every visit &mdash; the things <Link href="/blog/signs-of-a-good-vet-visit" className="text-forest hover:underline font-semibold">our guide to signs of a good vet visit</Link> walks through in detail.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">AAHA Accreditation: What It Means and Why It Matters</h2>
          <p>The American Animal Hospital Association (AAHA) is voluntary, which is the first thing to understand about it. Roughly 12 to 15 percent of veterinary practices in the United States and Canada are AAHA-accredited. The other 85 percent aren&apos;t bad practices &mdash; many are excellent &mdash; they simply haven&apos;t pursued the certification, often because of cost or paperwork burden rather than a substantive quality issue.</p>
          <p>What AAHA accreditation actually means is that a practice has been evaluated against more than 900 standards covering surgery, anesthesia, pain management, dental care, contagious disease control, emergency preparedness, sanitation, medical records, and continuing education. The evaluation happens every three years. A practice that lets accreditation lapse usually does so for cost reasons, not because they failed.</p>
          <p>For owners, AAHA is best treated as a strong positive signal rather than a binary requirement. An AAHA-accredited practice has demonstrated systems-level commitment to standards. A non-accredited practice may meet or exceed those same standards informally &mdash; but you&apos;d have to do more digging to verify it. If you&apos;re choosing between two practices that otherwise look similar, AAHA accreditation is a reasonable tiebreaker.</p>
          <p>To verify accreditation, AAHA&apos;s practice locator at aaha.org returns the current status for any practice. A &quot;Member&quot; status means the practice is in good standing; a practice that displays an AAHA logo on its website without showing up in the locator may have let accreditation lapse. For specialty hospitals (emergency, oncology, dermatology), the equivalent organization is the American College of Veterinary Emergency and Critical Care (ACVECC) certification, which carries similar weight in the specialty space.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Evaluating the Practice Environment</h2>
          <p>Walk into a practice for an in-person visit before committing. Many clinics will accommodate a brief tour during slow hours, and the request itself is informative &mdash; a practice that refuses or makes it difficult is one to scratch off the list.</p>
          <p>The first thing to notice is calmness. A well-run practice has activity but not chaos. The waiting room is clean, dogs and cats are separated when possible (cats on counters, dogs on the floor &mdash; it matters more than most owners realize for stress reduction), and the staff projects competence rather than rushing.</p>
          <p>Look at the exam rooms. Are they wiped down between patients? Is the equipment in visible condition &mdash; clean stethoscopes, current-looking diagnostic tools, organized cabinets? Old equipment isn&apos;t automatically a problem (a 15-year-old digital scale measures weight just fine), but visibly grimy or chaotic spaces signal a practice that has stopped paying attention.</p>
          <p>In-house diagnostic capability matters more than most owners think. A practice that can run bloodwork, urinalysis, and x-rays in-house can give you results in 30 minutes rather than 24 hours &mdash; which makes a real difference when a sick dog needs answers. Ultrasound, EKG, and dental radiography are increasingly common. In-house pharmacies are convenient but worth scrutinizing for markups (more on that in the cost section).</p>
          <p>Surgical capabilities and post-op monitoring are easier to evaluate by asking. A practice that can describe their anesthesia protocols, what monitoring equipment they use during surgery (pulse oximetry, capnography, blood pressure), and how recovery is supervised is one that takes surgical safety seriously. Watch how staff interact with patients in the waiting room and at the front desk. Calm voices, gentle handling, and patience with anxious dogs say more than any review.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Communication Style: The Most Underrated Factor</h2>
          <p>The single most predictive factor for a long, productive relationship with a vet is whether you can have an actual conversation with them. Not lectures &mdash; conversations. Diagnoses explained in language you understand without being talked down to. Treatment options laid out with honest discussion of why one is being recommended over another. Costs presented upfront, in writing if you ask, before any procedure begins.</p>
          <p>A good vet will explain the rationale behind every recommendation. Why this test rather than that one. Why this treatment rather than waiting and watching. Why a specialist referral makes sense or doesn&apos;t. They&apos;ll do this without making you feel rushed, and they&apos;ll be patient with repeated questions when you don&apos;t follow on the first pass.</p>
          <p>Equally important: they&apos;ll be comfortable saying &quot;I don&apos;t know, let me look into it.&quot; The veterinarian who has an immediate confident answer for every question is usually performing certainty rather than possessing it. The one who pauses, asks clarifying questions, and sometimes says &quot;let me consult a specialist on this&quot; is being honest about the limits of any single practitioner&apos;s knowledge.</p>
          <p>Pay attention to follow-up culture. A practice that calls or messages a few days after a concerning visit to check on your dog is one that treats medicine as ongoing rather than transactional. A practice where you only hear from them when they want to schedule the next appointment is one to think twice about. Apply the midnight test: if your dog were obviously deteriorating at 11pm on a Sunday, would you feel comfortable calling this practice&apos;s emergency line? If the honest answer is no &mdash; you&apos;d feel like you were imposing &mdash; that&apos;s a relationship that won&apos;t serve you in the moments that matter most.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Understanding Vet Costs and Pricing Transparency</h2>
          <p>Routine veterinary costs in the United States have a wide but knowable range. A standard annual wellness exam runs $50 to $100 in most metro areas &mdash; closer to $150 in major cities like New York, San Francisco, and Boston. Routine vaccines are $15 to $30 each, with the core combinations (DAPP, rabies, leptospirosis) typically bundled. Heartworm tests run $30 to $60. A full senior bloodwork panel is $100 to $200. Spay or neuter costs $200 to $500 at most general practices, more at specialty surgery centers. Dental cleaning under anesthesia &mdash; including pre-anesthetic bloodwork, the cleaning itself, and any extractions &mdash; runs $300 to $700 for a healthy young dog and substantially more for seniors with extensive dental disease.</p>
          <p>Emergency visits are where costs become unpredictable. A simple after-hours exam with conservative treatment is $100 to $300. A stay involving IV fluids, advanced diagnostics, surgery, or overnight hospitalization can run $1,500 to $10,000 or more. Our <Link href="/blog/how-much-does-vet-visit-cost" className="text-forest hover:underline font-semibold">complete guide to vet visit costs</Link> breaks down these ranges in more detail with specific procedures.</p>
          <p>A good practice will provide written estimates before any non-emergency procedure and discuss costs proactively rather than after the fact. They&apos;ll offer payment options (CareCredit, Scratchpay, in-house plans) for situations where bills exceed what a family can pay immediately. Wellness plans &mdash; monthly subscriptions covering routine preventive care &mdash; make sense for some owners and not others. They&apos;re predictable and often include unlimited exams, but for genuinely healthy dogs they can cost more than &agrave; la carte care over a year.</p>
          <p>Beyond the visits themselves, recurring supplies represent significant cumulative spend over a dog&apos;s lifetime. Joint supplements for seniors, monthly parasite prevention, dental products, prescription diets, and other ongoing items are often marked up significantly when purchased directly from clinics. Sourcing these from vet-grade suppliers like <AffiliateInlineLink partner={REVIVAL} linkKey="autoShip" postSlug="vets-hub">Revival Animal Health on a monthly AutoShip schedule</AffiliateInlineLink> typically costs 20 to 40 percent less than buying the same products through a vet&apos;s in-house pharmacy. Practices that recommend this approach openly are practices that prioritize pet health outcomes over capturing every supply purchase &mdash; which is itself a useful signal about culture. For more strategies, <Link href="/blog/how-to-reduce-vet-bills" className="text-forest hover:underline font-semibold">our guide on reducing vet bills</Link> walks through other ways to manage ongoing costs without compromising care.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Practical Steps to Find Your Match</h2>
          <p>Word of mouth from local dog owners is the highest-signal recommendation. Neighbors, dog park regulars, dog walking groups, breed-specific Facebook groups, and rescue organizations all tend to know which practices in an area are good and which to avoid. Their information is current and grounded in actual experience, which most online sources are not.</p>
          <p>Online reviews are useful with caveats. Recent reviews (within the last six months) are more relevant than older ones &mdash; practice quality changes when staff turn over. Look for specifics rather than star ratings: a four-star review describing exactly what happened is more informative than a five-star review that just says &quot;great vet, love them.&quot; Discount the most extreme positive and negative reviews on both ends. Pay attention to how the practice responds to negative reviews; defensive or hostile responses are a red flag, while professional and constructive responses signal good management.</p>
          <p>Visit before booking when you can. Many practices welcome walk-throughs during quieter hours, and the visit itself reveals a lot &mdash; staff demeanor, environment cleanliness, calmness of the waiting room, willingness to answer questions.</p>
          <p>Book a routine wellness exam first, not an emergency. The first impression in a non-urgent context is more accurate than under stress. You&apos;ll see how they handle a healthy patient, how they interact with you, and whether the experience matches what you&apos;re looking for.</p>
          <p>Trust your gut. After the first visit, you&apos;ll have a sense of whether this is a relationship you want to invest in. If it isn&apos;t, switch &mdash; loyalty to your first practice should not override your dog&apos;s wellbeing or your own peace of mind. Switching vets is normal, painless, and your medical records are legally yours.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Red Flags That Should Make You Reconsider</h2>
          <p>Certain patterns reliably indicate a practice you&apos;ll regret staying with. Some of these are subtle on first encounter and only become clear after repeated visits, but any one of them is a reason to look elsewhere:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
            <li>Pressure tactics on tests, treatments, or supplies your dog doesn&apos;t clearly need, especially when costs aren&apos;t explained until after the procedure</li>
            <li>Vague, evasive, or shifting answers when you ask about pricing</li>
            <li>Unwillingness to discuss alternative treatment approaches when one exists</li>
            <li>Rough, rushed, or impatient handling of your dog &mdash; particularly visible during routine procedures like nail trims or bloodwork</li>
            <li>No follow-up after concerning visits, abnormal test results, or post-surgical recovery</li>
            <li>Heavy upselling of in-house pharmacy products beyond clear medical necessity, especially when external sources cost meaningfully less</li>
            <li>Reluctance to share medical records, or excessive copy fees for what is legally your information</li>
            <li>Significant staff turnover &mdash; receptionists, technicians, and vets all changing rapidly usually reflects management problems</li>
            <li>Outdated equipment in safety-critical areas (anesthesia monitoring, x-ray, surgical tools) that hasn&apos;t been updated in a decade</li>
            <li>Recommendations that consistently feel disconnected from your dog&apos;s specific situation &mdash; generic advice given to every patient</li>
            <li>Refusal to refer to a specialist when a case is beyond their expertise</li>
            <li>Defensive or hostile response when you ask reasonable questions or seek second opinions</li>
          </ul>
          <p>For genuinely urgent situations, <Link href="/blog/emergency-vet-vs-regular-vet" className="text-forest hover:underline font-semibold">knowing when to use an emergency vet versus your regular vet</Link> is its own decision. The signals above apply to general practices; emergency clinics operate under different constraints and shouldn&apos;t be evaluated by the same standards. If you&apos;re seeing two or three of these patterns in your current practice, switching is almost always the right call.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">When to Find a New Vet</h2>
          <p>Most owners stay with their first vet too long. Switching feels disloyal or like overreacting, especially when nothing has gone catastrophically wrong. But several life events warrant fresh evaluation: moving more than 30 minutes from your current practice (the friction will eventually erode care quality), your dog reaching senior age (eight years old for most breeds, six for giant breeds, where a practice with senior care expertise becomes more valuable), a new chronic diagnosis that requires deeper expertise than your general vet can provide, or a specific incident that breaks trust.</p>
          <p>Loss of trust is the most common and most underweighted reason. If you&apos;ve started questioning every recommendation, dreading appointments, or feeling like you can&apos;t get straight answers, the relationship has functionally ended. Switching at that point isn&apos;t disloyal &mdash; it&apos;s overdue. Your dog will receive better care from a practice you actually trust, and your own peace of mind matters too.</p>

          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Questions to Ask Before Your First Appointment</h2>
          <p>Most of these can be answered in a brief phone call with the front desk. The answers, and how they&apos;re delivered, tell you most of what you need to know:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
            <li>Are you AAHA accredited?</li>
            <li>What are your hours, and do you handle after-hours emergencies in-house or refer to an ER clinic?</li>
            <li>What&apos;s the cost for a routine wellness exam?</li>
            <li>Do you have in-house bloodwork? How long for results?</li>
            <li>Who covers your practice when the lead vet is out?</li>
            <li>What&apos;s your policy on second opinions and specialist referrals?</li>
            <li>How do you handle medication and supply recommendations &mdash; in-house pharmacy only, or open to external sources?</li>
            <li>Can I see your exam rooms before booking?</li>
            <li>What&apos;s your cancellation and no-show policy?</li>
            <li>Do you offer wellness plans, and what do they include?</li>
          </ul>
          <p>A practice that answers these directly and pleasantly is usually a practice worth visiting. One that bristles or stonewalls has told you everything you need to know.</p>
        </div>

        {/* Continue Reading */}
        <div className="mt-12">
          <h3 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">Continue Reading: Vet Resources</h3>
          <p className="text-gray-600 text-sm mb-4">For deeper coverage of specific topics that come up across the life of a vet relationship, these guides walk through common questions in detail:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/blog/what-vaccines-does-my-dog-need" className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <p className="font-bold text-charcoal group-hover:text-forest transition text-sm mb-1">What Vaccines Does My Dog Need?</p>
              <p className="text-gray-400 text-xs">Core vs. non-core vaccines, schedules, and costs.</p>
            </Link>
            <Link href="/blog/how-to-reduce-vet-bills" className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <p className="font-bold text-charcoal group-hover:text-forest transition text-sm mb-1">How to Reduce Vet Bills</p>
              <p className="text-gray-400 text-xs">Practical strategies that don&apos;t compromise care.</p>
            </Link>
            <Link href="/blog/signs-of-a-good-vet-visit" className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <p className="font-bold text-charcoal group-hover:text-forest transition text-sm mb-1">Signs of a Good Vet Visit</p>
              <p className="text-gray-400 text-xs">What credentialed care looks like in practice.</p>
            </Link>
            <Link href="/blog/emergency-vet-vs-regular-vet" className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <p className="font-bold text-charcoal group-hover:text-forest transition text-sm mb-1">Emergency Vet vs. Regular Vet</p>
              <p className="text-gray-400 text-xs">When each is the right call.</p>
            </Link>
          </div>
        </div>
      </article>

      <section className="max-w-5xl mx-auto px-4 py-6">
        {/* FAQ */}
        <div className="mb-10">
          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
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
          <Link href="/groomers" className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-forest transition mb-1">Find Dog Groomers</h3>
            <p className="text-gray-400 text-sm">Browse groomers near you with ratings and reviews.</p>
          </Link>
          <Link href="/" className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-forest transition mb-1">Find Dog Parks</h3>
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
            tagline="Vet-Grade Pet Supplies"
            description="From joint supplements to vaccines and dental care — Revival has the supplies your vet trusts, delivered to you. Free shipping on orders over $149, plus $10 off for first-time customers."
            primary={{ label: "Browse Vet Supplies", linkKey: "vaccinesDog" }}
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
