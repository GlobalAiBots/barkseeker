import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Oklahoma — 25+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Oklahoma. 25+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Oklahoma Dog Parks — BarkSeeker", url: "https://barkseeker.com/oklahoma", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Oklahoma Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/oklahoma" },
};

export default function OklahomaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
