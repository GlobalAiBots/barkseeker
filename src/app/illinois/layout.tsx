import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Illinois — 309+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Illinois. 309+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Illinois Dog Parks — BarkSeeker", url: "https://www.barkseeker.com/illinois", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Illinois Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://www.barkseeker.com/illinois" },
};

export default function IllinoisLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
