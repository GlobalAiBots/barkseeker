import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Virginia — 84+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Virginia. 84+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Virginia Dog Parks — BarkSeeker", url: "https://barkseeker.com/virginia", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Virginia Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/virginia" },
};

export default function VirginiaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
