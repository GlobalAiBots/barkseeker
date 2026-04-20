import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in Utah — 104+ Parks | BarkSeeker",
  description: "The most complete dog park directory for Utah. 104+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "Utah Dog Parks — BarkSeeker", url: "https://www.barkseeker.com/utah", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "Utah Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://www.barkseeker.com/utah" },
};

export default function UtahLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
