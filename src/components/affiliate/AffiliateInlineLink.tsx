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
  postSlug: string;
  children: React.ReactNode;
}

export default function AffiliateInlineLink({ partner, linkKey, postSlug, children }: Props) {
  const href = partner.links[linkKey];
  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored noopener noreferrer"
      onClick={() => {
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "affiliate_click", {
            partner: partner.id,
            link_type: "inline",
            post_slug: postSlug,
            destination: linkKey,
          });
        }
      }}
      className="text-bark hover:text-bark-dark hover:underline font-semibold transition"
    >
      {children}
    </a>
  );
}
