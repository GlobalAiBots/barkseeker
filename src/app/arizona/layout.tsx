import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Arizona — 220+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Arizona. 220+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Arizona Dog Parks — BarkSeeker", url: "https://barkseeker.com/arizona", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Arizona Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/arizona" },
};

export default function ArizonaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
