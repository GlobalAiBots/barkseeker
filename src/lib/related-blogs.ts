// Contextual "Related Guide" widget data for groomer and vet detail pages.
// Short excerpts — one per slug, ~50 words max — keeps duplicate-content low at scale.

type BlogTease = { slug: string; title: string; excerpt: string };

const BLOGS: Record<string, BlogTease> = {
  "how-much-does-dog-grooming-cost": {
    slug: "how-much-does-dog-grooming-cost",
    title: "How Much Does Dog Grooming Cost?",
    excerpt: "Basic baths run $30-$60; full grooms $60-$120; doodles and large breeds push $150+. Mobile adds a travel premium. Here's what each service actually includes and how to spot the upsells.",
  },
  "dog-grooming-by-breed": {
    slug: "dog-grooming-by-breed",
    title: "Dog Grooming by Breed",
    excerpt: "Doodles need 4-week cuts; huskies should almost never be shaved; short-coat breeds need brushing, not cutting. Breed-specific grooming schedules that keep coats healthy without over-grooming.",
  },
  "puppy-first-grooming-appointment": {
    slug: "puppy-first-grooming-appointment",
    title: "Your Puppy's First Grooming Appointment",
    excerpt: "Wait until after the second round of vaccines (~12 weeks), keep the first visit short (bath only), bring a favorite treat, and skip the \"while you're at it\" add-ons. Build positive associations early.",
  },
  "dog-grooming-for-anxious-dogs": {
    slug: "dog-grooming-for-anxious-dogs",
    title: "Grooming an Anxious Dog",
    excerpt: "Signs your dog is stressed at the groomer, how to pick a low-stress salon, calming aids that actually work, and when to switch to mobile or in-home grooming instead.",
  },
  "mobile-dog-grooming-pros-cons": {
    slug: "mobile-dog-grooming-pros-cons",
    title: "Mobile vs Salon Grooming",
    excerpt: "Mobile grooming costs 30-50% more but cuts stress dramatically for anxious, senior, or multi-dog households. Here's when the premium is worth it and when it isn't.",
  },
  "do-you-tip-dog-groomer": {
    slug: "do-you-tip-dog-groomer",
    title: "Do You Tip a Dog Groomer?",
    excerpt: "Yes — 15-20% standard, 25% for difficult dogs or exceptional work. Tip in cash directly to the groomer (chain shops skim card tips). When a holiday bonus makes sense vs per-visit tipping.",
  },
  "how-to-find-good-dog-groomer": {
    slug: "how-to-find-good-dog-groomer",
    title: "How to Find a Good Dog Groomer",
    excerpt: "NDGAA/IPG certification, observation visits, treatment of senior/anxious dogs, willingness to show you the kennel area. The 7 signals that separate a pro from a bath-and-brush operation.",
  },
  "how-much-does-vet-visit-cost": {
    slug: "how-much-does-vet-visit-cost",
    title: "How Much Does a Vet Visit Cost?",
    excerpt: "Routine exam $50-$100; puppy series $250-$400; dental cleaning $500-$1,200; emergency visits $500-$5,000+. Where prices come from and which line items you can push back on.",
  },
  "when-to-take-dog-to-vet": {
    slug: "when-to-take-dog-to-vet",
    title: "When to Take Your Dog to the Vet",
    excerpt: "What to treat at home (mild limping, one-time vomiting) vs what needs a same-day appointment (persistent diarrhea, labored breathing) vs ER-now situations (seizure, bloat, collapse).",
  },
  "emergency-vet-vs-regular-vet": {
    slug: "emergency-vet-vs-regular-vet",
    title: "Emergency Vet vs Regular Vet",
    excerpt: "Regular vets handle scheduled care 9-5. Emergency clinics stay open 24/7 with surgical capacity. When the 3x price premium of an ER vet is justified — and when to wait for morning.",
  },
  "puppy-first-vet-visit": {
    slug: "puppy-first-vet-visit",
    title: "Your Puppy's First Vet Visit",
    excerpt: "Schedule at 6-8 weeks. Bring fecal sample, vaccine records from the breeder, and a list of questions. What to expect and what not to vaccinate all at once.",
  },
  "is-pet-insurance-worth-it": {
    slug: "is-pet-insurance-worth-it",
    title: "Is Pet Insurance Worth It?",
    excerpt: "Worth it for young purebreds prone to specific conditions. Questionable for senior dogs or mixed breeds. The real math on monthly premiums vs an emergency fund, plus plans that pay out vs those that don't.",
  },
  "how-to-reduce-vet-bills": {
    slug: "how-to-reduce-vet-bills",
    title: "How to Reduce Vet Bills",
    excerpt: "Itemized estimates, preventive care (dental, weight), generic meds, CareCredit, vet schools, and the emergency-room tactics that cut bills 20-40% without compromising care.",
  },
  "how-to-find-good-veterinarian": {
    slug: "how-to-find-good-veterinarian",
    title: "How to Find a Good Veterinarian",
    excerpt: "AAHA accreditation, how they handle your dog during intake, willingness to explain diagnoses, whether they give you treatment options at different price points. Switching without drama.",
  },
  "signs-of-a-good-vet-visit": {
    slug: "signs-of-a-good-vet-visit",
    title: "Signs You've Found a Great Vet",
    excerpt: "Plain-English diagnoses, tiered treatment options, transparent pricing, your dog is comfortable with them, they follow up after treatment. And the red flags that mean switch clinics.",
  },
  "dog-park-etiquette": {
    slug: "dog-park-etiquette",
    title: "Dog Park Etiquette",
    excerpt: "10 unwritten rules every owner should follow — watching your dog, cleaning up, knowing when to leave, and reading the body language that means it's time to go.",
  },
};

type GroomerShape = { name?: string; city?: string; state?: string; rating?: number };
type VetShape = { name?: string; city?: string; state?: string; rating?: number };

export function getRelatedGroomerBlog(groomer: GroomerShape): BlogTease {
  const name = (groomer.name || "").toLowerCase();
  if (name.includes("mobile")) return BLOGS["mobile-dog-grooming-pros-cons"];
  if (name.includes("spa") || name.includes("boutique")) return BLOGS["dog-grooming-for-anxious-dogs"];
  if (name.includes("petco") || name.includes("petsmart")) return BLOGS["how-to-find-good-dog-groomer"];

  const fallback = [
    "how-much-does-dog-grooming-cost",
    "how-to-find-good-dog-groomer",
    "do-you-tip-dog-groomer",
    "dog-grooming-by-breed",
    "puppy-first-grooming-appointment",
  ];
  const hash = (groomer.city || "").split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return BLOGS[fallback[hash % fallback.length]];
}

export function getRelatedVetBlog(vet: VetShape): BlogTease {
  const name = (vet.name || "").toLowerCase();
  if (name.includes("emergency") || name.includes("24") || name.includes("urgent"))
    return BLOGS["emergency-vet-vs-regular-vet"];
  if (name.includes("hospital") || name.includes("medical center"))
    return BLOGS["how-much-does-vet-visit-cost"];
  if (name.includes("low cost") || name.includes("affordable") || name.includes("spay neuter"))
    return BLOGS["how-to-reduce-vet-bills"];

  const fallback = [
    "how-much-does-vet-visit-cost",
    "how-to-find-good-veterinarian",
    "signs-of-a-good-vet-visit",
    "when-to-take-dog-to-vet",
    "is-pet-insurance-worth-it",
    "puppy-first-vet-visit",
  ];
  const hash = (vet.city || "").split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return BLOGS[fallback[hash % fallback.length]];
}
