/* eslint-disable @next/next/no-img-element */
"use client";

import type { AffiliatePartner, AffiliateLinkKey } from "@/data/affiliates/revival";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface Props {
  partner: AffiliatePartner;
  linkKey: AffiliateLinkKey;
  context: string;
  heading: string;
  body: string;
  ctaLabel: string;
  className?: string;
}

export default function CompactSupplierCallout({
  partner,
  linkKey,
  context,
  heading,
  body,
  ctaLabel,
  className = "",
}: Props) {
  const href = partner.links[linkKey];
  return (
    <aside
      className={`my-6 rounded-lg border border-gray-200 bg-white p-4 flex items-start gap-3 ${className}`}
    >
      {partner.logo && (
        <img
          src={partner.logo}
          alt={`${partner.name} logo`}
          width={40}
          height={40}
          loading="lazy"
          decoding="async"
          className="rounded flex-shrink-0"
        />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">
          Recommended Supplier &middot; Affiliate
        </p>
        <p className="font-[Cabin] font-bold text-charcoal text-sm leading-tight mb-0.5">
          {heading}
        </p>
        <p className="text-gray-500 text-xs leading-snug mb-2">{body}</p>
        <a
          href={href}
          target="_blank"
          rel="sponsored noopener noreferrer"
          onClick={() => {
            if (typeof window !== "undefined" && window.gtag) {
              window.gtag("event", "affiliate_click", {
                partner: partner.id,
                link_type: `compact-${context}`,
                post_slug: context,
                destination: linkKey,
              });
            }
          }}
          className="text-bark hover:text-bark-dark text-xs font-semibold transition"
        >
          {ctaLabel} &rarr;
        </a>
      </div>
    </aside>
  );
}
