import DefaultBlogPostAffiliateFooter from "@/components/affiliate/DefaultBlogPostAffiliateFooter";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <DefaultBlogPostAffiliateFooter />
    </>
  );
}
