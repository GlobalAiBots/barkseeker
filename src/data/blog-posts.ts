export interface BlogPost {
  slug: string; title: string; date: string; readTime: string;
  category: string; description: string; gradient: string; icon: string;
}

export const blogPosts: BlogPost[] = [
  { slug: "dog-exercise-requirements-by-breed", title: "How Much Exercise Does Your Dog Need? A Guide by Breed", date: "April 11, 2026", readTime: "7 min read", category: "Guide", description: "Exercise requirements by breed — from high-energy Huskies to low-key Bulldogs. Specific daily recommendations.", gradient: "linear-gradient(135deg, #0D9488 0%, #2D6A4F 100%)", icon: '<svg viewBox="0 0 80 64" fill="none"><text x="20" y="45" font-size="40">\uD83C\uDFC3</text></svg>' },
  { slug: "best-dog-parks-in-america", title: "Best Dog Parks in America: Top 25 Picks", date: "April 11, 2026", readTime: "8 min read", category: "Destinations", description: "The 25 best dog parks across America — curated by region with what makes each one special.", gradient: "linear-gradient(135deg, #1E3A5F 0%, #2D6A4F 100%)", icon: '<svg viewBox="0 0 80 64" fill="none"><text x="20" y="45" font-size="40">\uD83C\uDFC6</text></svg>' },
  { slug: "what-to-bring-to-a-dog-park", title: "What to Bring to the Dog Park: Essential Checklist", date: "April 11, 2026", readTime: "5 min read", category: "Tips", description: "The essential dog park packing list — what to bring, what's nice to have, and what to leave at home.", gradient: "linear-gradient(135deg, #E8913A 0%, #F4A261 100%)", icon: '<svg viewBox="0 0 80 64" fill="none"><text x="20" y="45" font-size="40">\uD83C\uDF92</text></svg>' },
  { slug: "best-dog-parks-florida", title: "Best Dog Parks in Florida: Off-Leash Paradise for Your Pup", date: "April 5, 2026", readTime: "6 min read", category: "Destinations", description: "Discover the top dog parks in Florida with off-leash areas, water features, and shade.", gradient: "linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)", icon: '<svg viewBox="0 0 80 64" fill="none"><text x="20" y="45" font-size="40">\ud83d\udc15</text></svg>' },
  { slug: "dog-park-etiquette", title: "Dog Park Etiquette: 10 Rules Every Dog Owner Should Follow", date: "April 3, 2026", readTime: "7 min read", category: "Tips", description: "Essential dog park etiquette rules for a safe and fun experience.", gradient: "linear-gradient(135deg, #E8913A 0%, #D07B2A 100%)", icon: '<svg viewBox="0 0 80 64" fill="none"><text x="20" y="45" font-size="40">\ud83d\udcd6</text></svg>' },
  { slug: "find-off-leash-dog-parks", title: "How to Find Off-Leash Dog Parks Near You", date: "April 1, 2026", readTime: "5 min read", category: "Guide", description: "Tips for finding the best off-leash dog parks in your area.", gradient: "linear-gradient(135deg, #87CEEB 0%, #5DADE2 100%)", icon: '<svg viewBox="0 0 80 64" fill="none"><text x="20" y="45" font-size="40">\ud83d\udccd</text></svg>' },
  { slug: "is-your-dog-ready", title: "Is Your Dog Ready for the Dog Park? Signs to Look For", date: "March 28, 2026", readTime: "6 min read", category: "Training", description: "How to know if your dog is ready for off-leash play.", gradient: "linear-gradient(135deg, #8E44AD 0%, #9B59B6 100%)", icon: '<svg viewBox="0 0 80 64" fill="none"><text x="20" y="45" font-size="40">\u2753</text></svg>' },
  { slug: "dog-park-safety", title: "Dog Park Safety: Keeping Your Pup Safe and Happy", date: "March 25, 2026", readTime: "5 min read", category: "Safety", description: "Essential safety tips for visiting dog parks with your furry friend.", gradient: "linear-gradient(135deg, #C0392B 0%, #E74C3C 100%)", icon: '<svg viewBox="0 0 80 64" fill="none"><text x="20" y="45" font-size="40">\u26a0\ufe0f</text></svg>' },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
