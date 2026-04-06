import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Louisiana — 10+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Louisiana. 10+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Louisiana Dog Parks — BarkSeeker", url: "https://barkseeker.com/louisiana", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Louisiana Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/louisiana" },
};

export default function LouisianaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
