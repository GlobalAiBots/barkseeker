import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Dog Park in California — 810+ Parks | BarkSeeker",
  description: "The most complete dog park directory for California. 810+ parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: { title: "California Dog Parks — BarkSeeker", url: "https://barkseeker.com/california", siteName: "BarkSeeker" },
  twitter: { card: "summary", title: "California Dog Parks | BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/california" },
};

export default function CaliforniaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
