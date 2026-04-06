import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Mississippi — 11+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Mississippi. 11+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Mississippi Dog Parks — BarkSeeker", url: "https://barkseeker.com/mississippi", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Mississippi Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/mississippi" },
};

export default function MississippiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
