import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in West Virginia — 1+ Parks | BarkSeeker",
  description: "The most complete dog park directory for West Virginia. 1+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "West Virginia Dog Parks — BarkSeeker", url: "https://www.barkseeker.com/west-virginia", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "West Virginia Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://www.barkseeker.com/west-virginia" },
};

export default function WestVirginiaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
