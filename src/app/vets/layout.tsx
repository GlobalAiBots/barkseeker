import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Choose a Vet | Find Trusted Vets Near You | BarkSeeker",
  description: "Complete guide to choosing the right veterinarian for your dog. Compare credentials, AAHA accreditation, costs, red flags, and find trusted vets in your area.",
  openGraph: { title: "How to Choose a Vet | BarkSeeker", url: "https://www.barkseeker.com/vets" },
  alternates: { canonical: "https://www.barkseeker.com/vets" },
};

export default function VetsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
