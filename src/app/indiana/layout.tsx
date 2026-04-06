import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Indiana — 157+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Indiana. 157+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Indiana Dog Parks — BarkSeeker", url: "https://barkseeker.com/indiana", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Indiana Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/indiana" },
};

export default function IndianaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
