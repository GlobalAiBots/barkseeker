import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in North Dakota — 14+ Parks | BarkSeeker",
  description: "The most complete dog park directory for North Dakota. 14+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "North Dakota Dog Parks — BarkSeeker", url: "https://barkseeker.com/north-dakota", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "North Dakota Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/north-dakota" },
};

export default function NorthDakotaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
