/* eslint-disable @next/next/no-img-element */
"use client";

import type { AffiliatePartner, AffiliateBannerKey } from "@/data/affiliates/revival";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface Props {
  partner: AffiliatePartner;
  bannerKey: AffiliateBannerKey;
  postSlug: string;
  className?: string;
}

export default function AffiliateBanner({ partner, bannerKey, postSlug, className = "" }: Props) {
  const banner = partner.banners[bannerKey];
  return (
    <div className={`my-8 flex flex-col items-center gap-1 ${className}`}>
      <a
        href={banner.click}
        target="_blank"
        rel="sponsored noopener noreferrer"
        onClick={() => {
          if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "affiliate_click", {
              partner: partner.id,
              link_type: `banner-${bannerKey}`,
              post_slug: postSlug,
              destination: bannerKey,
            });
          }
        }}
        className="block hover:opacity-90 transition"
        aria-label={`${partner.name} — sponsored`}
      >
        <img
          src={banner.url}
          alt={`${partner.name} — sponsored`}
          width={banner.w}
          height={banner.h}
          loading="lazy"
          decoding="async"
          className="max-w-full h-auto rounded-lg"
        />
      </a>
      <p className="text-[10px] text-gray-400 uppercase tracking-wider">
        Sponsored &middot; {partner.name}
      </p>
    </div>
  );
}
