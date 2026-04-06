import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in New York — 365+ Parks | BarkSeeker",
  description: "The most complete dog park directory for New York. 365+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "New York Dog Parks — BarkSeeker", url: "https://barkseeker.com/new-york", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "New York Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/new-york" },
};

export default function NewYorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
