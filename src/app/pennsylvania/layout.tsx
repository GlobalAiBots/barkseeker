import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Pennsylvania — 115+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Pennsylvania. 115+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Pennsylvania Dog Parks — BarkSeeker", url: "https://www.barkseeker.com/pennsylvania", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Pennsylvania Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://www.barkseeker.com/pennsylvania" },
};

export default function PennsylvaniaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
