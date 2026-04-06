import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Michigan — 316+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Michigan. 316+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Michigan Dog Parks — BarkSeeker", url: "https://barkseeker.com/michigan", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Michigan Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/michigan" },
};

export default function MichiganLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
