import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Nebraska — 30+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Nebraska. 30+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Nebraska Dog Parks — BarkSeeker", url: "https://barkseeker.com/nebraska", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Nebraska Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/nebraska" },
};

export default function NebraskaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
