import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import CletusWidget from "@/components/CletusWidget";
import CookieConsent from "@/components/CookieConsent";
import StatesDropdown from "@/components/StatesDropdown";
import { SITE_STATS } from "@/lib/site-stats";
import "./globals.css";

const totalListings = SITE_STATS.total.toLocaleString();

export const metadata: Metadata = {
  title: "BarkSeeker | Dog Parks, Groomers & Vets Near You",
  description:
    `Find dog parks, professional groomers, and trusted veterinarians near you. ${totalListings}+ listings across all 50 states. Free forever.`,
  keywords:
    "dog park near me, dog groomer near me, vet near me, off-leash dog park, dog park directory, dog groomer directory, veterinarian directory",
  openGraph: {
    title: "BarkSeeker | Dog Parks, Groomers & Vets Near You",
    description: `Find dog parks, professional groomers, and trusted veterinarians near you. ${totalListings}+ listings across all 50 states.`,
    url: "https://www.barkseeker.com",
    siteName: "BarkSeeker",
    type: "website",
    images: [{ url: "https://www.barkseeker.com/og-image.png", width: 1200, height: 630, alt: "BarkSeeker — Every Dog Park in America" }],
  },
  twitter: {
    card: "summary",
    title: "BarkSeeker | Dog Parks, Groomers & Vets Near You",
    description: `Find dog parks, professional groomers, and trusted veterinarians near you. ${totalListings}+ listings across all 50 states.`,
  },
  alternates: { canonical: "https://www.barkseeker.com" },
  verification: {
    google: "JWsw31t4naK4EN6UbytAGjUR7PuyS4e3i1lgEcjM-R4",
  },
  other: {
    "google-adsense-account": "ca-pub-4822220549367368",
    "impact-site-verification": "0ed3bdd5-2684-4b33-aa7a-bf0325c58627",
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
          <Link href="/search" className="text-gray-500 hover:text-forest transition"><svg className="w-4 h-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg></Link>
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
    <footer className="bg-[#2D3B2E] border-t border-[#3D5A40] mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm text-white/50">
          <div>
            <p className="font-bold text-white mb-2 font-[Cabin]">&#128021; BarkSeeker</p>
            <p>The most complete pet services directory in America. {totalListings}+ parks, groomers, and vets across 50 states.</p>
          </div>
          <div>
            <p className="font-bold text-white/70 mb-2">Links</p>
            <div className="flex flex-col gap-1">
              <Link href="/" className="text-white/40 hover:text-white transition">All Parks</Link>
              <Link href="/map" className="text-white/40 hover:text-white transition">Map</Link>
              <Link href="/about" className="text-white/40 hover:text-white transition">About</Link>
              <Link href="/blog" className="text-white/40 hover:text-white transition">Blog</Link>
              <Link href="/for-businesses" className="text-white/40 hover:text-white transition">For Businesses</Link>
              <Link href="/privacy" className="text-white/40 hover:text-white transition">Privacy</Link>
              <Link href="/terms" className="text-white/40 hover:text-white transition">Terms</Link>
            </div>
          </div>
          <div>
            <p className="font-bold text-white/70 mb-2">Know a park we missed?</p>
            <a href="mailto:hello@barkseeker.com" className="text-forest-light hover:text-white transition">hello@barkseeker.com</a>
          </div>
          <div>
            <p className="font-bold text-white/70 mb-2">From Global AI Bots</p>
            <div className="flex flex-col gap-1">
              <a href="https://rampseeker.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">RampSeeker</a>
              <a href="https://pierseeker.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">PierSeeker</a>
              <a href="https://www.barkseeker.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">BarkSeeker</a>
              <a href="https://marinaseeker.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">MarinaSeeker</a>
              <a href="https://mechanicseeker.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">MechanicSeeker</a>
              <a href="https://babymydog.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">BabyMyDog</a>
              <a href="https://askcletus.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">CLETUS AI Chat</a>
              <a href="https://getcletus.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">CLETUS AI Voice</a>
              <a href="https://grandlakeai.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">Grand Lake AI</a>
              <a href="https://globalaibots.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">Global AI Bots</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap justify-between items-center text-xs text-white/30 gap-4">
          <span>Veteran Owned &amp; Operated &#127482;&#127480; &middot; &copy; {new Date().getFullYear()} BarkSeeker. All rights reserved.</span>
          <div className="flex gap-3">
            <Link href="/advertise" className="hover:text-white transition">Advertise With Us</Link>
            <span>&middot;</span>
            <span>A <a href="https://grandlakeai.com" target="_blank" className="text-forest-light/70 hover:text-white transition">Grand Lake AI</a> project.</span>
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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
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
        <a href="/groomers" className="block w-full bg-[#5B7B5E] text-white text-center py-2 text-xs sm:text-sm font-medium hover:bg-[#3D5A40] transition">
          &#128021; Find parks, groomers, and vets near you &mdash; {totalListings}+ listings &rarr;
        </a>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <CletusWidget />
        <CookieConsent />
      </body>
    </html>
  );
}
