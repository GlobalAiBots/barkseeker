import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in New Jersey — 359+ Parks | BarkSeeker",
  description: "The most complete dog park directory for New Jersey. 359+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "New Jersey Dog Parks — BarkSeeker", url: "https://barkseeker.com/new-jersey", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "New Jersey Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/new-jersey" },
};

export default function NewJerseyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
