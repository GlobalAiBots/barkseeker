import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About BarkSeeker — Dog Park Directory",
  description: "BarkSeeker is the most complete dog park directory in America. 4,700+ parks across 35 states with GPS coordinates, amenities, and off-leash info.",
  openGraph: {
    title: "About BarkSeeker",
    description: "The most complete dog park directory in America. 4,700+ parks across 35 states.",
    url: "https://barkseeker.com/about",
  },
  twitter: { card: "summary", title: "About BarkSeeker" },
  alternates: { canonical: "https://barkseeker.com/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-6">About BarkSeeker</h1>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>
          <strong className="text-charcoal">BarkSeeker is the most complete dog park directory in America.</strong> We cover 35 states with 4,700+ parks — GPS coordinates, amenities, off-leash info, and everything you need to find the perfect spot for your pup.
        </p>
        <p>
          We started BarkSeeker because finding a good dog park shouldn&apos;t require guessing. No more driving to a &quot;park&quot; that turns out to be a tiny patch of grass with no fence. No more wondering if dogs are allowed off-leash. Just real data, real locations, real amenities.
        </p>
        <p>
          Part of a family of outdoor directories: <a href="https://rampseeker.com" target="_blank" rel="noopener noreferrer" className="text-forest hover:text-forest-light transition font-semibold">RampSeeker</a> (boat ramps), <a href="https://pierseeker.com" target="_blank" rel="noopener noreferrer" className="text-forest hover:text-forest-light transition font-semibold">PierSeeker</a> (fishing piers), and <a href="https://babymydog.com" target="_blank" rel="noopener noreferrer" className="text-forest hover:text-forest-light transition font-semibold">BabyMyDog</a> (dog product reviews). Find the best products for your dog at BabyMyDog.com.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6 my-8">
          <h2 className="font-[Cabin] text-xl font-bold text-forest mb-3">What&apos;s Next</h2>
          <p className="text-gray-600">
            We&apos;re expanding to all 50 states and adding detailed guides with off-leash rules, park reviews, and dog-friendly businesses near every park.
          </p>
        </div>

        <p>
          BarkSeeker is a project of <a href="https://globalaibots.com" target="_blank" rel="noopener noreferrer" className="text-forest hover:text-forest-light transition font-semibold">Global AI Bots</a>, the company behind CLETUS — an AI chat and voice agent for businesses. Learn more at <a href="https://globalaibots.com" target="_blank" rel="noopener noreferrer" className="text-forest hover:text-forest-light transition font-semibold">globalaibots.com</a>, <a href="https://askcletus.com" target="_blank" rel="noopener noreferrer" className="text-forest hover:text-forest-light transition font-semibold">askcletus.com</a>, or <a href="https://grandlakeai.com" target="_blank" rel="noopener noreferrer" className="text-forest hover:text-forest-light transition font-semibold">grandlakeai.com</a>.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-8">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">Powered by CLETUS AI</h2>
          <p className="text-gray-600">
            The chatbot on this site is <strong className="text-charcoal">CLETUS</strong> — an AI chat and voice agent built for businesses. The same technology that helps you find dog parks can answer your business customers&apos; questions 24/7. If you run a pet grooming business, vet clinic, doggy daycare, or pet store, <a href="/for-businesses" className="text-forest hover:underline font-semibold">learn how CLETUS can work for you</a>.
          </p>
        </div>

        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mt-10 mb-3">Get in Touch</h2>
        <p>
          Know a park we missed? Have a correction? Just want to talk dogs?
        </p>
        <p>
          <a href="mailto:hello@barkseeker.com" className="text-forest hover:text-forest-light transition font-semibold">hello@barkseeker.com</a>
        </p>
      </div>
    </div>
  );
}
