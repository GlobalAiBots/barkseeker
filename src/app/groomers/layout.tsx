import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Choose a Dog Groomer | Find Trusted Groomers | BarkSeeker",
  description: "Complete guide to finding the right groomer for your dog. Compare certifications, environments, breed expertise, and costs. Find trusted groomers near you.",
  openGraph: { title: "How to Choose a Dog Groomer | BarkSeeker", url: "https://www.barkseeker.com/groomers" },
  alternates: { canonical: "https://www.barkseeker.com/groomers" },
};

export default function GroomersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
