import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import BlogCletusCallout from "@/components/BlogCletusCallout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "When to Take Your Dog to the Vet: Warning Signs You Shouldn't Ignore | BarkSeeker",
  description: "Know when your dog needs a vet visit — warning signs, emergency symptoms, and when to wait vs. rush to the ER. A complete guide for dog owners.",
  openGraph: { title: "When to Take Your Dog to the Vet: Warning Signs You Shouldn't Ignore", url: "https://www.barkseeker.com/blog/when-to-take-dog-to-vet", siteName: "BarkSeeker" },
  alternates: { canonical: "https://www.barkseeker.com/blog/when-to-take-dog-to-vet" },
};

export default function PostPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: "When to Take Your Dog to the Vet: Warning Signs You Shouldn't Ignore", datePublished: "2026-04-15", author: { "@type": "Organization", name: "BarkSeeker" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.barkseeker.com/" }, { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.barkseeker.com/blog" }, { "@type": "ListItem", position: 3, name: "When to Take Your Dog to the Vet", item: "https://www.barkseeker.com/blog/when-to-take-dog-to-vet" }] }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "When should I take my dog to the emergency vet?", acceptedAnswer: { "@type": "Answer", text: "Go to the emergency vet immediately for difficulty breathing, seizures, suspected poisoning, bloated/distended abdomen, inability to urinate, severe bleeding, collapse, or trauma from being hit by a car." } }, { "@type": "Question", name: "Should I take my dog to the vet for vomiting?", acceptedAnswer: { "@type": "Answer", text: "A single episode of vomiting is usually not an emergency. However, see a vet if vomiting persists beyond 24 hours, contains blood, is accompanied by lethargy or diarrhea, or if your dog cannot keep water down." } }, { "@type": "Question", name: "How often should a healthy dog see the vet?", acceptedAnswer: { "@type": "Answer", text: "Healthy adult dogs should see the vet once a year for a wellness exam. Puppies need visits every 3-4 weeks until 16 weeks old. Senior dogs (7+ years) benefit from twice-yearly checkups." } }] }) }} />
      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-forest transition">Home</Link><span>/</span>
        <Link href="/blog" className="hover:text-forest transition">Blog</Link><span>/</span>
        <span className="text-charcoal font-medium">When to Take Your Dog to the Vet</span>
      </nav>
      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-4 leading-tight">When to Take Your Dog to the Vet: Warning Signs You Should Not Ignore</h1>
      <p className="text-gray-400 text-sm mb-8">April 15, 2026 &middot; 8 min read</p>

      <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-6">
        <p>
          Dogs cannot tell us when something is wrong, and they are remarkably good at hiding pain and illness. As a dog owner, it is your responsibility to recognize the warning signs that mean your dog needs veterinary attention. Some symptoms warrant an immediate trip to the emergency vet, while others can wait for a scheduled appointment. Knowing the difference can save your dog&apos;s life — and save you from unnecessary panic over minor issues.
        </p>

        <AdSlot position="top" />

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Emergency Symptoms: Go to the Vet Immediately</h2>
        <p>
          The following symptoms are potentially life-threatening and require immediate veterinary attention. Do not wait — head to the nearest emergency vet clinic right away:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Difficulty breathing:</strong> Labored breathing, gasping, blue-tinged gums, or excessive panting at rest could indicate a blocked airway, fluid in the lungs, heart failure, or allergic reaction.</li>
          <li><strong>Seizures:</strong> A first-time seizure, a seizure lasting more than two minutes, or multiple seizures in a row require emergency care.</li>
          <li><strong>Suspected poisoning:</strong> If your dog ate chocolate, xylitol, grapes, antifreeze, rat poison, medications, or any other toxic substance, call your vet or the ASPCA Poison Control Center (888-426-4435) immediately.</li>
          <li><strong>Bloated or distended abdomen:</strong> A hard, swollen belly combined with retching without producing vomit, restlessness, and drooling may indicate gastric dilatation-volvulus (GDV/bloat), which is fatal without emergency surgery.</li>
          <li><strong>Inability to urinate:</strong> A dog straining to urinate without producing urine could have a urinary blockage, which can become fatal within hours.</li>
          <li><strong>Severe bleeding:</strong> Any wound that will not stop bleeding with direct pressure needs emergency treatment.</li>
          <li><strong>Collapse or inability to stand:</strong> Sudden collapse, extreme weakness, or inability to stand suggests a serious underlying condition.</li>
          <li><strong>Trauma:</strong> Being hit by a car, falling from a height, or any significant physical trauma warrants an immediate vet visit even if the dog appears okay — internal injuries may not be immediately apparent.</li>
        </ul>

        <div className="bg-amber-50 border-l-4 border-bark p-4 rounded-r-lg">
          <p className="font-semibold text-charcoal mb-1">Know Your Emergency Vet Before You Need One</p>
          <p className="text-sm text-gray-600">Do not wait until an emergency to figure out where the nearest emergency vet is. Find emergency clinics near you now using our <Link href="/vets" className="text-forest font-semibold hover:underline">veterinarian directory</Link> and save their phone number and address in your phone.</p>
        </div>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Urgent Symptoms: See a Vet Within 24 Hours</h2>
        <p>
          These symptoms are not immediately life-threatening but should not wait more than a day:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Persistent vomiting or diarrhea:</strong> More than two or three episodes in 24 hours, or any vomiting/diarrhea containing blood.</li>
          <li><strong>Refusal to eat for more than 24 hours:</strong> A missed meal is usually nothing to worry about, but a full day without eating — especially in a dog that is normally food-motivated — warrants investigation.</li>
          <li><strong>Significant lethargy:</strong> If your normally active dog is suddenly listless and uninterested in their usual activities for an entire day.</li>
          <li><strong>Limping or obvious pain:</strong> Persistent limping, yelping when touched, or reluctance to move suggests injury or pain that needs evaluation.</li>
          <li><strong>Eye injuries or changes:</strong> A red, swollen, squinting, or cloudy eye should be seen promptly — eye conditions can deteriorate rapidly.</li>
          <li><strong>Excessive drinking and urination:</strong> A sudden increase in water consumption can indicate diabetes, kidney disease, or Cushing&apos;s disease.</li>
        </ul>

        <AdSlot position="middle" />

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Schedule a Vet Visit Soon: Within a Week</h2>
        <p>
          These symptoms are concerning but typically not emergencies. Schedule a vet appointment within a few days:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Persistent scratching or skin irritation:</strong> Excessive scratching, licking, hot spots, or hair loss could indicate allergies, fleas, or skin infections.</li>
          <li><strong>Bad breath or dental issues:</strong> Foul breath, red gums, or difficulty eating suggest dental disease that needs professional attention.</li>
          <li><strong>Ear odor or head shaking:</strong> Smelly ears, frequent head shaking, or scratching at ears points to an ear infection.</li>
          <li><strong>Lumps or bumps:</strong> Any new lump or growth should be evaluated by a vet. Most are benign, but early detection of malignant tumors significantly improves outcomes.</li>
          <li><strong>Weight changes:</strong> Unexplained weight gain or loss over weeks warrants investigation for underlying conditions.</li>
          <li><strong>Scooting:</strong> Dragging the rear on the ground usually indicates full anal glands, though it can also signal allergies or parasites.</li>
        </ul>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Routine Vet Visits: The Prevention Schedule</h2>
        <p>
          Beyond responding to symptoms, every dog needs regular preventive care visits. Healthy adult dogs should see the vet at least once a year for a wellness exam, vaccinations, heartworm test, and parasite check. Puppies under one year need visits every three to four weeks for their vaccination series. Senior dogs over seven years should have checkups every six months, as age-related conditions can develop quickly. These routine visits catch problems early when they are cheaper and easier to treat.
        </p>

        <div className="bg-green-50 border-l-4 border-forest p-4 rounded-r-lg">
          <p className="font-semibold text-charcoal mb-1">Trust Your Instincts</p>
          <p className="text-sm text-gray-600">You know your dog better than anyone. If something feels off — even if you cannot pinpoint exactly what — it is always better to call your vet and describe what you are seeing than to wait and wonder. Most vet offices will triage over the phone and tell you whether you need to come in.</p>
        </div>

        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mt-10 mb-3">Be Prepared</h2>
        <p>
          The best time to find a good veterinarian is before you need one urgently. Establish a relationship with a trusted vet so they know your dog&apos;s history and baseline health. Find a veterinarian near you through our <Link href="/vets" className="text-forest font-semibold hover:underline">vet directory</Link>, and consider <Link href="/pet-insurance" className="text-forest font-semibold hover:underline">pet insurance</Link> to ensure cost never prevents you from getting your dog the care they need.
        </p>

        <Link href="/pet-insurance" className="inline-block mt-4 px-6 py-3 rounded-lg font-semibold text-white transition" style={{ backgroundColor: "#E8913A" }}>
          Explore Pet Insurance Options
        </Link>
      </div>
      <BlogCletusCallout />
    </article>
  );
}
