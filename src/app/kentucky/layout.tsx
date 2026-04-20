import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Kentucky — 69+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Kentucky. 69+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Kentucky Dog Parks — BarkSeeker", url: "https://www.barkseeker.com/kentucky", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Kentucky Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://www.barkseeker.com/kentucky" },
};

export default function KentuckyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
