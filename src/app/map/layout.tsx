import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "US Dog Park Map — Find Parks in 35 States | BarkSeeker",
  description: "Interactive map of 4,700+ dog parks across 35 states. Browse by state to find dog parks with GPS coordinates, amenities, and off-leash info.",
  openGraph: {
    title: "US Dog Park Map — BarkSeeker",
    description: "4,700+ dog parks across 35 states. Find your park.",
    url: "https://www.barkseeker.com/map",
    siteName: "BarkSeeker",
  },
  twitter: { card: "summary", title: "US Dog Park Map | BarkSeeker" },
  alternates: { canonical: "https://www.barkseeker.com/map" },
};

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
