import Link from "next/link";

export default function AffiliateDisclosure() {
  return (
    <p className="text-xs text-gray-400 italic mb-6 leading-relaxed">
      This post contains affiliate links. We may earn a small commission from
      qualifying purchases at no extra cost to you.{" "}
      <Link href="/disclosure" className="underline hover:text-bark transition">
        Learn more
      </Link>
      .
    </p>
  );
}
