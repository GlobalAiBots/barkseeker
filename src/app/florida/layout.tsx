import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Florida — 506+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Florida. 506+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Florida Dog Parks — BarkSeeker", url: "https://barkseeker.com/florida", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Florida Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/florida" },
};

export default function FloridaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
