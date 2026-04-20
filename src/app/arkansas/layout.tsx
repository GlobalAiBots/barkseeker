import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Arkansas — 38+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Arkansas. 38+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Arkansas Dog Parks — BarkSeeker", url: "https://www.barkseeker.com/arkansas", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Arkansas Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://www.barkseeker.com/arkansas" },
};

export default function ArkansasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
