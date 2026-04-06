import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Missouri — 63+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Missouri. 63+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Missouri Dog Parks — BarkSeeker", url: "https://barkseeker.com/missouri", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Missouri Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/missouri" },
};

export default function MissouriLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
