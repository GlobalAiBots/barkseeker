import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BarkSeeker Blog — Dog Park Tips, Guides & Off-Leash Areas",
  description: "Dog park guides, off-leash area tips, etiquette advice, and park recommendations for dog owners across America.",
  openGraph: { title: "BarkSeeker Blog", url: "https://www.barkseeker.com/blog", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "BarkSeeker Blog" },
  alternates: { canonical: "https://www.barkseeker.com/blog" },
};

// Category → gradient + inline SVG icon. Matches RampSeeker/MarinaSeeker
// visual pattern (outlined SVG, 45% white, 80x60 viewBox).
const CATEGORY_CONFIG: Record<string, { gradient: string; icon: string }> = {
  Training: {
    gradient: "linear-gradient(135deg, #059669 0%, #0D9488 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none"><path d="M20 26 L40 18 L60 26 L40 34 Z" stroke="rgba(255,255,255,0.5)" stroke-width="2" stroke-linejoin="round" fill="none"/><line x1="60" y1="26" x2="60" y2="38" stroke="rgba(255,255,255,0.5)" stroke-width="2" stroke-linecap="round"/><path d="M28 30 L28 42 Q40 48 52 42 L52 30" stroke="rgba(255,255,255,0.45)" stroke-width="2" fill="none"/></svg>`,
  },
  Vets: {
    gradient: "linear-gradient(135deg, #0891B2 0%, #0EA5E9 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none"><path d="M28 14 L28 30 Q28 38 36 38 Q44 38 44 30 L44 14" stroke="rgba(255,255,255,0.45)" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M44 30 Q44 44 54 44" stroke="rgba(255,255,255,0.45)" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="54" cy="46" r="4" stroke="rgba(255,255,255,0.5)" stroke-width="2"/></svg>`,
  },
  Veterinary: {
    gradient: "linear-gradient(135deg, #0891B2 0%, #0EA5E9 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none"><path d="M28 14 L28 30 Q28 38 36 38 Q44 38 44 30 L44 14" stroke="rgba(255,255,255,0.45)" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M44 30 Q44 44 54 44" stroke="rgba(255,255,255,0.45)" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="54" cy="46" r="4" stroke="rgba(255,255,255,0.5)" stroke-width="2"/></svg>`,
  },
  Guide: {
    gradient: "linear-gradient(135deg, #0D9488 0%, #059669 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none"><path d="M22 14 L22 46 Q22 48 24 48 L40 48 L40 16 Q40 14 38 14 Z" stroke="rgba(255,255,255,0.45)" stroke-width="2" fill="none"/><path d="M40 16 Q40 14 42 14 L56 14 Q58 14 58 16 L58 48 L42 48 Q40 48 40 46 Z" stroke="rgba(255,255,255,0.45)" stroke-width="2" fill="none"/><line x1="27" y1="22" x2="35" y2="22" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/><line x1="27" y1="28" x2="35" y2="28" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/></svg>`,
  },
  Grooming: {
    gradient: "linear-gradient(135deg, #D97706 0%, #EA580C 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none"><circle cx="26" cy="22" r="6" stroke="rgba(255,255,255,0.45)" stroke-width="2"/><circle cx="26" cy="40" r="6" stroke="rgba(255,255,255,0.45)" stroke-width="2"/><line x1="30" y1="26" x2="56" y2="16" stroke="rgba(255,255,255,0.45)" stroke-width="2" stroke-linecap="round"/><line x1="30" y1="36" x2="56" y2="46" stroke="rgba(255,255,255,0.45)" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
  Destinations: {
    gradient: "linear-gradient(135deg, #F97316 0%, #DC2626 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none"><path d="M40 10 C48 10 54 16 54 24 C54 34 40 48 40 48 C40 48 26 34 26 24 C26 16 32 10 40 10 Z" stroke="rgba(255,255,255,0.45)" stroke-width="2" fill="none"/><circle cx="40" cy="24" r="5" stroke="rgba(255,255,255,0.5)" stroke-width="2"/></svg>`,
  },
  Safety: {
    gradient: "linear-gradient(135deg, #DC2626 0%, #EA580C 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none"><path d="M40 10 L56 16 L56 30 Q56 44 40 50 Q24 44 24 30 L24 16 Z" stroke="rgba(255,255,255,0.45)" stroke-width="2" fill="none" stroke-linejoin="round"/><path d="M32 28 L38 34 L48 22" stroke="rgba(255,255,255,0.5)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
  },
  Tips: {
    gradient: "linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)",
    icon: `<svg viewBox="0 0 80 60" fill="none"><path d="M40 12 C32 12 28 18 28 24 C28 30 34 32 34 38 L46 38 Q46 32 52 24 C52 18 48 12 40 12 Z" stroke="rgba(255,255,255,0.45)" stroke-width="2" fill="none"/><line x1="34" y1="42" x2="46" y2="42" stroke="rgba(255,255,255,0.45)" stroke-width="2" stroke-linecap="round"/><line x1="36" y1="46" x2="44" y2="46" stroke="rgba(255,255,255,0.45)" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
};

const DEFAULT_CONFIG = {
  gradient: "linear-gradient(135deg, #475569 0%, #1E293B 100%)",
  icon: `<svg viewBox="0 0 80 60" fill="none"><rect x="20" y="14" width="40" height="32" rx="3" stroke="rgba(255,255,255,0.4)" stroke-width="2"/></svg>`,
};

const networkPosts = [
  {
    url: "https://www.babymydog.com/blog",
    title: "BabyMyDog Blog",
    excerpt: "Pet-friendly travel tips, gear reviews, breed guides, and nutrition for your dog.",
    tag: "BabyMyDog",
  },
  {
    url: "https://www.rampseeker.com/blog",
    title: "RampSeeker Blog",
    excerpt: "Boat ramp guides, towing advice, launching tips. 27,000+ ramps across America.",
    tag: "RampSeeker",
  },
  {
    url: "https://www.marinaseeker.com/blog",
    title: "MarinaSeeker Blog",
    excerpt: "Slip rentals, liveaboard guides, marina etiquette, dockage 101 — for waterfront life.",
    tag: "MarinaSeeker",
  },
];

export default function BlogIndex() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-2">Blog</h1>
      <p className="text-gray-500 mb-10">Dog park guides, off-leash area tips, grooming, vet advice, and park recommendations for dog owners across America.</p>
      <div className="space-y-6">
        {blogPosts.map((p) => {
          const config = CATEGORY_CONFIG[p.category] ?? DEFAULT_CONFIG;
          return (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col sm:flex-row bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              {/* Thumbnail */}
              <div className="sm:w-48 h-36 sm:h-auto flex-shrink-0 flex items-center justify-center relative" style={{ background: config.gradient }}>
                <div className="w-20 h-16" dangerouslySetInnerHTML={{ __html: config.icon }} />
              </div>
              {/* Content */}
              <div className="p-5 flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-[10px] font-bold text-water bg-water/10 px-2 py-0.5 rounded-full">{p.category}</span>
                  <span className="text-gray-400 text-xs">{p.date} &middot; {p.readTime}</span>
                </div>
                <h2 className="font-[Cabin] text-lg font-bold text-charcoal group-hover:text-water transition mb-2 line-clamp-2">{p.title}</h2>
                <p className="text-gray-500 text-sm line-clamp-2 mb-3">{p.description}</p>
                <span className="text-sunset font-semibold text-sm">Read more &rarr;</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* From our network */}
      <section className="mt-16 pt-10 border-t border-gray-200">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-2">From our network</h2>
        <p className="text-sm text-gray-500 mb-6">BarkSeeker is part of a family of outdoor and pet directory sites. Fresh reading from our sisters:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {networkPosts.map((p) => (
            <a key={p.url} href={p.url} className="group block bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 inline-block">{p.tag} <span aria-hidden="true">↗</span></span>
              <p className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition text-sm leading-snug">{p.title}</p>
              <p className="text-gray-500 text-xs mt-2 leading-relaxed">{p.excerpt}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
