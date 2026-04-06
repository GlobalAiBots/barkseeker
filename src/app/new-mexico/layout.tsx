import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in New Mexico — 76+ Parks | BarkSeeker",
  description: "The most complete dog park directory for New Mexico. 76+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "New Mexico Dog Parks — BarkSeeker", url: "https://barkseeker.com/new-mexico", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "New Mexico Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/new-mexico" },
};

export default function NewMexicoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
