import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dog Groomers Near You | 14,961+ Groomers | BarkSeeker",
  description: "Find dog groomers across the United States. 14,961+ groomers with ratings, reviews, phone numbers, and directions. Browse by state or city.",
  openGraph: { title: "Dog Groomers Near You | BarkSeeker", url: "https://barkseeker.com/groomers" },
  alternates: { canonical: "https://barkseeker.com/groomers" },
};

export default function GroomersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
