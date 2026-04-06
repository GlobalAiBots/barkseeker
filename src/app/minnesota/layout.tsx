import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Minnesota — 187+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Minnesota. 187+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Minnesota Dog Parks — BarkSeeker", url: "https://barkseeker.com/minnesota", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Minnesota Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/minnesota" },
};

export default function MinnesotaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
