/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Canonicalize apex → www with 308 (Google AdSense ads.txt crawler does not reliably follow 307).
      { source: "/:path*", has: [{ type: "host", value: "barkseeker.com" }], destination: "https://www.barkseeker.com/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
