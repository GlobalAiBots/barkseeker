import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import CletusWidget from "@/components/CletusWidget";
import CookieConsent from "@/components/CookieConsent";
import StatesDropdown from "@/components/StatesDropdown";
import "./globals.css";

export const metadata: Metadata = {
  title: "BarkSeeker | Every Dog Park in America — 4,700+ Parks",
  description:
    "Find dog parks across the United States. 4,700+ parks with GPS coordinates, amenities, off-leash info. Free.",
  keywords:
    "dog park near me, off-leash dog park, dog park directory, dog parks by state, best dog parks America",
  openGraph: {
    title: "BarkSeeker | Every Dog Park in America",
    description: "4,700+ dog parks across the US. GPS coordinates, amenities, off-leash info.",
    url: "https://barkseeker.com",
    siteName: "BarkSeeker",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "BarkSeeker | Every Dog Park in America",
    description: "4,700+ dog parks across 35 states. GPS coordinates, amenities, off-leash info.",
  },
  alternates: { canonical: "https://barkseeker.com" },
  verification: {
    google: "JWsw31t4naK4EN6UbytAGjUR7PuyS4e3i1lgEcjM-R4",
  },
  other: {
    "google-adsense-account": "ca-pub-4822220549367368",
  },
};

function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg font-[Cabin]">
          <span className="text-2xl">🐕</span>
          <span className="text-charcoal">Bark<span className="text-forest">Seeker</span></span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-6 text-sm font-medium">
          <StatesDropdown />
          <Link href="/map" className="text-gray-500 hover:text-forest transition">Map</Link>
          <Link href="/blog" className="text-gray-500 hover:text-forest transition hidden sm:block">Blog</Link>
          <Link href="/about" className="text-gray-500 hover:text-forest transition hidden sm:block">About</Link>
          <Link href="/for-businesses" className="text-bark font-bold hover:text-bark-dark transition hidden sm:block">For Businesses</Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm text-gray-500">
          <div>
            <p className="font-bold text-charcoal mb-2 font-[Cabin]">🐕 BarkSeeker</p>
            <p>The most complete dog park directory in America. 4,700+ parks across 35 states.</p>
          </div>
          <div>
            <p className="font-bold text-charcoal mb-2">Links</p>
            <div className="flex flex-col gap-1">
              <Link href="/" className="hover:text-forest transition">All Parks</Link>
              <Link href="/map" className="hover:text-forest transition">Map</Link>
              <Link href="/about" className="hover:text-forest transition">About</Link>
              <Link href="/blog" className="hover:text-forest transition">Blog</Link>
              <Link href="/for-businesses" className="hover:text-forest transition">For Businesses</Link>
              <Link href="/privacy" className="hover:text-forest transition">Privacy</Link>
              <Link href="/terms" className="hover:text-forest transition">Terms</Link>
            </div>
          </div>
          <div>
            <p className="font-bold text-charcoal mb-2">Know a park we missed?</p>
            <a href="mailto:hello@barkseeker.com" className="text-forest hover:text-forest-light transition">hello@barkseeker.com</a>
          </div>
          <div>
            <p className="font-bold text-charcoal mb-2">From Global AI Bots</p>
            <div className="flex flex-col gap-1">
              <a href="https://globalaibots.com" target="_blank" rel="noopener noreferrer" className="hover:text-forest transition">Global AI Bots</a>
              <a href="https://askcletus.com" target="_blank" rel="noopener noreferrer" className="hover:text-forest transition">CLETUS AI Chat</a>
              <a href="https://getcletus.com" target="_blank" rel="noopener noreferrer" className="hover:text-forest transition">CLETUS AI Voice</a>
              <a href="https://grandlakeai.com" target="_blank" rel="noopener noreferrer" className="hover:text-forest transition">Grand Lake AI</a>
              <a href="https://rampseeker.com" target="_blank" rel="noopener noreferrer" className="hover:text-forest transition">RampSeeker</a>
              <a href="https://pierseeker.com" target="_blank" rel="noopener noreferrer" className="hover:text-forest transition">PierSeeker</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap justify-between items-center text-xs text-gray-400 gap-4">
          <span>&copy; {new Date().getFullYear()} BarkSeeker. All rights reserved.</span>
          <div className="flex gap-3">
            <a href="mailto:hello@barkseeker.com?subject=Advertising%20Inquiry" className="hover:text-forest transition">Advertise With Us</a>
            <span>&middot;</span>
            <span>A <a href="https://grandlakeai.com" target="_blank" className="text-forest/70 hover:text-forest transition">Grand Lake AI</a> project.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-['Source_Sans_3'] antialiased min-h-screen flex flex-col">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4822220549367368"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FB34CXVRQE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FB34CXVRQE');
          `}
        </Script>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <CletusWidget />
        <CookieConsent />
      </body>
    </html>
  );
}
