"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { REVIVAL } from "@/data/affiliates/revival";
import CompactSupplierCallout from "./CompactSupplierCallout";

const COVERED_SLUGS = new Set([
  // Commit 1
  "is-pet-insurance-worth-it",
  // Commit 2 — Tier 1 remainder
  "what-vaccines-does-my-dog-need",
  "puppy-first-vet-visit",
  "how-to-reduce-vet-bills",
  // Commit 3 — Tier 2
  "emergency-vet-vs-regular-vet",
  "how-to-find-good-veterinarian",
  "signs-of-a-good-vet-visit",
  "when-to-take-dog-to-vet",
  "how-much-does-vet-visit-cost",
  "dog-grooming-by-breed",
  "dog-grooming-for-anxious-dogs",
  "how-often-should-you-groom-your-dog",
  // Commit 4 — Tier 3
  "dog-exercise-requirements-by-breed",
  "mobile-dog-grooming-pros-cons",
  "puppy-first-grooming-appointment",
  "how-to-find-good-dog-groomer",
]);

export default function DefaultBlogPostAffiliateFooter() {
  const pathname = usePathname();
  if (!pathname || !pathname.startsWith("/blog/")) return null;
  const slug = pathname.replace(/^\/blog\//, "").replace(/\/$/, "");
  if (!slug || COVERED_SLUGS.has(slug)) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 pb-12">
      <CompactSupplierCallout
        partner={REVIVAL}
        linkKey="discount10Off"
        context="blog-default-footer"
        heading="Skip the clinic markup on dog supplies"
        body="Vet-grade supplements, dental, parasite prevention, and grooming products at wholesale prices. $10 off your first order."
        ctaLabel="Browse Revival"
      />
      <p className="text-xs text-gray-400 italic">
        Affiliate disclosure: link above is sponsored. We may earn a commission at no extra cost to you.{" "}
        <Link href="/disclosure" className="underline hover:text-bark">Learn more</Link>.
      </p>
    </div>
  );
}
