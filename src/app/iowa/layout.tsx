import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Iowa — 83+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Iowa. 83+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Iowa Dog Parks — BarkSeeker", url: "https://www.barkseeker.com/iowa", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Iowa Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://www.barkseeker.com/iowa" },
};

export default function IowaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
