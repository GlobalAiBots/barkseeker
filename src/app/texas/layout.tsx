import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Texas — 3+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Texas. 3+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Texas Dog Parks — BarkSeeker", url: "https://www.barkseeker.com/texas", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Texas Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://www.barkseeker.com/texas" },
};

export default function TexasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
