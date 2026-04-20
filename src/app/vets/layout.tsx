import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veterinarians Near You | 17,813+ Vets | BarkSeeker",
  description: "Find veterinarians across the United States. 17,813+ vets with ratings, reviews, phone numbers, and directions. Browse by state or city.",
  openGraph: { title: "Veterinarians Near You | BarkSeeker", url: "https://www.barkseeker.com/vets" },
  alternates: { canonical: "https://www.barkseeker.com/vets" },
};

export default function VetsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
