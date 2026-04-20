import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in South Carolina — 61+ Parks | BarkSeeker",
  description: "The most complete dog park directory for South Carolina. 61+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "South Carolina Dog Parks — BarkSeeker", url: "https://www.barkseeker.com/south-carolina", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "South Carolina Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://www.barkseeker.com/south-carolina" },
};

export default function SouthCarolinaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
