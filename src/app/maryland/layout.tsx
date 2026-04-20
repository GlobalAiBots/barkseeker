import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Maryland — 374+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Maryland. 374+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Maryland Dog Parks — BarkSeeker", url: "https://www.barkseeker.com/maryland", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Maryland Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://www.barkseeker.com/maryland" },
};

export default function MarylandLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
