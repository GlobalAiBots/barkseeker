/* eslint-disable @next/next/no-img-element */
"use client";

import type { AffiliatePartner, AffiliateLinkKey } from "@/data/affiliates/revival";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface CTA {
  label: string;
  linkKey: AffiliateLinkKey;
}

interface Props {
  partner: AffiliatePartner;
  tagline: string;
  description: string;
  primary: CTA;
  secondary?: CTA;
}

export default function PartnerCard({ partner, tagline, description, primary, secondary }: Props) {
  const trackClick = (placement: string, destination: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "affiliate_click", {
        partner: partner.id,
        link_type: placement,
        post_slug: "directory-hub",
        destination,
      });
    }
  };

  return (
    <div
      className="bg-white rounded-2xl p-6 border border-bark/15"
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
    >
      <div className="flex items-start gap-4 mb-4">
        {partner.logo && (
          <img
            src={partner.logo}
            alt={`${partner.name} logo`}
            width={56}
            height={56}
            loading="lazy"
            decoding="async"
            className="rounded-md flex-shrink-0"
          />
        )}
        <div>
          <h3 className="font-[Cabin] font-bold text-charcoal text-lg leading-snug">{partner.name}</h3>
          <p className="text-xs uppercase tracking-wider text-bark font-bold mt-0.5">{tagline}</p>
        </div>
      </div>
      <p className="text-sm text-charcoal/70 leading-relaxed mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        <a
          href={partner.links[primary.linkKey]}
          target="_blank"
          rel="sponsored noopener noreferrer"
          onClick={() => trackClick("partner-card-primary", primary.linkKey)}
          className="inline-flex items-center gap-1.5 text-white text-sm font-bold px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
          style={{ background: "linear-gradient(135deg, #E8913A, #D07B2A)" }}
        >
          {primary.label}
          <span aria-hidden="true">&rarr;</span>
        </a>
        {secondary && (
          <a
            href={partner.links[secondary.linkKey]}
            target="_blank"
            rel="sponsored noopener noreferrer"
            onClick={() => trackClick("partner-card-secondary", secondary.linkKey)}
            className="inline-flex items-center gap-1.5 text-bark border border-bark/30 hover:bg-bark/5 text-sm font-bold px-4 py-2 rounded-lg transition-colors"
          >
            {secondary.label}
          </a>
        )}
      </div>
    </div>
  );
}
