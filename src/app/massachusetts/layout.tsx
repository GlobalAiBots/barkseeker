import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Massachusetts — 181+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Massachusetts. 181+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Massachusetts Dog Parks — BarkSeeker", url: "https://barkseeker.com/massachusetts", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Massachusetts Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/massachusetts" },
};

export default function MassachusettsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
