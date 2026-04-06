export interface BlogPost {
  slug: string; title: string; date: string; readTime: string;
  category: string; description: string; gradient: string; icon: string;
}

export const blogPosts: BlogPost[] = [
  { slug: "best-dog-parks-florida", title: "Best Dog Parks in Florida: Off-Leash Paradise for Your Pup", date: "April 5, 2026", readTime: "6 min read", category: "Destinations", description: "Discover the top dog parks in Florida with off-leash areas, water features, and shade.", gradient: "linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)", icon: '<svg viewBox="0 0 80 64" fill="none"><text x="20" y="45" font-size="40">\ud83d\udc15</text></svg>' },
  { slug: "dog-park-etiquette", title: "Dog Park Etiquette: 10 Rules Every Dog Owner Should Follow", date: "April 3, 2026", readTime: "7 min read", category: "Tips", description: "Essential dog park etiquette rules for a safe and fun experience.", gradient: "linear-gradient(135deg, #E8913A 0%, #D07B2A 100%)", icon: '<svg viewBox="0 0 80 64" fill="none"><text x="20" y="45" font-size="40">\ud83d\udcd6</text></svg>' },
  { slug: "find-off-leash-dog-parks", title: "How to Find Off-Leash Dog Parks Near You", date: "April 1, 2026", readTime: "5 min read", category: "Guide", description: "Tips for finding the best off-leash dog parks in your area.", gradient: "linear-gradient(135deg, #87CEEB 0%, #5DADE2 100%)", icon: '<svg viewBox="0 0 80 64" fill="none"><text x="20" y="45" font-size="40">\ud83d\udccd</text></svg>' },
  { slug: "is-your-dog-ready", title: "Is Your Dog Ready for the Dog Park? Signs to Look For", date: "March 28, 2026", readTime: "6 min read", category: "Training", description: "How to know if your dog is ready for off-leash play.", gradient: "linear-gradient(135deg, #8E44AD 0%, #9B59B6 100%)", icon: '<svg viewBox="0 0 80 64" fill="none"><text x="20" y="45" font-size="40">\u2753</text></svg>' },
  { slug: "dog-park-safety", title: "Dog Park Safety: Keeping Your Pup Safe and Happy", date: "March 25, 2026", readTime: "5 min read", category: "Safety", description: "Essential safety tips for visiting dog parks with your furry friend.", gradient: "linear-gradient(135deg, #C0392B 0%, #E74C3C 100%)", icon: '<svg viewBox="0 0 80 64" fill="none"><text x="20" y="45" font-size="40">\u26a0\ufe0f</text></svg>' },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
