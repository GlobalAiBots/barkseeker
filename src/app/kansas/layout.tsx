import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Kansas — 93+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Kansas. 93+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Kansas Dog Parks — BarkSeeker", url: "https://barkseeker.com/kansas", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Kansas Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/kansas" },
};

export default function KansasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
