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
        {blogPosts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col sm:flex-row bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            {/* Thumbnail */}
            <div className="sm:w-48 h-36 sm:h-auto flex-shrink-0 flex items-center justify-center relative" style={{ background: p.gradient }}>
              <div className="w-20 h-16" dangerouslySetInnerHTML={{ __html: p.icon }} />
            </div>
            {/* Content */}
            <div className="p-5 flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold text-water bg-water/10 px-2 py-0.5 rounded-full">{p.category}</span>
                <span className="text-gray-400 text-xs">{p.date} &middot; {p.readTime}</span>
              </div>
              <h2 className="font-[Cabin] text-lg font-bold text-charcoal group-hover:text-water transition mb-2 line-clamp-2">{p.title}</h2>
              <p className="text-gray-500 text-sm line-clamp-2 mb-3">{p.description}</p>
              <span className="text-sunset font-semibold text-sm">Read more &rarr;</span>
            </div>
          </Link>
        ))}
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
