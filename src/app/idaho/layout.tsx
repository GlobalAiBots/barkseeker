import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Idaho — 91+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Idaho. 91+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Idaho Dog Parks — BarkSeeker", url: "https://barkseeker.com/idaho", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Idaho Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/idaho" },
};

export default function IdahoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
