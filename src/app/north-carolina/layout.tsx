import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in North Carolina — 345+ Parks | BarkSeeker",
  description: "The most complete dog park directory for North Carolina. 345+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "North Carolina Dog Parks — BarkSeeker", url: "https://www.barkseeker.com/north-carolina", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "North Carolina Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://www.barkseeker.com/north-carolina" },
};

export default function NorthCarolinaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
