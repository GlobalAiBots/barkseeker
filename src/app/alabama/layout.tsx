import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Alabama — 122+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Alabama. 122+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Alabama Dog Parks — BarkSeeker", url: "https://barkseeker.com/alabama", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Alabama Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/alabama" },
};

export default function AlabamaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
