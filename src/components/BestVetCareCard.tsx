"use client";

interface Props {
  variant?: "default" | "compact" | "lyme";
  placement?: string;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const links = {
  default: {
    url: "https://www.tkqlhce.com/click-101726471-11794808",
    title: "Pet Medications at Wholesale Prices",
    copy: "Frontline, NexGard, Bravecto, Heartgard, K9 Advantix — same brands your vet prescribes, delivered to your door at significant savings.",
    cta: "Shop BestVetCare",
  },
  compact: {
    url: "https://www.tkqlhce.com/click-101726471-11794808",
    title: "Need flea & tick meds?",
    copy: "BestVetCare carries Frontline, NexGard, and Bravecto with free US shipping.",
    cta: "View Prices",
  },
  lyme: {
    url: "https://www.kqzyfj.com/click-101726471-15254616",
    title: "Lyme Disease Prevention",
    copy: "Bravecto chews protect against ticks for 12 weeks per dose. 10% off + free shipping.",
    cta: "Shop Bravecto",
  },
} as const;

export default function BestVetCareCard({ variant = "default", placement }: Props) {
  const l = links[variant];

  const trackClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "affiliate_click", {
        partner: "bestvetcare",
        link_type: variant,
        post_slug: placement || "unknown",
        destination: l.url,
      });
    }
  };

  return (
    <div className="rounded-xl border border-bark/15 bg-white p-5 my-6 shadow-sm">
      <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">
        Sponsored &mdash; affiliate partner
      </div>
      <h3 className="font-[Cabin] text-lg font-bold text-charcoal mb-2">{l.title}</h3>
      <p className="text-sm text-gray-600 mb-3 leading-relaxed">{l.copy}</p>
      <a
        href={l.url}
        target="_blank"
        rel="sponsored noopener noreferrer"
        onClick={trackClick}
        className="inline-block bg-bark hover:bg-bark-dark text-white text-sm font-bold px-4 py-2 rounded-lg transition"
      >
        {l.cta} &rarr;
      </a>
      <div className="text-xs text-gray-400 italic mt-3">
        BarkSeeker earns a commission on qualifying purchases.
      </div>
    </div>
  );
}
