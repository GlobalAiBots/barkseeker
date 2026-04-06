import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Colorado — 4+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Colorado. 4+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Colorado Dog Parks — BarkSeeker", url: "https://barkseeker.com/colorado", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Colorado Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/colorado" },
};

export default function ColoradoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
