import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Montana — 17+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Montana. 17+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Montana Dog Parks — BarkSeeker", url: "https://barkseeker.com/montana", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Montana Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/montana" },
};

export default function MontanaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
