"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import categoriesData from "@/data/categories.json";

interface CategoryState { code: string; name: string; slug: string; count: number; parkIds: string[]; }
interface Category { slug: string; title: string; description: string; totalCount: number; states: CategoryState[]; }
const categories = categoriesData as Category[];

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const category = useMemo(() => categories.find(c => c.slug === slug), [slug]);

  if (!category) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="font-[Cabin] text-3xl font-bold text-charcoal mb-4">Category Not Found</h1>
        <Link href="/" className="text-forest hover:underline">Back to Home</Link>
      </div>
    );
  }

  const faqs = [
    { q: `How many ${category.title.toLowerCase()} are there in America?`, a: `BarkSeeker lists ${category.totalCount} ${category.title.toLowerCase()} across ${category.states.length} states.` },
    { q: `Which state has the most ${category.title.toLowerCase()}?`, a: category.states[0] ? `${category.states[0].name} has the most with ${category.states[0].count} ${category.title.toLowerCase()}.` : "" },
    { q: `Are ${category.title.toLowerCase()} free?`, a: `Most ${category.title.toLowerCase()} are free and open to the public. Some may require a local registration tag for your dog.` },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://barkseeker.com" },
          { "@type": "ListItem", position: 2, name: category.title, item: `https://barkseeker.com/category/${slug}` },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.filter(f => f.a).map(f => ({
          "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }) }} />

      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-forest transition">Home</Link><span>/</span>
        <span className="text-charcoal font-medium">{category.title}</span>
      </nav>

      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-2">{category.title} in America</h1>
      <p className="text-gray-500 mb-2">{category.totalCount.toLocaleString()} parks across {category.states.length} states</p>
      <p className="text-gray-400 text-sm mb-8">{category.description}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-12">
        {category.states.map(st => (
          <Link key={st.code} href={`/${st.slug}`} className="group bg-white border border-gray-200 rounded-lg p-3 hover:border-forest hover:shadow-sm transition">
            <p className="font-bold text-charcoal text-sm group-hover:text-forest transition">{st.name}</p>
            <p className="text-gray-400 text-xs">{st.count} park{st.count !== 1 ? "s" : ""}</p>
          </Link>
        ))}
      </div>

      {/* FAQ */}
      <section className="mb-8">
        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {faqs.filter(f => f.a).map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-forest transition list-none flex items-center justify-between">
                {f.q}
                <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
