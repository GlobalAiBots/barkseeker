import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Maine — 34+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Maine. 34+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Maine Dog Parks — BarkSeeker", url: "https://www.barkseeker.com/maine", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Maine Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://www.barkseeker.com/maine" },
};

export default function MaineLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
