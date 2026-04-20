import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Washington — 248+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Washington. 248+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Washington Dog Parks — BarkSeeker", url: "https://www.barkseeker.com/washington", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Washington Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://www.barkseeker.com/washington" },
};

export default function WashingtonLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
