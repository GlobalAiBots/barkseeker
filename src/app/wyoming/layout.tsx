import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Wyoming — 16+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Wyoming. 16+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Wyoming Dog Parks — BarkSeeker", url: "https://www.barkseeker.com/wyoming", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Wyoming Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://www.barkseeker.com/wyoming" },
};

export default function WyomingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
