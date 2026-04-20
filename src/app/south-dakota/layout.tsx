import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in South Dakota — 26+ Parks | BarkSeeker",
  description: "The most complete dog park directory for South Dakota. 26+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "South Dakota Dog Parks — BarkSeeker", url: "https://www.barkseeker.com/south-dakota", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "South Dakota Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://www.barkseeker.com/south-dakota" },
};

export default function SouthDakotaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
