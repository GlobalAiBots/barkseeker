import Link from "next/link";
import type { Metadata } from "next";

const TITLE = "7 Signs You've Found a Great Veterinarian (2026)";
const DESC = "What a good vet looks like in practice: clear explanations, tiered treatment options, transparent pricing, and the red flags that mean it's time to switch clinics.";
const URL = "https://www.barkseeker.com/blog/signs-of-a-good-vet-visit";

export const metadata: Metadata = {
  title: `${TITLE} | BarkSeeker`,
  description: DESC,
  openGraph: { title: TITLE, description: DESC, url: URL, siteName: "BarkSeeker" },
  alternates: { canonical: URL },
};

const faqs = [
  { q: "What is AAHA accreditation and does it matter?", a: "AAHA (American Animal Hospital Association) accreditation is a voluntary certification where a clinic is audited against 900+ standards covering surgery, anesthesia, dental care, pain management, and record-keeping. Only ~12% of US small-animal practices are AAHA-accredited. It's not the only marker of quality — many excellent independents skip it — but if you see it, you know the clinic meets high baseline standards." },
  { q: "How do I know if my vet is overcharging?", a: "Compare apples to apples: same service, same region, 3 clinics. For routine items, prices should vary 15-30% between clinics. Differences above that are either vastly better facilities (specialist hospital) or a reason to question. Get a written estimate before any non-emergency procedure over $200 — any vet who refuses to put pricing in writing is a red flag." },
  { q: "Should I switch vets if I don't like mine?", a: "Yes, and don't feel bad about it. Your relationship with a vet is 10-15 years of decisions about a family member's health — fit matters. Common reasons to switch: rushed appointments, only presents the most expensive option, poor listener, high staff turnover, your dog becomes visibly more stressed each visit. Transfer medical records via email request — takes 3-5 days." },
  { q: "What's the difference between a regular vet and an emergency vet?", a: "Regular vets handle scheduled appointments and routine care 9-5, Monday-Friday. Emergency vets (sometimes called 24-hour animal hospitals) handle after-hours crises, typically with surgical and ICU capability. A great regular vet has a clear referral relationship with an emergency clinic — they'll tell you upfront where to go if your dog gets hurt on a Saturday night." },
  { q: "How often should my dog see the vet?", a: "Adult dogs (1-7 years): one annual wellness exam. Puppies (under 1 year): 4-5 vaccine visits in the first 16 weeks, then annual. Senior dogs (7+): every 6 months — senior bloodwork catches kidney, liver, and thyroid issues years before symptoms show. Most vets will push the 6-month senior schedule; it's legitimately worth it for early detection." },
];

export default function Post() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: TITLE, description: DESC, datePublished: "2026-04-21", dateModified: "2026-04-21", author: { "@type": "Organization", name: "BarkSeeker" }, publisher: { "@type": "Organization", name: "BarkSeeker", url: "https://www.barkseeker.com" }, mainEntityOfPage: URL }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.barkseeker.com" }, { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.barkseeker.com/blog" }, { "@type": "ListItem", position: 3, name: "Signs of a Good Vet", item: URL }] }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2"><Link href="/" className="hover:text-forest transition">Home</Link><span>/</span><Link href="/blog" className="hover:text-forest transition">Blog</Link><span>/</span><span className="text-charcoal font-medium">Signs of a Good Vet</span></nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-3 leading-tight">{TITLE}</h1>
      <p className="text-gray-400 text-sm mb-8">Updated April 21, 2026 &middot; 7 min read</p>

      <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-6">
        <p>You&apos;re going to visit this person 10-20 times over your dog&apos;s life. You&apos;ll get pricing news, diagnostic news, and eventually end-of-life news from them. A good vet makes the whole experience less stressful for your dog and less confusing for you; a bad one makes both worse.</p>
        <p>Here are the seven signs that you&apos;ve found one of the good ones &mdash; plus the red flags that mean it&apos;s time to shop for another.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">1. Explains Diagnoses in Plain English</h2>
        <p>A good vet will tell you &quot;your dog has inflammation of the ear canal&quot; before they say &quot;otitis externa.&quot; Then they&apos;ll explain what&apos;s causing it, what they want to do, why, and what the alternative options are.</p>
        <p>Red flag: jargon dumped on you without translation, or a vet who gets impatient when you ask &quot;what does that mean.&quot; Not your fault &mdash; you&apos;re not the one who went to vet school.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">2. Offers Tiered Treatment Options</h2>
        <p>For almost any non-emergency condition, there are 2-3 approaches at different price points. A great vet walks you through them:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong className="text-charcoal">Option A (gold-standard):</strong> full diagnostic workup, advanced imaging, referral to specialist. What they&apos;d do for their own dog if cost wasn&apos;t a factor.</li>
          <li><strong className="text-charcoal">Option B (middle):</strong> targeted diagnostics + treatment, with follow-up if it doesn&apos;t resolve.</li>
          <li><strong className="text-charcoal">Option C (conservative):</strong> empiric treatment first, diagnostics only if it doesn&apos;t work.</li>
        </ul>
        <p>Red flag: presents only the most expensive option. Or pushes diagnostic tests (x-rays, bloodwork) without first explaining why empiric treatment wouldn&apos;t work for your situation.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">3. Transparent Pricing Upfront</h2>
        <p>Good clinics have a price list and will show it to you. For any procedure over ~$200, they&apos;ll give you a written estimate before starting, with a &quot;not-to-exceed without calling you&quot; agreement.</p>
        <p>Red flag: &quot;we&apos;ll figure it out and let you know at the end.&quot; That means the bill hits you at checkout with no room to negotiate or refuse. Emergency exception: in genuinely emergent situations they&apos;ll give you a rough range, then update you as the case develops.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">4. Your Dog is Comfortable With Them</h2>
        <p>The single best signal. Watch your dog on exam visit 2 and visit 3. If they walk in willingly, accept handling without trembling, take treats from the vet &mdash; you&apos;ve got the right clinic. Dogs are honest about who they trust.</p>
        <p>Red flag: your dog becomes progressively more reluctant, panicked, or shut down each visit. Some dogs are nervous at any vet; the test is whether it gets worse over time. If it&apos;s worsening, try another clinic &mdash; some vets have the knack for low-stress handling, others don&apos;t.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">5. Doesn&apos;t Rush the Appointment</h2>
        <p>15-minute appointment slots are the industry standard, and good vets make those 15 minutes feel unhurried. They sit down, put hands on your dog, ask what you&apos;re seeing, let you finish sentences, and don&apos;t glance at the computer more than they look at you.</p>
        <p>Red flag: vet walks in reading from the chart, barely examines the dog, tells you the diagnosis in 90 seconds and hands you a bill. Corporate-owned chains (Banfield, VCA) are more prone to this; independents vary. Your dog is not a conveyor belt.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">6. Follows Up After Treatment</h2>
        <p>A day or two after a procedure or a diagnosis with a new medication, a good clinic calls or texts to check how your dog is doing. &quot;Is she eating? How is she walking? Any vomiting?&quot; Takes 90 seconds. Signals genuine care and catches complications early.</p>
        <p>Red flag: you never hear from them again after the appointment. You paid, you left, you&apos;re on your own.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">7. Has Clear Emergency Protocols</h2>
        <p>Ask your regular vet: &quot;If something happens Saturday night, where should I go?&quot; A good vet answers immediately with a specific 24-hour emergency clinic they refer to, usually with a relationship where that clinic sends records back to them.</p>
        <p>Red flag: shrugging answer, or a vague &quot;call the number when we&apos;re closed.&quot; Means they haven&apos;t thought about after-hours care for their patients.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Red Flags: When to Switch Clinics</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-charcoal">No price list available.</strong> Any clinic that won&apos;t quote is hiding something.</li>
          <li><strong className="text-charcoal">Pushes unnecessary tests.</strong> Especially annual bloodwork on a young healthy dog, or x-rays for every limp.</li>
          <li><strong className="text-charcoal">Doesn&apos;t listen.</strong> You describe a symptom, they talk over you to their diagnosis.</li>
          <li><strong className="text-charcoal">High staff turnover.</strong> You never see the same tech twice, front desk is different every visit. Means the clinic is a bad place to work, which usually traces to how owners treat patients.</li>
          <li><strong className="text-charcoal">Dirty or disorganized exam rooms.</strong> Hair from the last patient still on the table, expired pamphlets, equipment strewn around.</li>
          <li><strong className="text-charcoal">Prescribes without examining.</strong> &quot;Sounds like an ear infection, I&apos;ll call in the antibiotics&quot; without looking at the ear.</li>
          <li><strong className="text-charcoal">Refuses to release records.</strong> Legally they have to within a few business days. Stalling is a red flag.</li>
        </ul>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">How to Switch Without Drama</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong className="text-charcoal">Find the new vet first.</strong> Read reviews on BarkSeeker, visit the clinic, schedule a meet-and-greet.</li>
          <li><strong className="text-charcoal">Email the old clinic</strong> a records-transfer request with the new vet&apos;s email. You don&apos;t need to explain why &mdash; legally they have to send records.</li>
          <li><strong className="text-charcoal">Schedule the first appointment.</strong> Bring your dog in for a non-urgent wellness exam so the new vet meets them healthy.</li>
        </ol>
        <p>Browse <Link href="/vets" className="text-forest hover:underline">veterinarians by state</Link> on BarkSeeker to find a new clinic nearby.</p>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i}>
              <h3 className="font-[Cabin] font-bold text-charcoal text-lg">{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10">Related Reading</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><Link href="/blog/how-to-find-good-veterinarian" className="text-forest hover:underline">How to Find a Good Veterinarian</Link></li>
          <li><Link href="/blog/how-much-does-vet-visit-cost" className="text-forest hover:underline">How Much Does a Vet Visit Cost?</Link></li>
          <li><Link href="/blog/how-to-reduce-vet-bills" className="text-forest hover:underline">How to Reduce Vet Bills</Link></li>
          <li><Link href="/blog/emergency-vet-vs-regular-vet" className="text-forest hover:underline">Emergency Vet vs Regular Vet</Link></li>
          <li><Link href="/vets" className="text-forest hover:underline">Browse veterinarians by state</Link></li>
        </ul>
      </div>
    </article>
  );
}
