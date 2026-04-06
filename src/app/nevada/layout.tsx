import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Nevada — 1+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Nevada. 1+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Nevada Dog Parks — BarkSeeker", url: "https://barkseeker.com/nevada", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Nevada Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/nevada" },
};

export default function NevadaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
