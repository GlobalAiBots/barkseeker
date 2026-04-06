import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <p className="text-6xl mb-4">🐕</p>
      <h1 className="font-[Cabin] text-3xl font-bold text-charcoal mb-3">Park Not Found</h1>
      <p className="text-gray-500 mb-8">We couldn&apos;t find that page — but we&apos;ve got 4,700+ dog parks waiting for you and your pup.</p>
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        <Link href="/" className="bg-bark hover:bg-bark-dark text-white font-bold px-6 py-3 rounded-lg transition shadow-sm">Search All Parks</Link>
        <Link href="/map" className="border-2 border-forest text-forest hover:bg-forest hover:text-white font-bold px-6 py-3 rounded-lg transition">View Map</Link>
      </div>
    </div>
  );
}
