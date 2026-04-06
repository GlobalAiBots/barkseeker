import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Hawaii — 14+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Hawaii. 14+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Hawaii Dog Parks — BarkSeeker", url: "https://barkseeker.com/hawaii", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Hawaii Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/hawaii" },
};

export default function HawaiiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
