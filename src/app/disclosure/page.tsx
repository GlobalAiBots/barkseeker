import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | BarkSeeker",
  description: "How BarkSeeker discloses affiliate relationships and editorial integrity.",
  alternates: { canonical: "https://www.barkseeker.com/disclosure" },
};

export default function DisclosurePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-6 leading-tight">
        Affiliate Disclosure
      </h1>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
          BarkSeeker partners with select advertisers through{" "}
          <strong className="text-charcoal">CJ Affiliate</strong>, including Revival Animal Health.
          When you click on these links and make a purchase, we may earn a commission at no extra
          cost to you.
        </p>
        <p>
          Some of our editorial content also includes Amazon affiliate links through the{" "}
          <strong className="text-charcoal">Amazon Services LLC Associates Program</strong>. As an
          Amazon Associate, BarkSeeker earns from qualifying purchases.
        </p>
        <p>
          Our editorial content is never influenced by affiliate partnerships. We only recommend
          products and services we genuinely believe are good options for dog owners. Affiliate
          revenue helps us keep BarkSeeker free to use and continue improving our directory of
          groomers, vets, and dog parks.
        </p>
        <p>
          If you have questions about our affiliate relationships, contact us at{" "}
          <a
            href="mailto:hello@barkseeker.com"
            className="text-bark hover:text-bark-dark hover:underline"
          >
            hello@barkseeker.com
          </a>
          .
        </p>
        <p className="pt-4">
          <Link href="/" className="text-bark hover:text-bark-dark hover:underline font-semibold">
            &larr; Back to BarkSeeker
          </Link>
        </p>
      </div>
    </div>
  );
}
