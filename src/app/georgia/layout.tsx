import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Georgia — 249+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Georgia. 249+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Georgia Dog Parks — BarkSeeker", url: "https://barkseeker.com/georgia", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Georgia Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/georgia" },
};

export default function GeorgiaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
