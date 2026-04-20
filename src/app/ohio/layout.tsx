import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Ohio — 223+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Ohio. 223+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Ohio Dog Parks — BarkSeeker", url: "https://www.barkseeker.com/ohio", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Ohio Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://www.barkseeker.com/ohio" },
};

export default function OhioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
