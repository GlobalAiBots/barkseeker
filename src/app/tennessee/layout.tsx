import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Tennessee — 130+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Tennessee. 130+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Tennessee Dog Parks — BarkSeeker", url: "https://www.barkseeker.com/tennessee", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Tennessee Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://www.barkseeker.com/tennessee" },
};

export default function TennesseeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
