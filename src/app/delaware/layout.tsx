import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Delaware — 24+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Delaware. 24+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Delaware Dog Parks — BarkSeeker", url: "https://www.barkseeker.com/delaware", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Delaware Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://www.barkseeker.com/delaware" },
};

export default function DelawareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
