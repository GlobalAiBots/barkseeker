import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in New Hampshire — 23+ Parks | BarkSeeker",
  description: "The most complete dog park directory for New Hampshire. 23+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "New Hampshire Dog Parks — BarkSeeker", url: "https://barkseeker.com/new-hampshire", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "New Hampshire Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/new-hampshire" },
};

export default function NewHampshireLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
